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

const inputsWithValidationRules = [
  new Input('firstName', 'имя', [RuleRequired, RuleMaxLength]),
  new Input('secondName', 'фамилия', [RuleRequired, RuleMaxLength])
]

// possible for OR
// enforcePhoneOrEmailRequiredRule() {... new Input(...) ...}
