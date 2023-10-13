<?php

namespace App\Services\FormValidator\Rules;

use App\Services\FormValidator\Rules\Rule;

class RuleMaxLength extends Rule {
  public function __construct($maxLength = 20) {
    $this->maxLength = $maxLength;
  }

  public function validate($value) {
    if ($value === null) return null;

    if (mb_strlen($value, 'UTF-8') > $this->maxLength) {
      return false;
    }

    return true;
  }
}