<?php

namespace App\Services\FormValidator\Rules;

use App\Services\FormValidator\Rules\Rule;

class RuleEmail extends Rule {
  public function validate($value) {
    if ($value === null) return null;

    $emailRegex = '/^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/';

    if (!preg_match($emailRegex, $value)) {
      return false;
    }

    return true;
  }
}