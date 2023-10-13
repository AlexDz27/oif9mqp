<?php

namespace App\Services\FormValidator\Rules;

use App\Services\FormValidator\Rules\Rule;

class RuleEmailOrPhone extends Rule {
  public function __construct($email, $phone) {
    $this->email = $email;
    $this->phone = $phone;
  }

  public function validate() {
    if ($this->email === null && $this->phone === null) return false;
    if (trim($this->email) === '' && trim($this->phone) === '') return false;

    return true;
  }
}