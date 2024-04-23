<?php
$dsn = 'mysql:host=193.203.166.183;dbname=u367136364_lecturas';
$username = 'u367136364_lecturas';
$password = 'eSolar2024!';
date_default_timezone_set('America/Mexico_City');

try {
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

echo date('Y-m-d H:i:s') . " - Connected successfully\n";

?>
