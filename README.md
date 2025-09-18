# AI 3D Emoji Animator — GitHub → Vercel

## Шаги запуска
1. Создай репозиторий на GitHub и залей файлы (`index.html`, `api/generate.js`, `vercel.json`).
2. Зайди на https://vercel.com → **Add New Project** → **Import Git Repository** → выбери свой репозиторий.
3. В настройках проекта на Vercel открой **Settings → Environment Variables** и добавь переменную:
   - **Name:** `GOOGLE_API_KEY`
   - **Value:** (твоя API-строка от Google)
4. Нажми **Deploy**. После билда у тебя будет URL вида `https://<имя-проекта>.vercel.app`.
5. Открой URL — интерфейс работает, кнопка **Generate** дергает `api/generate` на сервере, ключ скрыт.

## Почему так
- GitHub Pages — это только статический хостинг, ключ нельзя прятать, а прямые запросы к Google часто блокируются CORS.
- Vercel добавляет серверную функцию в `/api/generate` и сохраняет ключ в переменных окружения (не в коде).
