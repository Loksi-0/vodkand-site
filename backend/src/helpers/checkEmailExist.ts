import validate from 'deep-email-validator'
import ApiError from '../exceptions/ApiError.js'

export const checkEmailExist = async (email: string) => {
  const isEmailValid = await validate({
    email,
    validateRegex: true,
    validateMx: true,
    validateSMTP: false
  })

  if (!isEmailValid.valid) {
    throw ApiError.BadRequest(
      'Почта не найдена. Проверьте правильность написания'
    )
  }
}
