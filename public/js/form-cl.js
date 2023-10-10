class Input {
  constructor(name, nameRussian, rules) {
    this.name = name
    this.nameRussian = nameRussian

    this.rules = rules.map(R => new R(name, nameRussian))
    this.rules.forEach(r => r.enforce())
  }
}

class Rule {
  // ? TODO: мне канеш не оч нравится что у меня повторяются name и nameRussian
  // было бы неплохо сразу их иметь уже как-то
  // Но походу это невозможно в моей текущей парадигме
  constructor(name, nameRussian) {
    this.name = name
    this.nameRussian = nameRussian

    this.input = document.getElementById(this.name)
  }

  errorMessage() {}
  enforce() {}

  showError() {
    if (this.input.nextElementSibling?.classList.contains('error')) return

    const html = `
      <div class="error" id="error-${this.constructor.name}-${this.name}">${this.errorMessage()}</div>
    `
    this.input.insertAdjacentHTML('afterend', html)
  }
  hideError() {
    const errorMessageElement = document.getElementById(`error-${this.constructor.name}-${this.name}`)
    if (errorMessageElement) {
      errorMessageElement.remove()
    }
  }
}
class RuleRequired extends Rule {
  errorMessage() {
    return `Поле "${this.nameRussian}" должно быть заполнено`
  }

  enforce() {
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

const inputsWithValidationRules = [
  new Input('firstName', 'имя', [RuleRequired, RuleMaxLength]),
  new Input('secondName', 'фамилия', [RuleRequired, RuleMaxLength]),
  new Input('patronymic', 'отчество', [RuleMaxLength]),
  new Input('dateOfBirth', 'дата рождения', [RuleRequired]),
  new Input('email', 'имейл', [RuleEmail]),
  new Input('about', 'о себе', [RuleMaxLength.bind(null, 'about', 'о себе', 100)]),
  new Input('agreed', null, [RuleAgreed]),
  new Input('files', null, [RuleFiles]),
]

// possible for OR
// enforcePhoneOrEmailRequiredRule() {... new Input(...) ...}
