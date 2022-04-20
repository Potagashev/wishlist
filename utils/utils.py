import requests
from models import CatalogItem


def fill_db():
    # здесь мы получаем код страницы, парсим его и сразу же добавляем все,
    # что нужно, в БД
    response = requests.get('podarki.ru').json()

    for item in response:
        if item == 'catalog_item':
            newCatalogItem = CatalogItem()
            newCatalogItem.name = item.name
            newCatalogItem.description = item.description
            newCatalogItem.save() # всё. новая запись в БД добавлена.
            # все делает фреймворк, здесь не нужно коммитить или роллбэк делать
        # ... и тд


if __name__ == '__main__':
    fill_db()
