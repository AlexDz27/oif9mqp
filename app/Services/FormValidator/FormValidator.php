<?php

namespace App\Services\FormValidator;

use App\Services\FormValidator\Rules\RuleRequired;

class FormValidator {
  public $errorsBag = [];

  public function validate($formData) {
    // TODO: короче тут надо по-умному сделать: => null | true
    $checks = $formData;
    extract($formData);
    $checks['firstName'] = [
      'value' => $firstName,
      'hasPassedTheChecks' => [
        RuleRequired::getName() => RuleRequired::validate($firstName),
      ]
    ];
    $checks['secondName'] = [
      'value' => $secondName,
      'hasPassedTheChecks' => [
        RuleRequired::getName() => RuleRequired::validate($secondName),
      ]
    ];

    var_dump($checks);

    return true;
  }

  public function getErrorResponse() {
    return 'some err response';
  }
}