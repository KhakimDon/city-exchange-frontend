# Настройка Netlify

## Переменные окружения

Настройте в Netlify UI: **Site settings > Build & deploy > Environment variables**

Добавьте:
- **Key:** `VITE_API_BASE_URL`
- **Value:** `https://your-ngrok-url.ngrok-free.app` (ваш ngrok URL)

## Настройка сканирования секретов

В Netlify UI: **Site settings > Build & deploy > Environment variables**

Добавьте переменную для игнорирования сканирования:
- **Key:** `SECRETS_SCAN_OMIT_KEYS`
- **Value:** `VITE_API_BASE_URL`

**Примечание:** `VITE_API_BASE_URL` - это публичная переменная, которая встраивается в клиентский код. Это нормально для фронтенда, так как клиент должен знать URL API.

## Локальная разработка

Создайте файл `.env.local` (не коммитится в git):
```
VITE_API_BASE_URL=http://localhost:8000
```

