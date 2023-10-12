<?php

namespace App\Services\FormValidator\Rules;

use App\Services\FormValidator\Rules\Rule;

class RuleEmailOrPhone extends Rule {
  public static function validate($emailValue, $phoneValue) {
    if ($emailValue === null && $phoneValue === null) return false;
    if (trim($emailValue) === '' && trim($phoneValue) === '') return false;

    return true;
  }
}