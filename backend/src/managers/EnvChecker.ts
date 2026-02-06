const envChecker = () => {
  const requiredEnv = [
    'JWT_ACCESS_SECRET',
    'JWT_REFRESH_SECRET',
    'PORT',
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASSWORD',
    'OAUTH_GOOGLE_CLIENT_ID',
    'OAUTH_GOOGLE_CLIENT_SECRET',
    'MINECRAFT_API_URL',
    'MINECRAFT_API_KEY',
    'SESSION_SECRET',
    'DB_URL',
    'API_DOMAIN',
    'CLIENT_DOMAIN',
    'API_URL',
    'CLIENT_URL',
    'YOOKASSA_ENDPOINT',
    'YOOKASSA_SHOP_ID',
    'YOOKASSA_SECRET_KEY',
    'YOOKASSA_REDIRECT_URL',
    'MY_EMAIL',
    'ENABLE_ACCOUNT_CLEANUP',
    'ENABLE_ERRORS_LOG',
    'BCRYPT_SALT_ROUNDS',
    'MAX_REFRESH_TOKENS_FOR_USER'
  ]

  requiredEnv.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing ${key} in .env file`)
    }
  })
}

export default envChecker
