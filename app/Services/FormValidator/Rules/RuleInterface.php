<?php

namespace App\Services\FormValidator\Rules;

interface RuleInterface {
  // TODO: а разве по-хорошему интерфейс может иметь статик методы? 🤔
  public static function validate($value);
}