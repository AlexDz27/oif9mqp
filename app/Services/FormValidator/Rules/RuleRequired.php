<?php

namespace App\Services\FormValidator\Rules;

use App\Services\FormValidator\Rules\RuleInterface;

class RuleRequired implements RuleInterface {
  public static function validate($value) {
    if ($value === null || ($value !== null && trim($value) === '')) {
      return false;
    }

    return true;
  }

  public static function getName() {
    return (new \ReflectionClass(self::class))->getShortName();
  }
}