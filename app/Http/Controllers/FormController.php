<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\FormValidator\FormValidator;

class FormController extends Controller {
  public function submit(Request $request) {
    $files = $request->files->all()['files'] ?? [];
    $formData = [...$request->request->all(), 'files' => $files];

    if (!FormValidator::validate($formData)) {
      return 'error response';
    }

    return 'success response';
  }
}
