<?php

namespace App\Services\FormValidator\Rules;

use App\Services\FormValidator\Rules\RuleInterface;

class RuleRequired extends Rule {
  public function validate($value) {
    if ($value === null || ($value !== null && trim($value) === '')) {
      return false;
    }

    return true;
  }
}