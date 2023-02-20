# Проект Guitar Store

## Запуск проекта

### Подготовка к запуску

1. Переместитесь в директорию `guitar-store` и установите нужные пакеты, выполнив `npm install`
2. Переместитесь в корневую директорию
3. Создайте файл: `.env`
4. Заполните файлы переменными окружения, как в `.env-example` файле

### Backend

1. Из корневой директории переместитесь в директорию `/guitar-store/packages/backend/prisma`, создайте `.env` файл и добавьте connection string, как в файле `.env-example`.
2. Из корневой директории проекта перейдите в директорию `/guitar-store/packages/backend` и выполните `docker compose up -d`.
3. Из корневой директории перейдите в директорию `/guitar-store` и выполните `npx nx run backend:db-migrate` для миграции бд
4. Далее выполните `npm run cli generate`. Можно получить справку по команде выполнив `npm run cli help`.
5. Выполните `npx nx run backend:serve` для запуска backend-сервера

### Frontend

1. Перейдите из корневой директории в `/guitar-store` и выполните `npx nx run frontend:serve`

## API спецификация

OpenAPI спецификации сервиса находятся по адресу `http://localhost:3333/spec`

## Сценарии

1. `npm run cli` - cli для генерации данных
2. `npx nx run backend:db-validate` - проверяет корректность `schema.prisma` файла
3. `npx nx run backend:db-migrate` - запускает миграцию для базы данных
4. `npx nx run backend/frontend:serve` - запускает dev server для проектов
5. `npx nx run backend/frontend:lint` - запускает линтер для проектов
6. `npx nx run backend/frontend:build` - создает релизный билд для проектов

## Затрачено времени

1. Backend - 34 часа
2. Frontend - 49 часов

## Admin
1. Email по умолчанию `admin@mail.com`
2. Пароль по умолчанию `admin`