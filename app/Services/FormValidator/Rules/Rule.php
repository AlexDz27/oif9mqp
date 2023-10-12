<?php

namespace App\Services\FormValidator\Rules;

abstract class Rule {
  public static function getName() {
    return (new \ReflectionClass(static::class))->getShortName();
  }
}