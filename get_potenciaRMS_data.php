<?php
require_once 'pdo.php';
header('Content-Type: application/json');

$punto = $_GET['punto'] ?? 'pto1';
$fecha = $_GET['fecha'] ?? date('Y-m-d');

$sql = "SELECT TIME(fecha) AS hora, potenciaRMS AS potencia FROM lecturas_{$punto}
        WHERE DATE(fecha) = '{$fecha}' ORDER BY hora ASC";

try {
    $stmt = $pdo->query($sql);
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $response = array(
        "labels" => array_map(function($row) { return $row['hora']; }, $data),
        "values" => array_map(function($row) { return floatval($row['potencia']); }, $data)
    );

    echo json_encode($response);
} catch (PDOException $e) {
    die("Error al obtener los datos: " . $e->getMessage());
}


