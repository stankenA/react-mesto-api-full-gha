[![Tests](../../actions/workflows/tests-13-sprint.yml/badge.svg)](../../actions/workflows/tests-13-sprint.yml) [![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)
# Проект Mesto (бэкенд версия)

В данном проекте реализуется бэкенд часть приложения Mesto. С фронтенд версиями можно ознакомиться по ссылкам: 

- **Mesto**: https://github.com/stankenA/mesto
- **Mesto с React**: https://github.com/stankenA/mesto-react

## Описание и функционал

В данной версии реализовано создание сервера на express.js с использование СУБД MongoDB. 
Приложение корректно обрабатывает запросы по следующим роутам: 
- GET /users — возвращает всех пользователей из базы;
- GET /users/:userId — возвращает пользователя по _id ;
- POST /users — создаёт пользователя с переданными в теле запроса name , about и avatar ;
- PATCH /users/me — обновляет профиль пользователя;
- PATCH /users/me/avatar — обновляет аватар пользователя;
- GET /cards — возвращает все карточки из базы;
- POST /cards — создаёт карточку с переданными в теле запроса name и link , устанавливает поле owner для
  карточки;
- DELETE /cards/:cardId — удаляет карточку по _id ;
- PUT /cards/:cardId/likes — ставит лайк карточке;
- DELETE /cards/:cardId/likes — убирает лайк с карточки.

Также сервер корректно реагирует на неправильные запросы и возвращает соответствующий статус и сообщение об ошибке.

## Стек технологий 

В приложении были использованы следующие технологии: 
- Программная платформа Node.js
- Фреймворк express.js 
- СУБД MongoDB в связке с ODM (Object Document Mapper) "Mongoose"

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
  
Остальные директории вспомогательные
