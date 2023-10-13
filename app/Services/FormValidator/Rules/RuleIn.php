<?php

namespace App\Services\FormValidator\Rules;

use App\Services\FormValidator\Rules\Rule;

class RuleIn extends Rule {
  public function __construct($allowedValues) {
    $this->allowedValues = $allowedValues;
  }

  public function validate($value) {
    if (!in_array($value, $this->allowedValues)) {
      return false;
    }

    return true;
  }

  // public static function getErrorMessage()
}