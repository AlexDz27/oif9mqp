# Запуск

Разработка проводилась на следующем энвайронменте:
 - Windows 10
 - PHP 8.2.8
 - MySQL 8
 - php.ini: `upload_max_filesize = 8M`, `post_max_size = 8M`

 Заметка про Xdebug:
 у меня не запускался вообще Ларавел в некоторых случаях, когда 
 у меня были такие настройки Xdebug в моем php.ini:
 ```
 zend_extension = xdebug
 xdebug.var_display_max_data = -1
 xdebug.var_display_max_depth = 500
 xdebug.var_display_max_children = 256
 ```

 Чтобы исправить это, я комментировал последние две строчки.

 ## Команды для запуска
 1. Создать пустую папку
 2. Склонировать репозиторий в эту папку
 3. Внутри папки, `composer install`
 4. Создать базу данных с именем 'tdkomplekt' и таблицу, взяв скрипт из пунка 'DDL для таблицы'. Переменные окружения для БД можно поменять в файле `config/app.php`
 5. `php artisan serve`
 6. Открыть localhost:8000 в браузере
 7. Готово!

 ## DDL для таблицы
 ```
 CREATE TABLE `results` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(20) NOT NULL,
  `secondName` varchar(20) NOT NULL,
  `patronymic` varchar(20) DEFAULT NULL,
  `dateOfBirth` date NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phoneCode` varchar(45) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `familyStatus` varchar(45) DEFAULT NULL,
  `about` varchar(1000) DEFAULT NULL,
  `filesDirPath` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
 ```