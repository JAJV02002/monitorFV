<?php
$dsn = 'mysql:host=193.203.166.183;dbname=u367136364_lecturas';
$username = 'u367136364_lecturas';
$password = 'eSolar2024!';

try {
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>
