# AI 3D Emoji Animator — Railway (Fixed)

## Что внутри
- `public/index.html` — UI + устойчивый парсер ответа
- `server.js` — Express-прокси к Google:
  - По умолчанию: imagen-3.0-generate-002:predict
  - Альтернатива: imagegeneration:generate (включи переменной `GOOGLE_IMAGE_ENDPOINT=imagegeneration`)
- `package.json` — `npm start`

## Деплой на Railway
1. Создай репозиторий и залей файлы.
2. В Railway: **New Project → Deploy from GitHub repo**.
3. В **Variables** добавь:
   - `GOOGLE_API_KEY` = ключ из Google AI Studio
   - *(опционально)* `GOOGLE_IMAGE_ENDPOINT` = `imagegeneration`
4. Убедись, что старт — `npm start`.
5. Открой выданный URL → вводи промпт → Generate.

## Локально
```bash
npm install
GOOGLE_API_KEY=... npm start
# http://localhost:3000
```
