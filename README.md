# InterviewForce 🚀

InterviewForce – это приложение для подготовки к техническим собеседованиям с использованием категорий вопросов, Markdown-редактирования и светлой/тёмной темы.

## 🚀 Возможности

- Управление категориями вопросов.
- Добавление и редактирование вопросов с поддержкой Markdown.
- Подсветка синтаксиса для кода (HTML, JS, TS, Bash и другие).
- Сортировка вопросов по категориям.
- Интерактивный интерфейс с поддержкой светлой и тёмной темы.

## 📂 Структура проекта

- **backend/** – Серверная часть на Node.js и MongoDB.
- **frontend/** – Клиентская часть на React и TypeScript.
- **docker-compose.yml** – Описание контейнеров Docker.
- **nginx/** – Конфигурация для Nginx.

## 🛠️ Установка и запуск

### Шаг 1. Клонирование репозитория

```bash
git clone <URL репозитория>
cd interview-app
```

### Шаг 2. Настройка `.env`

Создайте файл `.env` в корне проекта и добавьте:

```env
MONGO_URL=mongodb://mongo:27017/interview-app
VITE_API_URL=http://localhost:5000
```

### Шаг 3. Запуск через Docker

```bash
docker-compose up -d --build
```

### Шаг 4. Доступ к приложению

- Фронтенд: [http://localhost](http://localhost)
- Бэкенд: [http://localhost:5000](http://localhost:5000)

## 🔄 Роадмап

- 📖 Добавление статистики изученных вопросов.
- 🔧 Улучшение поддержки локалей.
- 📊 Интеграция графиков прогресса.

## 💻 Технологии

- **Frontend**: React, TypeScript, Sass, Zustand.
- **Backend**: Node.js, Express, MongoDB.
- **Сборка**: Vite, Docker, Nginx.

## 📄 Лицензия

Этот проект распространяется под лицензией MIT.
