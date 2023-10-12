<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\FormValidator\FormValidator;

class FormController extends Controller {
  public function submit(Request $request) {
    $files = $_FILES['files'];
    // TODO: также для файлов нужно обработать ситуацию, если что-то пошло не так с загрузкой файлов,
    // то есть надо будет смотреть в $_FILES['files]['error']
    $formData = [...$request->request->all(), 'files' => $files];

    $formValidator = new FormValidator();
    if (!$formValidator->validate($formData)) {
      return $formValidator->getErrorResponse();
    }

    $successResponse = ['status' => 'success'];

    return json_encode($successResponse);
  }
}
