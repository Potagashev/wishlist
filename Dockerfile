# syntax=docker/dockerfile:1
FROM python:3
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/
ADD . .
#EXPOSE 8080
#CMD ["gunicorn", "--bind", ":8080", "--workers", "3", "core.wsgi.application"]
CMD gunicorn wishlist.wsgi:application --bind 0.0.0.0:$PORT