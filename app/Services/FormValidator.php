<?php

namespace App\Services;

class FormValidator {
  public static function validate($formData) {
    if ($formData['firstName'] === null) {
      return false;
    }

    return true;
  }
}