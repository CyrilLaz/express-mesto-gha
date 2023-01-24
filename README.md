[![Tests](../../actions/workflows/tests-13-sprint.yml/badge.svg)](../../actions/workflows/tests-13-sprint.yml) [![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)
# Бэкенд для приложения [Mesto](https://github.com/CyrilLaz/react-mesto-auth).

Учимся теневой стороне веб-разработки.\
Практикуем создание REST API с помощью библиотеки `express`.\
Осваиваем работу с базой данных `MongoDB` с помощью библиотеки `Mongoose`.\
Учимся отлавливать и обрабатывать ошибки.

## Особенности:
- приходящие на сервер запросы валидируются с помощью библиотеки `celebrate` в качестве мидлвэр и встроенной в него библиотеки `Joi`;
- все роутеры кроме авторизации и регистрации защищены проверкой jwt токеном, который записан в httpOnly куке;
- реализована централизованная обработка ошибок.

## Роутеры
- `POST /signin` - авторизация
- `POST /signup` - регистрация
****
- `GET /cards` — возвращает все карточки
- `POST /cards` — создаёт карточку
- `PUT /cards/:cardId/likes` — поставить лайк карточке
- `DELETE /cards/:cardId/likes` — убрать лайк с карточки
- `DELETE /cards/:cardId` — удаляет карточку по идентификатору 
****
- `GET /users/me` - возвращает информацию о текущем пользователе
- `PATCH /users/me` — обновляет профиль
- `PATCH /users/me/avatar` — обновляет аватар

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки   
`/constants` — папка для переменных   
`/errors` — папка с кастомными ошибками   
`/middlewares` - папка с мидлвэрами авторизации, ошибок и валидации Joi    

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

### [Ссылка на проект](https://github.com/CyrilLaz/express-mesto-gha)
