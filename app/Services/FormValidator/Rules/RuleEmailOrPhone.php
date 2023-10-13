<?php

namespace App\Services\FormValidator\Rules;

use App\Services\FormValidator\Rules\Rule;

class RuleEmailOrPhone extends Rule {
  public function __construct($email, $emailInputName, $phone, $phoneInputName) {
    $this->email = $email;
    $this->emailInputName = $emailInputName;
    $this->phone = $phone;
    $this->phoneInputName = $phoneInputName;
  }

  public function validate() {
    if ($this->email === null && $this->phone === null) return false;
    if (trim($this->email) === '' && trim($this->phone) === '') return false;

    return true;
  }

  public function generateErrorMessage() {
    return "Поле '{$this->emailInputName}' либо поле '{$this->phoneInputName}' должно быть заполнено";
  }
}