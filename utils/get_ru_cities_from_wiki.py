import requests

from lxml.html import fromstring


def get_ru_cities_from_wiki():
    page = requests.get('https://ru.wikipedia.org/wiki/Список_городов_России').text
    html = fromstring(page)

    data = []

    for tr in html.xpath('//table/tbody/tr'):
        columns = tr.xpath('.//td')
        if len(columns) != 9:
            continue
        name = columns[2].xpath('./a')[0].text_content().strip()
        subject = columns[3].text_content().strip()

        city = {'name': name, 'subject': subject}
        data.append(city)

    output = sorted(data, key=lambda k: '%s|%s' % (k['name'], k['subject']))

    cities = []
    for city in output:
        cities.append((city['name'], f"{city['name']}, {city['subject']}"))

    print(cities)
    return cities
