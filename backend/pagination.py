from rest_framework.pagination import PageNumberPagination


# вывод каталога
class GiftAPIListPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 50


# список вишлистов
class WishlistAPIListPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 50