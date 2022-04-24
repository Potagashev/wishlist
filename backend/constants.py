REGISTRATION_REQUIRED_FIELDS = [
        'password',
        'first_name',
        'last_name',
        'email',
        'patronymic',
        'city',
        'gender',
        'b_date',
        'photo'
    ]

CLOTHES = 'Clothes'
ELECTRONICS = 'Electronics'
SPORT = 'Sport'
APPLIANCES = 'Appliances'
FOR_HOME = 'For Home'
TOYS = 'Toys'
OTHER = 'Other'

CATEGORIES = [
    (CLOTHES, 'Одежда'),
    (ELECTRONICS, 'Электроника'),
    (SPORT, 'Спорт'),
    (APPLIANCES, 'Бытовая техника'),
    (FOR_HOME, 'Для дома'),
    (TOYS, 'Игрушки'),
    (OTHER, 'Другое'),
]

SUB_CATEGORIES = []

GENDERS = [('Man', 'Мужчина'), ('Woman', 'Женщина')]

STATUSES = [(1, 'Запрос отправлен'), (2, 'В друзьях')]
