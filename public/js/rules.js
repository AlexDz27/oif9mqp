class Rule {
  constructor(name, nameRussian) {
    this.name = name
    this.nameRussian = nameRussian

    this.input = document.getElementById(this.name)

    if (this.constructor.name === 'RuleRequired'
        || this.constructor.name === 'RuleAgreed'
        || this.constructor.name === 'RuleEmailOrPhone'
    ) {
      this.populateErrorsBag()
    }
  }

  getErrorId() {
    return `error-${this.constructor.name}-${this.name}`
  }

  populateErrorsBag() {
    errorsBag.set(this.getErrorId(), true)
    // submitButton.disabled = errorsBag.size !== 0
  }
  depopulateErrorsBag() {
    errorsBag.delete(this.getErrorId())
    // submitButton.disabled = errorsBag.size !== 0
  }

  errorMessage() {}
  enforce() {}

  showError() {
    const errorMessageElement = document.getElementById(this.getErrorId())
    if (errorMessageElement) return

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
    // console.log(1)
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
        this.populateErrorsBag()
      } else {
        this.depopulateErrorsBag()
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
    this.input.addEventListener('input', () => {
      if (this.input.value.length > this.maxLength) {
        this.populateErrorsBag()
      } else {
        this.depopulateErrorsBag()
      }
    })

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

    this.input.addEventListener('input', () => {
      if (this.input.value.trim().length !== 0 && !emailRegex.test(this.input.value)) {
        this.populateErrorsBag()
      } else {
        this.depopulateErrorsBag()
      }
    })

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
        this.populateErrorsBag()
      } else {
        this.depopulateErrorsBag()
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
  // TODO: redo allowedFormats
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
      console.log(files[0])
      const oneOfFilesExceedsMaxSize = [...files].some(file => file.size > this.maxSizePerFile)
      const oneOfFilesIsNotAllowedFormat = [...files].some(file => file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'application/pdf')
      if (files.length > 5 || oneOfFilesExceedsMaxSize || oneOfFilesIsNotAllowedFormat) {
        this.populateErrorsBag()
        this.showError()
      } else {
        this.depopulateErrorsBag()
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
        this.populateErrorsBag()
      } else {
        this.depopulateErrorsBag()
      }
    })
    this.emailInput.addEventListener('input', () => {
      if (this.emailInput.value.trim().length === 0) {
        this.populateErrorsBag()
      } else {
        this.depopulateErrorsBag()
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