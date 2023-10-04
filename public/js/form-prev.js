// Пункт 2 - "Форма не должна отправляться при нажатии на клавишу на клавиатуре Enter"
const formPrev = document.querySelector('form')
const allInputs = formPrev.querySelectorAll('input')
allInputs.forEach((inp) => {
  inp.onkeydown = (e) => {
    if (e.key === 'Enter') e.preventDefault()
  }
})

// Пункты 1, 3, 4, 6 (TODO) - "Валидация формы и всех ее полей", ...
enableSubmitButtonIfFormIsCorrect()

// )TODO: ref: это вообще не должен быть массив, а должна быть просто строка по идее
// хотя мейби и нет учитывая кейс с "имейл ИЛИ телефон"
function enableSubmitButtonIfFormIsCorrect() {
  const errorsBag = {
    firstNameInput: ['Поле "имя" должно быть заполнено.'],
    secondNameInput: ['Поле "фамилия" должно быть заполнено.'],
    patronymicInput: [],
    dateOfBirthInput: ['Поле "дата рождения" должно быть заполнено.'],
    emailInput: [],
    phoneInput: ['Поле "имейл" либо поле "телефон" должно быть заполнено.'],
    agreedInput: ['Вы должны быть согласны с правилами, кликнув по галочке.']
  }

  const firstNameInput = document.querySelector('input[name=firstName]')
  firstNameInput.oninput = () => {
    errorsBag.firstNameInput = []
    if (firstNameInput.value.trim().length === 0) {
      errorsBag.firstNameInput.push('Поле "имя" должно быть заполнено.')
    } else if (firstNameInput.value.length > 20) {
      errorsBag.firstNameInput.push('Поле "имя" не должно превышать более 20 символов.')
    }
    recalculateErrors()
    firstNameInput.style.outline = 'none'
  }
  firstNameInput.onblur = () => {
    if (errorsBag.firstNameInput.length > 0) {
      const existingErrorDiv = document.querySelector('.error-firstNameInput')
      if (existingErrorDiv) {
        existingErrorDiv.remove()
      }

      firstNameInput.style.outline = '1px solid red'
      const errorDiv = document.createElement('div')
      errorDiv.classList.add('error')
      errorDiv.classList.add('error-firstNameInput')
      errorDiv.innerText = errorsBag.firstNameInput[0]
      firstNameInput.after(errorDiv)
    } else {
      const errorDiv = document.querySelector('.error-firstNameInput')
      if (errorDiv) {
        errorDiv.remove()
      }
    }
  }

  const secondNameInput = document.querySelector('input[name=secondName]')
  secondNameInput.oninput = () => {
    errorsBag.secondNameInput = []
    if (secondNameInput.value.trim().length === 0) {
      errorsBag.secondNameInput.push('Поле "фамилия" должно быть заполнено.')
    } else if (secondNameInput.value.length > 20) {
      errorsBag.secondNameInput.push('Поле "фамилия" не должно превышать более 20 символов.')
    }
    recalculateErrors()
    secondNameInput.style.outline = 'none'
  }
  secondNameInput.onblur = () => {
    if (errorsBag.secondNameInput.length > 0) {
      const existingErrorDiv = document.querySelector('.error-secondNameInput')
      if (existingErrorDiv) {
        existingErrorDiv.remove()
      }

      secondNameInput.style.outline = '1px solid red'
      const errorDiv = document.createElement('div')
      errorDiv.classList.add('error')
      errorDiv.classList.add('error-secondNameInput')
      errorDiv.innerText = errorsBag.secondNameInput[0]
      secondNameInput.after(errorDiv)
    } else {
      const errorDiv = document.querySelector('.error-secondNameInput')
      if (errorDiv) {
        errorDiv.remove()
      }
    }
  }

  const patronymicInput = document.querySelector('input[name=patronymic]')
  patronymicInput.oninput = () => {
    errorsBag.patronymicInput = []
    if (patronymicInput.value.length > 20) {
      errorsBag.patronymicInput.push('Поле "отчество" должно быть не более 20 символов.')
    }
    recalculateErrors()
    patronymicInput.style.outline = 'none'
  }
  patronymicInput.onblur = () => {
    if (errorsBag.patronymicInput.length > 0) {
      const existingErrorDiv = document.querySelector('.error-patronymicInput')
      if (existingErrorDiv) {
        existingErrorDiv.remove()
      }

      patronymicInput.style.outline = '1px solid red'
      const errorDiv = document.createElement('div')
      errorDiv.classList.add('error')
      errorDiv.classList.add('error-patronymicInput')
      errorDiv.innerText = errorsBag.patronymicInput[0]
      patronymicInput.after(errorDiv)
    } else {
      const errorDiv = document.querySelector('.error-patronymicInput')
      if (errorDiv) {
        errorDiv.remove()
      }
    }
  }

  const dateOfBirthInput = document.querySelector('input[name=dateOfBirth]')
  dateOfBirthInput.onchange = () => {
    errorsBag.dateOfBirthInput = []
    if (dateOfBirthInput.value.length === 0) {
      errorsBag.dateOfBirthInput.push('Поле "дата рождения" должно быть заполнено.')
    }
    recalculateErrors()
    dateOfBirthInput.style.outline = 'none'
  }
  dateOfBirthInput.onblur = () => {
    if (errorsBag.dateOfBirthInput.length > 0) {
      const existingErrorDiv = document.querySelector('.error-dateOfBirthInput')
      if (existingErrorDiv) {
        existingErrorDiv.remove()
      }

      dateOfBirthInput.style.outline = '1px solid red'
      const errorDiv = document.createElement('div')
      errorDiv.classList.add('error')
      errorDiv.classList.add('error-dateOfBirthInput')
      errorDiv.innerText = errorsBag.dateOfBirthInput[0]
      dateOfBirthInput.after(errorDiv)
    } else {
      const errorDiv = document.querySelector('.error-dateOfBirthInput')
      if (errorDiv) {
        errorDiv.remove()
      }
    }
  }

  const emailInput = document.querySelector('input[name=email]')
  emailInput.oninput = () => {
    errorsBag.emailInput = []
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (emailInput.value.length !== 0 && !emailRegex.test(emailInput.value)) {
      errorsBag.emailInput.push('Поле "имейл" должно содержать валидный имейл.')
    }
    if (emailInput.value.trim().length > 0) {
      errorsBag.phoneInput.pop()
    }
    recalculateErrors()
    emailInput.style.outline = 'none'
    phoneInput.style.outline = 'none'
  }
  emailInput.onblur = () => {
    const existingErrorDivPhone = document.querySelector('.error-phoneInput')
    if (existingErrorDivPhone) {
      existingErrorDivPhone.remove()
    }

    if (errorsBag.emailInput.length > 0) {
      const existingErrorDiv = document.querySelector('.error-emailInput')
      if (existingErrorDiv) {
        existingErrorDiv.remove()
      }

      emailInput.style.outline = '1px solid red'
      const errorDiv = document.createElement('div')
      errorDiv.classList.add('error')
      errorDiv.classList.add('error-emailInput')
      errorDiv.innerText = errorsBag.emailInput[0]
      emailInput.after(errorDiv)
    } else {
      const errorDiv = document.querySelector('.error-emailInput')
      if (errorDiv) {
        errorDiv.remove()
      }
    }
  }

  const phoneInput = document.querySelector('input[name=phone]')
  phoneInput.oninput = () => {
    errorsBag.phoneInput = []
    if (emailInput.value.trim().length === 0 && phoneInput.value.trim().length === 0) {
      errorsBag.phoneInput.push('Поле "имейл" либо поле "телефон" должно быть заполнено.')
    }
    recalculateErrors()
    emailInput.style.outline = 'none'
    phoneInput.style.outline = 'none'
  }
  phoneInput.onblur = () => {
    if (errorsBag.phoneInput.length > 0) {
      const existingErrorDiv = document.querySelector('.error-phoneInput')
      if (existingErrorDiv) {
        existingErrorDiv.remove()
      }

      emailInput.style.outline = '1px solid red'
      phoneInput.style.outline = '1px solid red'
      const errorDiv = document.createElement('div')
      errorDiv.classList.add('error')
      errorDiv.classList.add('error-phoneInput')
      errorDiv.innerText = errorsBag.phoneInput[0]
      const phoneInputParentDiv = document.querySelector('.phone-container')
      phoneInputParentDiv.after(errorDiv)
    } else {
      const errorDiv = document.querySelector('.error-phoneInput')
      if (errorDiv) {
        errorDiv.remove()
      }
    }
  }

  const agreedInput = document.querySelector('input[name=agreed]')
  agreedInput.onchange = () => {
    errorsBag.agreedInput = []
    if (!agreedInput.checked) {
      errorsBag.agreedInput.push('agreedInput error must be checked')
    }
    recalculateErrors()

    if (errorsBag.agreedInput.length > 0) {
      const doesErrorDivAlreadyExist = document.querySelector('.error-agreedInput') !== null
      if (doesErrorDivAlreadyExist) return

      const errorDiv = document.createElement('div')
      errorDiv.classList.add('error')
      errorDiv.classList.add('error-agreedInput')
      errorDiv.innerText = errorsBag.agreedInput[0]
      agreedInput.after(errorDiv)
    } else {
      const errorDiv = document.querySelector('.error-agreedInput')
      if (errorDiv) {
        errorDiv.remove()
      }
    }
  }

  const submitButton = document.querySelector('button[type=submit]')
  function recalculateErrors() {
    let inputErrorsCount = 0
    for (const inputError in errorsBag) {
      inputErrorsCount += errorsBag[inputError].length
    }

    if (inputErrorsCount === 0) {
      submitButton.disabled = false
    } else {
      submitButton.disabled = true
    }
  }
}

// Пункт 5 - "Возле поля "Телефон" должна находиться кнопка + ..."
let phonesCount = 1
const addPhoneButton = document.getElementById('addPhoneButton')
addPhoneButton.onclick = () => {
  // TODO: )wire?
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
