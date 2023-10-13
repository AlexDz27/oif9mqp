<?php

namespace App\Services\FormValidator;

use App\Services\FormValidator\Rules\RuleRequired;
use App\Services\FormValidator\Rules\RuleMaxLength;
use App\Services\FormValidator\Rules\RuleEmail;
use App\Services\FormValidator\Rules\RuleIn;
use App\Services\FormValidator\Rules\RuleNumber;
use App\Services\FormValidator\Rules\RuleEmailOrPhone;
use App\Services\FormValidator\Rules\RuleFiles;

class FormValidator {
  public $checks = [];

  public function validate($formData) {
    extract($formData);
    $generateValidations = function($rules, $inputValue, $inputName = null) {
      return array_merge(...array_map(function($rule) use ($inputValue, $inputName) {
        return [$rule::getName() => [
          'result' => $rule->validate($inputValue),
          'errorMessage' => $rule->generateErrorMessage($inputName)
        ]];
      }, $rules));
    };
    $this->checks['firstName'] = [
      'value' => $firstName,
      'validations' => $generateValidations([new RuleRequired(), new RuleMaxLength()], $firstName, 'имя')
    ];
    $this->checks['secondName'] = [
      'value' => $secondName,
      'validations' => $generateValidations([new RuleRequired(), new RuleMaxLength()], $secondName, 'фамилия')
    ];
    $this->checks['patronymic'] = [
      'value' => $patronymic,
      'validations' => $generateValidations([new RuleMaxLength()], $patronymic, 'отчество')
    ];
    // TODO: также здесь нужно проверять, что дата не превышает значение 'сегодня'
    $this->checks['dateOfBirth'] = [
      'value' => $dateOfBirth,
      'validations' => $generateValidations([new RuleRequired()], $dateOfBirth, 'дата рождения')
    ];
    $this->checks['email'] = [
      'value' => $email,
      'validations' => $generateValidations([new RuleEmail()], $email, 'имейл')
    ];
    $this->checks['phoneCode'] = [
      'value' => $phoneCode,
      'validations' => $generateValidations([new RuleIn(['+375', '+7'])], $phoneCode, 'код страны')
    ];
    // TODO: ещё нужно проверять, что на бэкэнд пришло не более 5 номеров
    // и их так же нужно проверять на RuleNumber
    $this->checks['phone'] = [
      'value' => $phone,
      'validations' => $generateValidations([new RuleNumber(), new RuleEmailOrPhone($email, 'имейл', $phone, 'телефон')], $phone, 'телефон')
    ];
    $this->checks['familyStatus'] = [
      'value' => $familyStatus,
      'validations' => $generateValidations([new RuleIn(['single', 'married', 'divorced', 'widowed'])], $familyStatus, 'семейное положение')
    ];
    $this->checks['about'] = [
      'value' => $about,
      'validations' => $generateValidations([new RuleMaxLength(1000)], $about, 'о себе')
    ];
    $this->checks['files'] = [
      'value' => $files,
      'validations' => $generateValidations([new RuleFiles()], $files)
    ];

    foreach ($this->checks as $check) {
      foreach (array_values($check['validations']) as $validation) {
        if ($validation['result'] === false) return false;
      }
    }

    return true;
  }

  public function getErrorResponse() {
    $errResponse = ['status' => 'error', 'errors' => []];
    foreach ($this->checks as $input => $check) {
      foreach ($check['validations'] as $rule => $validation) {
        if ($validation['result'] === false) {
          $errResponse['errors'][$input] = $validation;
        }
      }
    }

    return json_encode($errResponse);
  }
}