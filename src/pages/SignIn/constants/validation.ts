import { validateEmail } from '../../../tools/validation'
export const loginValidation = {
  required: 'Вы не ввели почту',
  validate: validateEmail,
}

export const passwordValidation = {
  required: 'Вы не ввели пароль',
}
