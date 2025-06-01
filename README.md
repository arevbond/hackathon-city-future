# git commit -m "5cups" 🚀

Добро пожаловать в репозиторий нашей хакатон команды!

## 🛠 Технологический стек

- **Backend**: Go
- **Frontend**: React (TypeScript)
- **База данных**: PostgreSQL
- **Контейнеризация**: Docker

## 🚀 Быстрый старт

### Запуск backend

1. Перейдите в `backend/` директорию проекта
2. Скопируйте файл конфигурации (если его нет):
   ```bash
   cp .env.example .env
   ```
3. Запустите приложение с помощью Docker Compose:
   ```bash
   docker compose up
   ```

### Запуск frontend

1. Перейдите в директорию `frontend/`
2. Установите зависимости:
   ```bash
   npm install
   ```
3. Запустите приложение:
   ```bash
   npm start
   ```

## 📚 Документация и ресурсы

### Дизайн и архитектура
- **[Excalidraw диаграмма](https://excalidraw.com/#json=GsjVGws9bCNiUD0ueCLtb,GV1YvhQb3dQs3_oAvf_1_w)** - схема архитектуры
- **[Схема базы данных](https://drawsql.app/teams/hestia/diagrams/hackathon)** - структура БД
- **[Figma макеты](https://www.figma.com/team_invite/redeem/onXYqZwSzDxexMpkuXgNik)** - UI/UX дизайн

### API документация
- **[Swagger спецификация](backend/docs/swagger.yaml)** - OpenAPI документация
- **[Postman коллекция](backend/docs/hackthon.json)** - готовые запросы для тестирования API

## 🏗 Структура проекта

```
.
├── backend/
│   ├── docs/                 # API документация
│   ├── migrations/           # Миграции БД
│   ├── docker-compose.yml    # Docker конфигурация
│   ├── Dockerfile           # Backend образ
│   ├── .env.example         # Пример конфигурации
│   └── ...                  # Go исходники
└── frontend/
    └── ...                  # React приложение
```

## 🐳 Docker

Проект полностью контейнеризован. Основные файлы:
- `docker-compose.yml` - основная конфигурация
- `compose.dev.yml` - конфигурация для разработки
- `Dockerfile` - образ backend приложения
- `Dockerfile.migrations` - образ для миграций БД

