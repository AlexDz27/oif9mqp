<?php

namespace App\Services\FormValidator\Rules;

use App\Services\FormValidator\Rules\Rule;

class RuleFiles extends Rule {
  public static function validate($files, $maxFiles = 5, $maxSizePerFile = 5e+6,
   $allowedFormats = ['image/jpeg', 'image/png', 'application/pdf']) {
    if (count($files) === 0) return null;

    $oneOfFilesExceedsMaxSize = array_filter($files['size'], function ($size) use ($maxSizePerFile) {
      if ($size > $maxSizePerFile) return true;
      return false;
    }) === [] ? false : true;
    $oneOfFilesIsNotAllowedFormat = array_filter($files['type'], function ($type) use ($allowedFormats) {
      if (!in_array($type, $allowedFormats)) return true;
      return false;
    }) === [] ? false : true;

    if (count($files['name']) > $maxFiles || $oneOfFilesExceedsMaxSize || $oneOfFilesIsNotAllowedFormat) {
      return false;
    }

    return true;
  }
}