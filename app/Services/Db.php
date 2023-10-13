<?php

namespace App\Services;

use \PDO;

class Db {
  public $pdo;

  public function __construct($host, $db, $user, $pwd, $charset = 'utf8mb4') {
    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $opt = [
      PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
      PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    try {
      $this->pdo = new PDO($dsn, $user, $pwd, $opt);
    } catch (\PDOException $e) {
      throw new \PDOException($e->getMessage(), (int)$e->getCode());
    }
  }

  public function storeResult($formData) {
    $sql = "INSERT INTO results
     (firstName, secondName, patronymic, dateOfBirth, email, phoneCode, phone, familyStatus, about, filesDirPath)
     VALUES (:firstName, :secondName, :patronymic, :dateOfBirth, :email, :phoneCode, :phone, :familyStatus, :about, :filesDirPath)
    ";
    $this->pdo->prepare($sql)->execute($formData);
  }
}