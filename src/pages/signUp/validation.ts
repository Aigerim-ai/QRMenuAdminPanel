// eslint-disable-next-line import/prefer-default-export
const REQUIRED_FIELD = 'Обязательно для заполнения'
// eslint-disable-next-line import/prefer-default-export
export const nameOfInstitution = {
  required: REQUIRED_FIELD,
}
export const city = {
  required: REQUIRED_FIELD,
}
export const biinOfInstitution = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (value.match(/[а-яА-Яa-zA-z]/)) {
      return 'БИН организации не может состоять из букв'
    }
    if (value.length !== 12) {
      return 'БИН организации должен состоять из 12 цифр'
    }
    return true
  },
}
export const locationOfInstitution = {
  required: REQUIRED_FIELD,
}
export const nameAndSurname = {
  required: REQUIRED_FIELD,
}
export const jobTitle = {
  required: REQUIRED_FIELD,
}
export const iin = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (value.match(/[а-яА-Яa-zA-z]/)) {
      return 'ИИН не может состоять из букв'
    }
    if (value.length !== 12) {
      return 'ИИН должен состоять из 12 цифр'
    }
    return true
  },
}
export const email = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    // eslint-disable-next-line no-useless-escape
    if (value.match(/^\S+@\S+\.\S+$/g)) {
      return 'E-mail введен неправильно'
    }
    return true
  },
}
export const number = {
  required: REQUIRED_FIELD,
}
