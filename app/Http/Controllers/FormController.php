<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\FormValidator;

class FormController extends Controller {
  public function submit(Request $request) {
    // var_dump($request);
    // var_dump($request->input('firstName'));
    // var_dump($request->input('phoneCode'));
    // var_dump($request->parameters);
    // var_dump($request->all());

    // extract($request->all());

    if (!FormValidator::validate($request->all())) {
      return 'error response';
    }

    return 'success response';
  }
}
