type ReturnType = {
  valid: boolean
  message: string
  code:
    | 'EMAIL_EMPTY'
    | 'EMAIL_INVALID'
    | 'PASSWORD_EMPTY'
    | 'PASSWORD_LENGTH_INVALID'
    | 'OK'
  empty: boolean
}

const useValidate = () => {
  const validateEmail = (value: string): ReturnType => {
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

    if (!regex.test(value)) {
      return {
        valid: false,
        message: 'Введите email правильно',
        code: 'EMAIL_INVALID',
        empty: false
      }
    }

    return {
      valid: true,
      message: '',
      code: 'OK',
      empty: false
    }
  }

  const validatePassword = (value: string): ReturnType => {
    value = value.trim()

    if (value.length === 0) {
      return {
        valid: false,
        message: 'Введите пароль',
        code: 'PASSWORD_EMPTY',
        empty: true
      }
    }

    if (!(value.length >= 6 && value.length <= 24)) {
      return {
        valid: false,
        message: 'Длина пароля от 6 до 24 символов',
        code: 'PASSWORD_LENGTH_INVALID',
        empty: false
      }
    }

    return {
      valid: true,
      message: '',
      code: 'OK',
      empty: false
    }
  }

  return {
    validateEmail,
    validatePassword
  }
}

export default useValidate
