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

// Валидация формы, активация кнопки "Отправить", вывод ошибок
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

// Пункт 5 - "Возле поля "Телефон" должна находиться кнопка + ..."
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