<?php
require_once 'pdo.php';
date_default_timezone_set('America/Mexico_City');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $voltaje = $_POST['voltaje'] ?? '0';
    $corriente = $_POST['corriente'] ?? '0';
    $potencia = $_POST['potencia'] ?? '0';
    $energia = $_POST['energia'] ?? '0';
    // Set time and date in this format 2024-04-19 12:17:07
    $fecha = date('Y-m-d H:i:s');


    $sql = "INSERT INTO mediciones_pto1 (voltajeRMS, corrienteRMS, potenciaRMS, consumoEnergetico, fecha) VALUES (:voltaje, :corriente, :potencia, :energia, :fecha)";

    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':voltaje' => $voltaje,
            ':corriente' => $corriente,
            ':potencia' => $potencia,
            ':energia' => $energia,
            ':fecha' => $fecha
        ]);
        echo "Datos almacenados correctamente";
        echo "Voltaje: $voltaje, Corriente: $corriente, Potencia: $potencia, Energía: $energia, Fecha: $fecha";
    } catch (PDOException $e) {
        die("Error al insertar los datos: " . $e->getMessage());
    }
}
else if($_SERVER["REQUEST_METHOD"] == "GET") {
    $sql = "SELECT 
    DAYNAME(fecha) as dia,
    AVG(consumoEnergetico) as promedioEnergia,
    AVG(corrienteRMS) as promedioCorriente,
    AVG(potenciaRMS) as promedioPotencia,
    AVG(voltajeRMS) as promedioVoltaje
FROM mediciones_pto1
GROUP BY DAYOFWEEK(fecha)
ORDER BY DAYOFWEEK(fecha);";
}
else {
    echo "Método de solicitud no permitido";
}
?>
