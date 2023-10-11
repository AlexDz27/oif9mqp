<?php

namespace App\Services\FormValidator\Rules;

use App\Services\FormValidator\Rules\RuleInterface;

class RuleRequired implements RuleInterface {
  public function test($value) {
    if ($value === null || trim($value) === '') {
      return false;
    }

    return true;
  }
}