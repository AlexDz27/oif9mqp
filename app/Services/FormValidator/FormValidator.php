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
    $generateValidations = function($rules, $inputValue) {
      return array_merge(...array_map(function($rule) use ($inputValue) {
        // $rule->value = $inputValue;
        return [$rule::getName() => $rule->validate($inputValue)];
      }, $rules));
    };
    // TODO: // -> 'validations'
    $this->checks['firstName'] = [
      'value' => $firstName,
      'hasPassedTheChecks' => $generateValidations([new RuleRequired(), new RuleMaxLength()], $firstName)
    ];
    $this->checks['secondName'] = [
      'value' => $secondName,
      'hasPassedTheChecks' => $generateValidations([new RuleRequired(), new RuleMaxLength()], $secondName)
    ];
    $this->checks['patronymic'] = [
      'value' => $patronymic,
      'hasPassedTheChecks' => $generateValidations([new RuleMaxLength()], $patronymic)
    ];
    // TODO: также здесь нужно проверять, что дата не превышает значение 'сегодня'
    $this->checks['dateOfBirth'] = [
      'value' => $dateOfBirth,
      'hasPassedTheChecks' => $generateValidations([new RuleRequired()], $dateOfBirth)
    ];
    $this->checks['email'] = [
      'value' => $email,
      'hasPassedTheChecks' => $generateValidations([new RuleEmail()], $email)
    ];
    $this->checks['phoneCode'] = [
      'value' => $phoneCode,
      'hasPassedTheChecks' => $generateValidations([new RuleIn(['+375', '+7'])], $phoneCode)
    ];
    // TODO: ещё нужно проверять, что на бэкэнд пришло не более 5 номеров
    // и их так же нужно проверять на RuleNumber
    $this->checks['phone'] = [
      'value' => $phone,
      'hasPassedTheChecks' => $generateValidations([new RuleNumber(), new RuleEmailOrPhone($email, $phone)], $phone)
    ];
    var_dump($this->checks);
    die();
    $this->checks['familyStatus'] = [
      'value' => $familyStatus,
      'hasPassedTheChecks' => [
        RuleIn::getName() => RuleIn::validate($familyStatus, ['single', 'married', 'divorced', 'widowed']),
      ]
    ];
    $this->checks['about'] = [
      'value' => $about,
      'hasPassedTheChecks' => [
        RuleMaxLength::getName() => RuleMaxLength::validate($about, 1000),
      ]
    ];
    $this->checks['files'] = [
      'value' => $files,
      'hasPassedTheChecks' => [
        RuleFiles::getName() => RuleFiles::validate($files),
      ]
    ];

    foreach ($this->checks as $check) {
      foreach (array_values($check['hasPassedTheChecks']) as $validationResult) {
        if ($validationResult === false) return false;
      }
    }

    return true;
  }

  public function getErrorResponse() {
    $errResponse = ['status' => 'error', 'errors' => []];
    foreach ($this->checks as $input => $check) {
      foreach ($check['hasPassedTheChecks'] as $checkRule => $validationResult) {
        if ($validationResult === false) {
          $errResponse['errors'][$input][$checkRule] = [
            'result' => $validationResult,
            'message' => $checkRule
          ];
        }
      }
    }

    var_dump($errResponse);
    die();

    return json_encode($errResponse);
  }
}