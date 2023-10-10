<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="css/bootstrap.min.css">
  <link rel="stylesheet" href="css/style.css">
  <script src="js/rules.js" defer></script>
  <script src="js/form.js" defer></script>

  <title>Form</title>
</head>
<body class="container pt-4">
<h2 class="mb-3">Заполните, пожалуйста, форму:</h2>

<form method="POST" enctype="multipart/form-data">
  <div class="mb-3">
    <label class="form-label" for="firstName">Имя <span style="color: red;">*</span></label>
    <input class="form-control" name="firstName" id="firstName">
  </div>

  <div class="mb-3">
    <label class="form-label" for="secondName">Фамилия <span style="color: red;">*</span></label>
    <input class="form-control" name="secondName" id="secondName">
  </div>

  <div class="mb-3">
    <label class="form-label" for="patronymic">Отчество</label>
    <input class="form-control" name="patronymic" id="patronymic">
  </div>

  <div class="mb-3">
    <label class="form-label" for="dateOfBirth">Дата рождения <span style="color: red;">*</span></label>
    <input type="date" class="form-control" name="dateOfBirth" id="dateOfBirth">
    <script>
      const dateOfBirthInput = document.querySelector('input[type=date]')
      dateOfBirthInput.max = new Date().toISOString().split("T")[0]
    </script>
  </div>

  <div class="mb-3">
    <label class="form-label" for="email">Имейл <span style="color: red;">* <sup>или телефон</sup></span></label>
    <input class="form-control" name="email" id="email">
  </div>

  <div class="mb-3">
    <label class="form-label" for="phoneCode">Код страны</label>
    <select class="form-select" name="phoneCode">
      <option value="+375">+375</option>
      <option value="+7">+7</option>
    </select>
  </div>

  <div class="mb-3">
    <label class="form-label" for="phone">Телефон <span style="color: red;">* <sup>или имейл</sup></span></label>
    <div class="phone-container">
      <input class="form-control" name="phone" type="tel" id="phone">
      <button class="btn btn-primary" id="addPhoneButton" type="button">+</button>
    </div>
  </div>

  <div class="mb-3">
    <label class="form-label" for="familyStatus">Семейное положение</label>
    <select class="form-select" name="familyStatus" id="familyStatus">
      <option value="single">Холост/не замужем</option>
      <option value="married">Женат/замужем</option>
      <option value="divorced">В разводе</option>
      <option value="widowed">Вдовец/вдова</option>
    </select>
  </div>

  <div class="mb-3">
    <label class="form-label" for="about">О себе</label>
    <textarea class="form-control" name="about" id="about"></textarea>
  </div>

  <div class="mb-3">
    <label class="form-label" for="files">Файлы</label>
    <input name="files" type="file" class="form-control" id="files" multiple>
  </div>

  <div class="mb-3">
    <label class="form-check-label" for="agreed">Я ознакомился c правилами</label>
    <input name="agreed" type="checkbox" class="form-check-input" id="agreed">
  </div>

  <div class="d-grid">
    <button type="submit" class="btn btn-primary" >Отправить</button>
  </div>
</form>
</body>
</html>
