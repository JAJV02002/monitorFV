<?php
require_once 'pdo.php';
date_default_timezone_set('America/Mexico_City');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $voltaje = $_POST['voltaje'] ?? '0';
    $corriente = $_POST['corriente'] ?? '0';
    $potencia = $_POST['potencia'] ?? '0';
    $energia = $_POST['energia'] ?? '0';

    $sql = "INSERT INTO mediciones_pto1 (voltajeRMS, corrienteRMS, potenciaRMS, consumoEnergetico, fecha) VALUES (:voltaje, :corriente, :potencia, :energia, NOW())";

    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':voltaje' => $voltaje,
            ':corriente' => $corriente,
            ':potencia' => $potencia,
            ':energia' => $energia
        ]);
        echo "Datos almacenados correctamente";
    } catch (PDOException $e) {
        die("Error al insertar los datos: " . $e->getMessage());
    }
} else {
    echo "Método de solicitud no permitido";
}
?>
