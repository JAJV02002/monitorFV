<?php

require_once 'pdo.php';
date_default_timezone_set('America/Mexico_City');

$punto = $_GET['punto'];
$start_date = $_GET['startDate'];
$end_date = $_GET['endDate'];

$tabla = '';

if ($punto == 1) {
    $sql = "SELECT 
    fecha,
    DAY(fecha) as numeroDiaCalendario,
    DAYNAME(fecha) as dia,
    AVG(consumoEnergetico) as promedioEnergia,
    AVG(corrienteRMS) as promedioCorriente,
    AVG(potenciaRMS) as promedioPotencia,
    AVG(voltajeRMS) as promedioVoltaje
FROM lecturas_pto1
WHERE fecha BETWEEN '$start_date' AND '$end_date'
GROUP BY DAY(fecha)
ORDER BY DAY(fecha);";
} 
elseif ($punto == 2) {
    $sql = "SELECT 
    fecha,
    DAY(fecha) as numeroDiaCalendario,
    DAYNAME(fecha) as dia,
    AVG(consumoEnergetico) as promedioEnergia,
    AVG(corrienteRMS) as promedioCorriente,
    AVG(potenciaRMS) as promedioPotencia,
    AVG(voltajeRMS) as promedioVoltaje
FROM lecturas_pto2
WHERE fecha BETWEEN '$start_date' AND '$end_date'
GROUP BY DAY(fecha)
ORDER BY DAY(fecha);";
} 
elseif ($punto == 3) {
    $sql = "SELECT 
    fecha,
    DAY(fecha) as numeroDiaCalendario,
    DAYNAME(fecha) as dia,
    AVG(consumoEnergetico) as promedioEnergia,
    AVG(corrienteRMS) as promedioCorriente,
    AVG(potenciaRMS) as promedioPotencia,
    AVG(voltajeRMS) as promedioVoltaje
FROM lecturas_pto3
WHERE fecha BETWEEN '$start_date' AND '$end_date'
GROUP BY DAY(fecha)
ORDER BY DAY(fecha);";
} 

try {
    $stmt = $pdo->query($sql);
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data);
} catch (PDOException $e) {
    die("Error al obtener los datos: " . $e->getMessage());
}
