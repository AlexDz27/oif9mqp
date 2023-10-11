<?php

namespace App\Services\FormValidator;

class FormValidator {
  public static function validate($formData) {
    // TODO: короче тут надо по-умному сделать
    // что-то типа ['firstName' => null, 'secondName' => 'error-RuleEmailOrPhone-phone', ...] -- но это не точно..
    if ($formData['firstName'] === null) {
      return false;
    }

    return true;
  }
}