# Ventorme — лендинг для школьников

Лендинг [Ventorme](https://ventorme.ai): AI-платформы, которая помогает школьникам Казахстана выбрать профессию и поступить в вуз — в Казахстане по ЕНТ или за рубежом.

Сделан командой **093** на хакатоне **HACKNEXT × Ventorme**.

**Сайт:** https://ventorme-six.vercel.app

Копия на GitHub Pages: https://dujsembaevalihan636-coder.github.io/ventorme-landing/

## Что на странице

- **Hero** — заголовок «Узнай, кем тебе быть. Поступи в …» с вращающимся названием вуза. Фон — фото кампуса, которое меняется вместе с названием.
- **Мини-тест** — 5 вопросов, результат: направление и что сдавать (ЕНТ или IELTS/SAT). Маскот Venti реагирует на ответы.
- **Карусель вузов** — 8 университетов с фото кампусов.
- **Папки** «Портфолио», «Мои вузы», «Гранты» — показывают, что будет в аккаунте Ventorme.
- **Отзывы, FAQ, финальный призыв** к регистрации.

Ещё есть:
- три языка: русский, казахский, английский;
- светлая и тёмная тема (каждый заход начинается со светлой);
- окно-подсказка, если сайт открыт во встроенном браузере Instagram, Facebook или TikTok, где вход через Google может не работать.

Все кнопки регистрации ведут на:

```
https://ventorme.ai/register?utm_source=hacknext&utm_campaign=team-093
```

## Технологии

Один файл `index.html` на чистом HTML, CSS и JavaScript: без фреймворков, сборки и зависимостей.

- Шрифты Manrope и Unbounded (Google Fonts, с кириллицей и казахскими буквами).
- Фото кампусов лежат в `universities/` в формате WebP, в двух размерах: 1600px и 800px для телефонов.
- Учтён `prefers-reduced-motion`: при отключённой анимации страница работает без движения.

## Структура

```
index.html               страница целиком: разметка, стили, скрипты, переводы
universities/            фото кампусов (*.webp и *-800.webp)
universities/CREDITS.json   авторы и лицензии фото
.nojekyll                отключает обработку Jekyll на GitHub Pages
```

## Как запустить локально

Сайт статический, но открывать его лучше через локальный сервер, а не двойным кликом по файлу:

```bash
cd ventorme-landing
python3 -m http.server 8000
```

Затем откройте http://localhost:8000.

## Как обновить сайт

Основной адрес — **Vercel** (проект `ventorme`). Копия на **GitHub Pages** обновляется сама после каждого `git push` в ветку `main`, обычно за 1–2 минуты.

```bash
git add -A
git commit -m "что изменилось"
git push
```

Статус публикации GitHub Pages виден во вкладке **Actions** репозитория (workflow «pages build and deployment»).

Выложить на Vercel (нужен [Vercel CLI](https://vercel.com/docs/cli) и вход в аккаунт):

```bash
npx vercel link --project ventorme --yes   # один раз
npx vercel deploy --prod --yes
```

## Настройки в коде

В начале скрипта в `index.html`:

```js
const TEAM = "093";            // номер команды в UTM-ссылке регистрации
const GA_ID = "G-VW4V9EX6QR";  // Google Analytics 4
```

## Аналитика (Google Analytics 4)

| Событие | Когда | Параметры |
|---|---|---|
| `quiz_start` | ответ на первый вопрос теста | — |
| `quiz_step` | каждый ответ | `step` |
| `quiz_done` | показан результат теста | `direction` |
| `reg_click` | клик по любой кнопке регистрации | `place`: header, hero, result, folder, final, sticky |
| `share_friend`, `share_parents` | кнопки «поделиться» | `channel` |
| `carousel_slide` | смена слайда в карусели | `university`, `trigger` |
| `folder_open` | открытие папки | `folder` |
| `lang_switch` | смена языка | — |

У всех событий есть параметр `site_language` (ru, kk или en). Имя `language` не используется: gtag считает его встроенным полем языка браузера. Чтобы видеть `site_language` в отчётах, зарегистрируйте его в GA как пользовательское измерение (Custom dimension).

Проверить события: откройте сайт с `?ga_debug=1` в адресе и смотрите **Admin → DebugView** в GA.

## Языки

Язык по умолчанию — русский. Выбор запоминается. Язык можно задать ссылкой:

- `?lang=kk` — казахский;
- `?lang=en` — английский.

Все тексты лежат в словаре `I18N` внутри `index.html`.

> **Внимание:** казахские тексты переведены без носителя языка. Перед публикацией их нужно вычитать.

## Фото и лицензии

Фото кампусов взяты с Wikimedia Commons, под каждым на сайте указаны автор и лицензия.

| Вуз | Автор | Лицензия | Источник |
|---|---|---|---|
| The University of Hong Kong | Ka-Fai So | CC BY-SA 3.0 | [Commons](https://commons.wikimedia.org/wiki/File:Main_Building_HKU_20100926_03.JPG) |
| CUHK | Citobun | CC BY-SA 3.0 | [Commons](https://commons.wikimedia.org/wiki/File:Chinese_University_of_Hong_Kong_%E9%A6%99%E6%B8%AF%E4%B8%AD%E6%96%87%E5%A4%A7%E5%AD%B8.JPG) |
| King's College London | KiloCharlieLima | CC BY-SA 4.0 | [Commons](https://commons.wikimedia.org/wiki/File:King%27s_Building_and_Strand_quad.jpg) |
| UCL | Tony Hisgett | CC BY 2.0 | [Commons](https://commons.wikimedia.org/wiki/File:UCL_3_Wilkins_building_(32410942845).jpg) |
| Bocconi University | Paolo Gamba | CC BY 2.0 | [Commons](https://commons.wikimedia.org/wiki/File:Bocconi_Grafton_Building_Milan.jpg) |
| Nazarbayev University | Кондуктор-контролёр | CC BY-SA 4.0 | [Commons](https://commons.wikimedia.org/wiki/File:Nazarbaev_University_Astana.JPG) |
| NYU Shanghai | JACK728 | CC BY-SA 4.0 | [Commons](https://commons.wikimedia.org/wiki/File:NYUSH_Lujiazui_Building.jpg) |
| University of Illinois | Daniel Schwen | CC BY-SA 4.0 | [Commons](https://commons.wikimedia.org/wiki/File:Altgeld_Hall.jpg) |

Фото уменьшены и пересохранены в WebP.

Остальное взято с [ventorme.ai](https://ventorme.ai): логотипы Ventorme и вузов, маскот Venti, картинка для превью ссылки. Отзывы тоже опубликованы на ventorme.ai.

## Авторы

Команда 093, хакатон HACKNEXT × Ventorme, 2026.
