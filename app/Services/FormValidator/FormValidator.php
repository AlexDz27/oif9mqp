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
    $this->checks['firstName'] = [
      'value' => $firstName,
      'hasPassedTheChecks' => [
        RuleRequired::getName() => RuleRequired::validate($firstName),
        RuleMaxLength::getName() => RuleMaxLength::validate($firstName),
      ]
    ];
    $this->checks['secondName'] = [
      'value' => $secondName,
      'hasPassedTheChecks' => [
        RuleRequired::getName() => RuleRequired::validate($secondName),
        RuleMaxLength::getName() => RuleMaxLength::validate($secondName),
      ]
    ];
    $this->checks['patronymic'] = [
      'value' => $patronymic,
      'hasPassedTheChecks' => [
        RuleMaxLength::getName() => RuleMaxLength::validate($patronymic),
      ]
    ];
    $this->checks['dateOfBirth'] = [
      'value' => $dateOfBirth,
      'hasPassedTheChecks' => [
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
    // TODO: также нужно проверять, что на бэкэнд пришло не более 5 номеров
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
        RuleMaxLength::getName() => RuleMaxLength::validate($about, 30),
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
          $errResponse['errors'][$input][$checkRule] = $validationResult;
        }
      }
    }

    return json_encode($errResponse);
  }
}