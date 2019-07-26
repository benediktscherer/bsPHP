<?php
require __DIR__ . '/vendor/autoload.php';
$dotenv = Dotenv\Dotenv::create(__DIR__ . '/');
$dotenv->overload();
?>
<!DOCTYPE>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <?php include "src/partials/general/head.php"; ?>
</head>
<body class="">

<h1>Hello World</h1>

<?php include "src/partials/general/foot.php"; ?>
</body>
</html>