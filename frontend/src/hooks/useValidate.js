const useValidate = () => {
  const validateEmail = (value) => {
    value = value.trim()

    if (value.length === 0) {
      return {
        valid: false,
        message: 'Введите email',
        code: 'EMAIL_EMPTY',
        empty: true
      }
    }

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    return {
      valid: regex.test(value),
      message: 'Введите email правильно',
      code: 'EMAIL_INVALID',
      empty: false
    }
  }

  const validatePassword = (value) => {
    value = value.trim()

    if (value.length === 0) {
      return {
        valid: false,
        message: 'Введите пароль',
        code: 'PASSWORD_EMPTY',
        empty: true
      }
    }

    return {
      valid: value.length >= 6 && value.length <= 24,
      message: 'Длина пароля от 6 до 24 символов',
      code: 'PASSWORD_LENGTH_INVALID',
      empty: false
    }
  }

  return {
    validateEmail,
    validatePassword
  }
}

export default useValidate
