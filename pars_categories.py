from bs4 import BeautifulSoup as bs
import requests
import json

if __name__ == '__main__':

    data = {}
    url_base = "https://podarki.ru"
    url = "https://podarki.ru/go/Каталог-подарков"
    result = requests.get(url).content
    soup = bs(result, 'lxml')

    items = soup.find_all("a", class_='orange-item')


    for item in items:
        category = item.find("div", class_="orange-item__name").text
        category = category.replace(u'\xa0', ' ')
        img = item.find(class_="orange-item__picture").find("img").get("data-src")
        data[category] = f"{url_base}{img}"

    with open("category_images.json","w") as json_file:
        json.dump(data, json_file, indent=4)

