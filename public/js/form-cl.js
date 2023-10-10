const form = document.querySelector('form')
// Пункт 2 - "Форма не должна отправляться при нажатии на клавишу на клавиатуре Enter"
const submitButton = form.querySelector('button[type=submit]')
form.onsubmit = (e) => {
  if (document.activeElement !== submitButton) e.preventDefault()
}

const forbiddenErrorsBag = new Map()

class Input {
  constructor(name, nameRussian, rules) {
    this.name = name
    this.nameRussian = nameRussian

    this.rules = rules.map(R => new R(name, nameRussian))
    this.rules.forEach(r => r.enforce())
  }
}

class Rule {
  constructor(name, nameRussian) {
    this.name = name
    this.nameRussian = nameRussian

    this.input = document.getElementById(this.name)

    if (this.constructor.name === 'RuleRequired'
        || this.constructor.name === 'RuleAgreed'
        || this.constructor.name === 'RuleEmailOrPhone'
    ) {
      this.populateForbiddenErrorsBag()
    }
  }

  getErrorId() {
    return `error-${this.constructor.name}-${this.name}`
  }

  populateForbiddenErrorsBag() {
    forbiddenErrorsBag.set(this.getErrorId(), true)
    submitButton.disabled = forbiddenErrorsBag.size !== 0
  }
  depopulateForbiddenErrorsBag() {
    forbiddenErrorsBag.delete(this.getErrorId())
    submitButton.disabled = forbiddenErrorsBag.size !== 0
  }

  errorMessage() {}
  enforce() {}

  showError() {
    if (this.input.nextElementSibling?.classList.contains('error')) return

    this.input.style.outline = '1px solid red'

    const html = `
      <div class="error" id="${this.getErrorId()}">${this.errorMessage()}</div>
    `
    if (this.name === 'phone') {
      this.input.parentElement.insertAdjacentHTML('afterend', html)
    } else {
      this.input.insertAdjacentHTML('afterend', html)
    }
  }
  hideError() {
    const errorMessageElement = document.getElementById(this.getErrorId())
    if (errorMessageElement) {
      this.input.style.outline = 'none'

      errorMessageElement.remove()
    }
  }
}
class RuleRequired extends Rule {
  errorMessage() {
    return `Поле "${this.nameRussian}" должно быть заполнено`
  }

  enforce() {
    this.input.addEventListener('input', () => {
      if (this.input.value.trim().length === 0) {
        this.populateForbiddenErrorsBag()
      } else {
        this.depopulateForbiddenErrorsBag()
      }
    })

    this.input.addEventListener('blur', () => {
      if (this.input.value.trim().length === 0) {
        this.showError()
      } else {
        this.hideError()
      }
    })
  }
}
class RuleMaxLength extends Rule {
  constructor(name, nameRussian, maxLength = 20) {
    super(name, nameRussian)
    this.maxLength = maxLength
  }

  errorMessage() {
    return `Поле "${this.nameRussian}" не должно быть больше ${this.maxLength} символов`
  }

  enforce() {
    this.input.addEventListener('blur', () => {
      if (this.input.value.length > this.maxLength) {
        this.showError()
      } else {
        this.hideError()
      }
    })
  }
}
class RuleEmail extends Rule {
  errorMessage() {
    return `Поле "${this.nameRussian}" должно быть валидным имейл-адресом`
  }

  enforce() {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    this.input.addEventListener('blur', () => {
      if (this.input.value.trim().length !== 0 && !emailRegex.test(this.input.value)) {
        this.showError()
      } else {
        this.hideError()
      }
    })
  }
}
class RuleAgreed extends Rule {
  errorMessage() {
    return `Вы должны быть согласны с правилами, чтобы отправить форму`
  }

  enforce() {
    this.input.addEventListener('change', () => {
      if (!this.input.checked) {
        this.populateForbiddenErrorsBag()
      } else {
        this.depopulateForbiddenErrorsBag()
      }
    })

    this.input.addEventListener('blur', () => {
      if (!this.input.checked) {
        this.showError()
      } else {
        this.hideError()
      }
    })
  }
}
class RuleFiles extends Rule {
  // 'maxSize = 5e+6' means 5000000 (5 million). In our case, 5 megabytes
  constructor(name, nameRussian, maxFiles = 5, maxSizePerFile = 5e+6, allowedFormats = ['jpg', 'png', 'pdf']) {
    super(name, nameRussian)
    this.maxFiles = maxFiles
    this.maxSizePerFile = maxSizePerFile
    this.allowedFormats = allowedFormats
  }

  errorMessage() {
    return `Правила для файлов: максимум файлов: 5; максимальный размер одного файла: 5мб; разрешенные форматы: jpg, png, pdf`
  }

  enforce() {
    this.input.addEventListener('input', () => {
      if (this.input.value.trim().length === 0) {
        this.populateForbiddenErrorsBag()
      } else {
        this.depopulateForbiddenErrorsBag()
      }
    })

    this.input.addEventListener('change', () => {
      const files = this.input.files
      const oneOfFilesExceedsMaxSize = [...files].some(file => file.size > this.maxSizePerFile)
      const oneOfFilesIsNotAllowedFormat = [...files].some(file => file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'application/pdf')
      if (files.length > 5 || oneOfFilesExceedsMaxSize || oneOfFilesIsNotAllowedFormat) {
        this.showError()
      } else {
        this.hideError()
      }
    })
  }
}
class RuleEmailOrPhone extends Rule {
  constructor(name, nameRussian, emailInputName) {
    super(name, nameRussian)

    this.emailInput = document.getElementById(emailInputName)
  }

  errorMessage() {
    return `Поле "имейл" либо поле "телефон" должно быть заполнено`
  }

  enforce() {
    this.input.addEventListener('input', () => {
      if (this.input.value.trim().length === 0) {
        this.populateForbiddenErrorsBag()
      } else {
        this.depopulateForbiddenErrorsBag()
      }
    })
    this.emailInput.addEventListener('input', () => {
      if (this.emailInput.value.trim().length === 0) {
        this.populateForbiddenErrorsBag()
      } else {
        this.depopulateForbiddenErrorsBag()
      }
    })

    this.input.addEventListener('blur', () => {
      if (this.input.value.trim().length === 0 && this.emailInput.value.trim().length === 0) {
        this.showError()
      } else {
        this.hideError()
      }
    })
  }
}

const inputsWithValidationRules = [
  new Input('firstName', 'имя', [RuleRequired, RuleMaxLength]),
  new Input('secondName', 'фамилия', [RuleRequired, RuleMaxLength]),
  new Input('patronymic', 'отчество', [RuleMaxLength]),
  new Input('dateOfBirth', 'дата рождения', [RuleRequired]),
  new Input('email', 'имейл', [RuleEmail]),
  new Input('phone', 'телефон', [RuleEmailOrPhone.bind(null, 'phone', 'телефон', 'email')]),
  new Input('about', 'о себе', [RuleMaxLength.bind(null, 'about', 'о себе', 1000)]),
  new Input('agreed', null, [RuleAgreed]),
  new Input('files', null, [RuleFiles]),
]

let phonesCount = 1
const addPhoneButton = document.getElementById('addPhoneButton')
addPhoneButton.onclick = () => {
  phonesCount++

  const lastPhoneContainer = document.querySelectorAll('.phone-container')[document.querySelectorAll('.phone-container').length - 1]
  const html = `
      <div>
        <label class="form-label" for="phone-${phonesCount}">Телефон ${phonesCount}</label>
        <div class="phone-container">
          <input class="form-control" name="phone-${phonesCount}" type="tel" id="phone-${phonesCount}">
        </div>
      </div>
    `

  lastPhoneContainer.insertAdjacentHTML('afterend', html)

  if (phonesCount === 5) addPhoneButton.disabled = true
}