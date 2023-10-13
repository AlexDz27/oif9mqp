<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\FormValidator\FormValidator;
use App\Services\Db;

class FormController extends Controller {
  const NO_FILE_UPLOADED = 4;

  public function submit(Request $request) {
    $files = $_FILES['files'];
    // TODO: также для файлов нужно обработать ситуацию, если что-то пошло не так с загрузкой файлов,
    // то есть надо будет смотреть в $_FILES['files]['error']
    $formData = [...$request->request->all(), 'files' => $files];

    $formValidator = new FormValidator();
    if (!$formValidator->validate($formData)) {
      return $formValidator->getErrorResponse();
    }

    unset($formData['agreed']);
    $files = $formData['files'];
    unset($formData['files']);
    $formData['filesDirPath'] = 'uploads/' . time();
    if ($files['error'][0] !== self::NO_FILE_UPLOADED) {
      mkdir($formData['filesDirPath']);
      foreach ($files['name'] as $idx => $file) {
        move_uploaded_file($files['tmp_name'][$idx], $formData['filesDirPath'] . "/$file");
      }
    }
    try {
      // TODO: нужно спрятать конфиг-переменные, чтобы их не было видно в гите.
      // Для этого можно использовать файл .env
      $db = new Db(config('app.host'), config('app.db'), config('app.user'), config('app.pwd'));
      $db->storeResult($formData);
    } catch (\Exception $e) {
      $errorDbResponse = ['status' => 'error', 'errors' => $e];
      return json_encode($errorDbResponse);
    }

    $successResponse = ['status' => 'success', 'result' => $formData];
    return json_encode($successResponse);
  }
}
