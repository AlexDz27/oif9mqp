<?php

namespace App\Services\FormValidator\Rules;

use App\Services\FormValidator\Rules\Rule;

class RuleMaxLength extends Rule {
  public static function validate($value, $maxLength = 20) {
    if ($value === null) return null;

    if (mb_strlen($value, 'UTF-8') > $maxLength) {
      return false;
    }

    return true;
  }
}