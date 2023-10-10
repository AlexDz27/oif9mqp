<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\FormValidator;

class FormController extends Controller {
  public function submit(Request $request) {
    var_dump($request);
    var_dump('---------------------------------');
    var_dump($request->getContent());
    var_dump($request->files);

    // TODO: мб попробовать опять с помощь FormRequest че-то проверить, работает ли 😂

    // if (!FormValidator::validate($request->all())) {
    //   return 'error response';
    // }

    // return 'success response';
  }
}
