<?php

namespace App\Services\FormValidator\Rules;

use App\Services\FormValidator\Rules\Rule;

class RuleIn extends Rule {
  public static function validate($value, $allowedValues) {
    if (!in_array($value, $allowedValues)) {
      return false;
    }

    return true;
  }

  // public static function getErrorMessage()
}