# Vodkand

**Vodkand** — платформа продажи цифровых товаров для Minecraft сервера. JWT авторизация, вход с Google и статистика наказаний в аккаунте.

---

### Стек технологий

* **Frontend**
  * React
  * Typescript
  * Axios
  * MobX
  * Swiper
  * React Markdown

* **Backend**
  * Express
  * Typescript
  * Mongoose
  * Google Auth Library
  * Mongoose
  * Nodemailer

---

### Ключевые фичи

* **JWT** авторизация
* **Онлайн оплата** через API ЮKassa
* Авторизация **через Google аккаунт**
* Отображение наказаний (банов, мутов) **напрямую через API майнкрафт сервера**
* **Активация аккаунта** через подтверждение почты

---

### Ссылка на проект

**[https://vodkand.ru](https://vodkand.ru)**

---

### Инструкция по запуску (Docker)

Проект полностью контейнеризирован и предполагает запускаться через Docker, так что для локального запуска вам понадобятся Docker и Docker Compose

1. **Создание папки проекта:**

  Создайте папку vodkandApp в любом месте вашего компьютера и перейдите в нее

  ```bash
  mkdir vodkandApp
  cd vodkandApp
  ```

2. **Клонирование репозитория:**

  Обратите внимание на точку в конце команды. С ней проект скопируется в текущую папку, а не создаст новую

  ```bash
   git clone https://github.com/Loksi-0/vodkand-site.git .
   ```

3. **Настройка переменных окружения:**
  * Frontend:
  
    Создайте файл .env в папке frontend со следующими переменными и данными:

    ```ini
    VITE_API_URL=/api
    VITE_DISABLE_PAYMENT=false # true для временного закрытия продаж
    VITE_INITIAL_THEME=dark
    ```
  * Backend:

    Создайте файл .env в папке backend со следующими переменными и заполните их своими данными:

    ```ini
    PORT=5000
    JWT_ACCESS_SECRET=YOUR_ACCESS_SECRET
    JWT_REFRESH_SECRET=YOUR_REFRESH_SECRET
    SMTP_HOST=YOUR_SMTP_HOST
    SMTP_PORT=YOUR_SMTP_PORT
    SMTP_USER=YOUR_SMTP_USER
    SMTP_PASSWORD=YOUR_SMTP_PASSWORD
    MY_EMAIL=YOUR_EMAIL # на этот адрес будут отправляться письма о новых продажах
    API_URL=/api
    CLIENT_URL=/
    OAUTH_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID
    OAUTH_GOOGLE_CLIENT_SECRET=YOUR_CLIENT_SECRET
    MINECRAFT_API_URL=YOUR_MINECRAFT_API_URL
    MINECRAFT_API_KEY=YOUR_MINECRAFT_API_KEY
    SESSION_SECRET=YOUR_SESSION_SECRET
    ENABLE_ACCOUNT_CLEANUP=true # неактивированные аккаунты и аккаунты без проходки будут удаляться через 10 дней
    ENABLE_ERRORS_LOG=true
    BCRYPT_SALT_ROUNDS=12
    MAX_REFRESH_TOKENS_FOR_USER=10
    YOOKASSA_ENDPOINT=https://api.yookassa.ru/v3
    NODE_ENV=dev # production для продакшена
    ```
    Создайте файлы .env.dev (для разработки) и .env.production (для продакшена) в папке backend. Заполните каждый из них следующими переменными:
    
    ```ini
    DB_URL=YOUR_DB_URL
    API_DOMAIN=http://localhost:5000 # ваш домен для продакшена
    CLIENT_DOMAIN=http://localhost:5173 # ваш домен для продакшена
    YOOKASSA_SHOP_ID=YOUR_SHOP_ID
    YOOKASSA_SECRET_KEY=YOUR_SECRET_KEY
    YOOKASSA_REDIRECT_URL=http://localhost:5173/payment/pending # для продакшена заменить localhost на домен
    ```

4. **Сборка и запуск контейнеров:**

  Запустите сборку контейнеров в фоновом режиме:
  ```bash
    docker compose up --build -d
  ```
  Команда автоматически скачает нужные образы, соберет фронтенд и бекенд, запустит контейнеры и настроит сеть между ними

5. **Доступ к приложению:**

  * **Frontend**: [http://localhost:3002](http://localhost:3002) (или http://<ip_вашего_сервера>:3002)
  * **Backend API**: [http://localhost:5002](http://localhost:5002) (или http://<ip_вашего_сервера>:5002)