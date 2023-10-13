<?php

namespace App\Services\FormValidator\Rules;

use App\Services\FormValidator\Rules\Rule;

class RuleFiles extends Rule {
  const NO_FILE_UPLOADED = 4;

  public function __construct($maxFiles = 5, $maxSizePerFile = 5e+6,
  $allowedFormats = ['image/jpeg', 'image/png', 'application/pdf']) {
    $this->maxFiles = $maxFiles;
    $this->maxSizePerFile = $maxSizePerFile;
    $this->allowedFormats = $allowedFormats;
  }

  public function validate($files) {
    if ($files['error'][0] === self::NO_FILE_UPLOADED) return null;

    $oneOfFilesExceedsMaxSize = array_filter($files['size'], function ($size) {
      if ($size > $this->maxSizePerFile) return true;
      return false;
    }) === [] ? false : true;
    $oneOfFilesIsNotAllowedFormat = array_filter($files['type'], function ($type) {
      if (!in_array($type, $this->allowedFormats)) return true;
      return false;
    }) === [] ? false : true;

    if (count($files['name']) > $maxFiles || $oneOfFilesExceedsMaxSize || $oneOfFilesIsNotAllowedFormat) {
      return false;
    }

    return true;
  }

  public function generateErrorMessage() {
    return "Правила для файлов: максимум файлов: 5; максимальный размер одного файла: 5мб; разрешенные форматы: jpg, png, pdf";
  }
}