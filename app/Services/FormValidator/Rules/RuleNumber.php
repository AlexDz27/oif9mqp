<?php

namespace App\Services\FormValidator\Rules;

use App\Services\FormValidator\Rules\Rule;

class RuleNumber extends Rule {
  public function validate($value) {
    if ($value === null) return null;

    $numberValue = (int) $value;
    if (!is_int($numberValue)) {
      return false;
    }

    return true;
  }
}