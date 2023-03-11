export const validateEmail = (value: string) => {
  if (value.match(/[а-яА-Я]/)) {
    return 'Почта не может содержать русские буквы'
  }
  return true
}
