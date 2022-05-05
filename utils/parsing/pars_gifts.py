from bs4 import BeautifulSoup as bs
import requests
import json
import re

if __name__ == '__main__':

    data_dict = []
    count = 1 #Переменная для отслеживания порядкового номера подарка
    url = "https://podarki.ru/go/Каталог-подарков"
    result = requests.get(url).content
    soup = bs(result, 'lxml')
    main_categories = soup.find_all("div", class_="block-orange")

    # Проход по основным категориям
    for main_category in main_categories:
        main_category_name = main_category.find("span", class_="block-title__text").text.replace(u'\xa0', ' ')
        sub_categories = main_category.find_all("a", class_="block-orange__item")

        # Проход по дополнительным категориям
        for sub_category in sub_categories:
            sub_category_name = sub_category.find("div", class_="orange-item__name").text.replace(u'\xa0', ' ')
            sub_category_link = "https://podarki.ru" + sub_category.get("href")
            print(sub_category_name, sub_category_link)

            result = requests.get(sub_category_link).text
            soup = bs(result, 'lxml')
            # Если отсутсвует информация о страницах, значит в категории 1 страница
            pageinfo = soup.find("div", class_="pager__pageinfo")
            if pageinfo == None:
                sub_category_pages = 1
            else:
                sub_category_pages = int(re.findall(r'\d+', pageinfo.text)[1])
                if sub_category_pages > 3:#Ограничение на число страниц
                    sub_category_pages = 1
            # print(main_category_name, sub_category_name, sub_category_pages)
            for page in range(1, sub_category_pages + 1):
                page_link = sub_category_link + f"/{page}"
                result = requests.get(page_link).text
                soup = bs(result, "lxml")

                gifts = soup.find_all("div", class_="good-card")

                for gift in gifts:
                    # Проверка на отстутсвие вложенной подкатегории
                    group_name = gift.find("a", class_="good-card__link-group")
                    if group_name != None:
                        group_name = re.findall(r'\d+', group_name.text)
                    # Сбор информации о подарке
                    if group_name == [] or group_name == None:
                        gift_photo = gift.find("div", class_="good-card__picture").find("img").get("data-src")
                        gift_photo = "https:" + gift_photo

                        gift_link = gift.find("a", class_="good-card__link-product").get("href")
                        gift_link = "https://podarki.ru" + gift_link
                        result = requests.get(gift_link).text
                        gift_page = bs(result, "lxml")

                        gift_name = gift_page.find("h1", class_="good-main__name")
                        if gift_name == None:
                            break
                        gift_name = gift_name.text.replace(u'\xa0', ' ')

                        gift_price = gift_page.find("div", class_="good-main__price").text.replace(' ', '')
                        gift_price = int(re.findall(r'\d+', gift_price)[0])

                        gift_description = gift_page.find("div", class_="good-add__text").text.replace(u'\xa0', ' ')
                        print(f"№{count}:", main_category_name, sub_category_name, page, gift_name, gift_price, gift_description, gift_photo)
                        count += 1
                        #Запись инфы о подарке в словарь
                        data = {
                            "name": gift_name,
                            "main_category": main_category_name,
                            "sub_category": sub_category_name,
                            "price": gift_price,
                            "description": gift_description,
                            "gift_photo": gift_photo
                        }
                        data_dict.append(data)
                    else:
                        continue

#Запись данных в json
with open("gift_info.json", "w") as json_file:
    json.dump(data_dict, json_file, indent=4)