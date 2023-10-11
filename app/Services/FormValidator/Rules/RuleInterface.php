<?php

namespace App\Services\FormValidator\Rules;

interface RuleInterface {
  public function test($value);
}