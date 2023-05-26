# Документация

- [Настройка окружения для разработки](#настройка-окружения-для-разработки)
- [Разработка](#разработка)
- [Использование](#использование)

## Настройка окружения для разработки

- [Для пользователей Windows](#настройка-окружения-для-пользователей-windows)
- [Для пользователей Linux](#настройка-окружения-для-пользователей-linux)

### Настройка окружения для пользователей Windows

1. Установить среду выполнения [Node.JS](https://nodejs.org/en)

   - Перейти по ссылке на официальный сайт [Node.JS](https://nodejs.org/en), скачать и установить последнюю актуальную **LTS** версию
   - После установки открыть терминал в любом месте и убедиться, что установка прошла успешно

     ```bash
       $ node -v
     ```

     ```bash
       $ npm -v
     ```

2. Установить компилятор [TypeScript](https://www.typescriptlang.org/download) любым из предложенных способов

   - Открыть терминал в любом месте и установить TypeScript **глобально**

     ```bash
       $ npm i -g typescript
     ```

   - Открыть терминал в корневой папке проекта и установить TypeScript **локально**

     ```bash
       $ npm i -D typescript
     ```

3. Создать собственного бота в Telegram

   - Перейти в личные сообщения с [BotFather](https://t.me/BotFather)
   - Создать нового бота

     ```bash
       /newbot
     ```

   - После указания названия и имени бота получить `TOKEN`

4. Настроить переменные окружения

   - В корневой папке проекта создать пустой файл `.env`
   - В только что созданном файле объявить переменные:

     ```env
       TELEGRAM_BOT_TOKEN='<TOKEN БОТА ТЕЛЕГРАММ>' # Токен используемого Телеграмм бота

       EMAIL_SERVICE_DOMAIN='<ДОМЕН ПОЧТОВОГО СЕРВИСА>' # Домен почтового сервиса для отправки писем
       EMAIL_SERVICE_PORT='<ПОРТ ПОЧТОВОГО СЕРВИСА>' # Порт почтового сервиса для отправки писем
       EMAIL_SERVICE_USER='<АДРЕС ЭЛЕКТРОННОЙ ПОЧТЫ>' # Адрес электронной почты, с которого будут присылаться письма
       EMAIL_SERVICE_PASSWORD='<ПАРОЛЬ ОТ ЭЛЕКТРОННОЙ ПОЧТЫ>' # Пароль от электронной почты, с которого будут присылаться письма
     ```

5. Собрать текущую версию приложения
   - Запустить файл `#Dependencies Install` из корневой папки проекта для установки зависимостей (**`#Dependencies Update` НЕ ЗАПУСКАТЬ**)
   - Запустить файл `#Build` из корневой папки проекта для сборки приложения (`запускать после каждого сохраненного изменения в папке ./src`)
   - Запустить файл `#RunProd` из корневой папки проекта для запуска собранной Production-версии приложения

### Настройка окружения для пользователей Linux

1. Установить среду выполнения [Node.JS](https://nodejs.org/en)

   - Открыть терминал в любом месте и скачать скрипт установки Node.JS

     ```bash
       $ curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh
       $ sudo bash nodesource_setup.sh
       $ sudo apt install nodejs
     ```

   - После установки открыть терминал в любом месте и убедиться, что установка прошла успешно

     ```bash
       $ node -v
     ```

     ```bash
       $ npm -v
     ```

2. Установить компилятор [TypeScript](https://www.typescriptlang.org/download) любым из предложенных способов

   - Открыть терминал в любом месте и установить TypeScript **глобально**

     ```bash
       $ npm i -g typescript
     ```

   - Открыть терминал в корневой папке проекта и установить TypeScript **локально**

     ```bash
       $ npm i -D typescript
     ```

3. Создать собственного бота в Telegram для удобного тестирования

   - Перейти в личные сообщения с [BotFather](https://t.me/BotFather)
   - Создать нового бота

     ```bash
       /newbot
     ```

   - После указания названия и имени бота получить `TOKEN`

4. Настроить переменные окружения

   - В корневой папке проекта создать пустой файл `.env`
   - В только что созданном файле объявить переменные:

     ```env
       TELEGRAM_BOT_TOKEN='<TOKEN БОТА ТЕЛЕГРАММ>' # Токен используемого Телеграмм бота

       EMAIL_SERVICE_DOMAIN='<ДОМЕН ПОЧТОВОГО СЕРВИСА>' # Домен почтового сервиса для отправки писем
       EMAIL_SERVICE_PORT='<ПОРТ ПОЧТОВОГО СЕРВИСА>' # Порт почтового сервиса для отправки писем
       EMAIL_SERVICE_USER='<АДРЕС ЭЛЕКТРОННОЙ ПОЧТЫ>' # Адрес электронной почты, с которого будут присылаться письма
       EMAIL_SERVICE_PASSWORD='<ПАРОЛЬ ОТ ЭЛЕКТРОННОЙ ПОЧТЫ>' # Пароль от электронной почты, с которого будут присылаться письма
     ```

5. Собрать текущую версию приложения

   - Открыть терминал в корневой папке проекта и установить требуемые зависимости (**`npm i` / `npm install` / `npm update` НЕ ЗАПУСКАТЬ**)

     ```bash
       $ npm ci
     ```

   - Начать сборку приложения (`запускать после каждого сохраненного изменения в папке ./src`)

     ```bash
       $ npm run build
     ```

   - Запустить собранную Production-версию приложения
     ```bash
       $ npm run prod
     ```

## Разработка

- [Импорт модулей](#импорт-модулей)
- [Обработчики событий](#обработчики-событий)
- [Обработчики сообщений](#обработчики-сообщений)
- [Обработчики взаимодействий](#обработчики-взаимодействий)
- [Обработчики команд](#обработчики-команд)

### Импорт модулей

- Для работы приложения используются модули [server-core](https://github.com/var3n1k/ServerCore/pkgs/npm/server-core) и [telegram](https://github.com/var3n1k/Telegram/pkgs/npm/telegram)

  - Импорт модулей осуществляется через стандартные пакетные менеджеры `NodeJS`

    ```bash
      $ npm install @var3n1k/server-core
      $ npm install @var3n1k/telegram
    ```

    ```bash
      $ yarn add @var3n1k/server-core
      $ yarn add @var3n1k/telegram
    ```

    ```bash
      $ pnpm add @var3n1k/server-core
      $ pnpm add @var3n1k/telegram
    ```

### Обработчики событий

- Обработчики событий размещаются в папке `src/api/Telegram/ChatBot/Events`. Для создания обработчика рекомендуется использовать [шаблон обработчика событий](https://github.com/var3n1k/Telegram/pkgs/npm/telegram#%D0%BE%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA-%D1%81%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D0%B9) из библиотеки [telegram](https://github.com/var3n1k/Telegram/pkgs/npm/telegram)

### Обработчики сообщений

- Обработчики сообщений размещаются в папке `src/api/Telegram/ChatBot/Messages`. Для создания обработчика рекомендуется использовать [шаблон обработчика сообщений](https://github.com/var3n1k/Telegram/pkgs/npm/telegram#%D0%BE%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA-%D1%81%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D0%BD%D0%B8%D0%B9) из библиотеки [telegram](https://github.com/var3n1k/Telegram/pkgs/npm/telegram)

### Обработчики взаимодействий

- [Обработчики нажатий на кнопку](#обработчики-нажатий-на-кнопку)

#### Обработчики нажатий на кнопку

- Обработчики нажатий на кнопку размещаются в папке `src/api/Telegram/ChatBot/Action/Components`. Для создания обработчика рекомендуется использовать [шаблон обработчика нажатий на кнопку](https://github.com/var3n1k/Telegram/pkgs/npm/telegram#%D0%BE%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA-%D0%BD%D0%B0%D0%B6%D0%B0%D1%82%D0%B8%D0%B9-%D0%BD%D0%B0-%D0%BA%D0%BD%D0%BE%D0%BF%D0%BA%D1%83) из библиотеки [telegram](https://github.com/var3n1k/Telegram/pkgs/npm/telegram)

### Обработчики команд

- [Обработчики слэш-команд](#обработчики-слэш-команд)

#### Обработчики слэш-команд

- Обработчики слэш-команд размещаются в папке `src/api/Telegram/ChatBot/Commands`. Для создания обработчика рекомендуется использовать [шаблон обработчика слэш-команд](https://github.com/var3n1k/Telegram/pkgs/npm/telegram#%D0%BE%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA-%D1%81%D0%BB%D1%8D%D1%88-%D0%BA%D0%BE%D0%BC%D0%B0%D0%BD%D0%B4) из библиотеки [telegram](https://github.com/var3n1k/Telegram/pkgs/npm/telegram)

## Использование

- [Добавление бота](#добавление-бота)
- [Часто-задаваемые вопросы](#часто-задаваемые-вопросы)
- [Обратная связь](#обратная-связь)
- [Услуги и расценки](#услуги-и-расценки)
- [Запись на курс](#запись-на-курс)

### Добавление бота

- Для добавления бота [Formula ЕГЭ](http://t.me/FormulaEGEBot) перейдите по ссылке и введите любую из нижепредложенных команд

### Часто-задаваемые вопросы

- Список часто-задаваемых вопросов можно получить по команде `/faq`
- При отправке боту сообщения, приблизительно содержащего в себе контекст часто-задаваемого вопроса, вы получите на нгео ответ

### Обратная связь

- Контакты для обратной связи можно получить по команде `/contacts`

### Услуги и расценки

- Список услуг и расценок к ним можно получить по команде `/pricing`

### Запись на курс

- Записаться на курс можно по команде `/registration`
  - Первоначальное заполнение заявки включает в себя
    - ФИО заказчика (родителя)
      - ФИО должно быть написано в одну строку, разделенную пробелами. Регистр неважен
    - ФИО обучающегося (ребенка)
      - ФИО должно быть написано в одну строку, разделенную пробелами. Регистр неважен
    - Контактный номер телефона
      - Номер телефона может иметь форматы `8 9...` / `+7 9...` / `7 9...` / `9...`
    - Контактный адрес электронной почты
    - Желаемые предметы для изучения
      - Предметы выбираются из списка существующих через нажатие кнопок
      - Количество выбираемых предметов неограничено
    - Подходящий филиал
      - Филиал выбирается из списка существующих через нажатие кнопок
  - После первоначального наполнения вам будет предложено отредактировать данные, либо отправить заявку
