# UI для CI сервера

### Чтобы запустить CI сервер:

1. `npm start` для [этого репозитория](https://github.com/Super-Cereal/BlackWhiteNYellow)
2. Установить [репозиторий с nodejs сервером](https://github.com/Super-Cereal/CiServer)
3. Добавить `.env` файл в корень папки с nodejs сервером с единственной строкой
   ```JS
   authToken="uuiiayuer"
   ```
   Где uuiiayuer - токен авторизации(без "Bearer") для [бекенда Яндекса](https://shri.yandex/hw/api/index.html)
4. `npm start` для репозитория с nodejs сервером
5. Перейти на `localhost:3000`
6. Чтобы сборки по добавлению начинали исполнение - скачать репозиторий с [Ci сервером и его агентами](https://github.com/Super-Cereal/buildServer)

### Адреса страниц

- стартовая страница `/` (+список билдов после получения настроек)
- детали билда `/build/{buildId}`
- настройки `/settings`

## TypeScript

Я не подключал typescript к Redux и вспомогательным скриптам, снимающих метрики

## Метрики

По адресу `/service/metrics` доступны данные о собранных метриках.

## Тесты

**Чтобы запустить тесты -** скачать репозиторий, установить зависимости и `npm test`.

Модульные тесты написаны для большинства компонент и всех redux-thunk, с которыми они работают.

Модульных тестов под апи и интеграционных под клиент нет.

## Redux

Redux store, селекторы, мидлвары, и редьюсер для App компоненты лежат в [redux](https://github.com/Super-Cereal/BlackWhiteNYellow/tree/master/src/redux) папке.

Все остальные редьюсеры лежат в папке redux внутри каждой отдельной компоненты.

Подключенные мидлвары - `redux-thunk` и мой [typeToAction](https://github.com/Super-Cereal/BlackWhiteNYellow/blob/master/src/redux/middlewares.js)(для самых простых акшенов, не имеющих payload)

## Страницы

### /

Сперва происходит инициализация приложения во время котрого происходит запрос за сохраненными на бекенде настройками, если их нет, то отображается стартовый экран как на макете.

### /settings

Формы написаны с помощью библиотеки [react-hook-form](https://react-hook-form.com/api/useform)

- На имя репозитория и ветки стоят запрещающие паттерны

- Существование репозитория и ветки дополнительно проверяется на клиенте с помощью `github api` (Однако оно ограничивает кол-во запросов, поэтому из-за спама запросов будет возвращать 403 - тогда ошибка появится сервере и опять же обработается на клиенте)

- После отправки формы на сервере начинается клонирование репа, кнопки формы блокируются. (Когда реп. склонирован кнопки разблокируются и начинается установка зависимостей, уже в этот момент можно добавлять билды в очередь, они будут дожидаться окончания установки и затем билдиться один после другого)

### / (с полученными настройками)

Билд, который исполняется в текущий момент - черный без иконки. Те, что пока в очереди или завершены - как по макету.

### /build/{buildId}

Логи билда красятся по спец.символам ANSI с помощью библиотеки [asni-to-html](https://www.npmjs.com/package/ansi-to-html)

## Стили

Стили написаны с sass и бем-методологии, файл стилей хранится вместе с компонентой.

Большинство иконок подключены с помощью шрифтов, созданных приложением [icomoon.io](https://icomoon.io/app/)

Цвета, подключение шрифтов, sass-mixin-ы для адаптивной верстки и некоторые глобальные стили хранятся в папке [/style/sass/](https://github.com/Super-Cereal/BlackWhiteNYellow/tree/master/src/redux)
