<?php

namespace App\Services\FormValidator\Rules;

use App\Services\FormValidator\Rules\Rule;

class RuleNumber extends Rule {
  public static function validate($value) {
    if ($value === null) return null;

    if (!is_int($value)) {
      return false;
    }

    return true;
  }
}