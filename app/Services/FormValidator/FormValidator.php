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
    // $generateValidations = function($rules, $inputValue, $inputName, $inputNameRus) {
    //   return array_map(function($rule) {
    //     return ['result' => $rule::validate($inputValue), 'message' => $rule::generateMessage($inputName, $inputNameRus)];
    //   }, $rules);
    // };
    $generateValidations = function($rules, $inputValue) {
      return array_merge(...array_map(function($rule) use ($inputValue) {
        return [$rule::getName() => $rule::validate($inputValue)];
      }, $rules));
    };
    // TODO: // -> 'validations'
    $this->checks['firstName'] = [
      'value' => $firstName,
      'hasPassedTheChecks' => $generateValidations([RuleRequired::class, RuleMaxLength::class], $firstName)
    ];
    // возможность: 'vals' => [RR, RML]; 'vals' foreach () {...}
    $this->checks['secondName'] = [
      'value' => $secondName,
      'hasPassedTheChecks' => [
        RuleRequired::getName() => RuleRequired::validate($secondName),
        RuleMaxLength::getName() => RuleMaxLength::validate($secondName),
      ]
    ];
    var_dump($this->checks);
    die();
    $this->checks['patronymic'] = [
      'value' => $patronymic,
      'hasPassedTheChecks' => [
        RuleMaxLength::getName() => RuleMaxLength::validate($patronymic),
      ]
    ];
    // TODO: также здесь нужно проверять, что дата не превышает значение 'сегодня'
    // TODO: 🎯🎯🎯
    $this->checks['dateOfBirth'] = [
      'value' => $dateOfBirth,
      'hasPassedTheChecks' => [  // 'rulesChecks' => [RR:GN => ['result' => val]]
        // OR RR::val()->genMessage() -> ..?????
        RuleRequired::getName() => RuleRequired::validate($dateOfBirth),
      ]
    ];
    $this->checks['email'] = [
      'value' => $email,
      'hasPassedTheChecks' => [
        RuleEmail::getName() => RuleEmail::validate($email),
      ]
    ];
    $this->checks['phoneCode'] = [
      'value' => $phoneCode,
      'hasPassedTheChecks' => [
        RuleIn::getName() => RuleIn::validate($phoneCode, ['+375', '+7']),
      ]
    ];
    // TODO: ещё нужно проверять, что на бэкэнд пришло не более 5 номеров
    // и их так же нужно проверять на RuleNumber
    $this->checks['phone'] = [
      'value' => $phone,
      'hasPassedTheChecks' => [
        RuleNumber::getName() => RuleNumber::validate($phone),
        RuleEmailOrPhone::getName() => RuleEmailOrPhone::validate($email, $phone),
      ]
    ];
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