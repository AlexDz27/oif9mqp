const inputsAndValidationRules = [
  {
    name: 'firstName',
    nameRussian: 'имя',
    rules: [
      {
        type: 'required',
        errorMessage() {
          return `Поле "${this.nameRussian}" должно быть заполнено`
        },
        enforce() {
          // TODO: probably pull out errMess and enforce into a func or t
          const input = document.getElementById(this.name)
          input.onblur = () => {
            if (input.value.trim().length === 0) {
              console.log(this.errorMessage())
            }
          }
        }
      },
      {
        type: 'max',
        maxLength: 20,
        errorMessage(length) {
          return `Поле "${this.nameRussian}" не должно превышать ${length} символов`
        }
      },
    ]
  },
]
inputsAndValidationRules.forEach((inpAndRules) => {
  inpAndRules.rules.forEach(rule => {
    rule.errorMessage = rule.errorMessage.bind(inpAndRules, rule.maxLength)
    rule.enforce = rule.enforce.bind(inpAndRules)
  })
})

console.log(inputsAndValidationRules[0].rules[0].errorMessage())
console.log(inputsAndValidationRules[0].rules[1].errorMessage())
