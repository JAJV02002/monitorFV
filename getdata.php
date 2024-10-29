<?php

require_once 'pdo.php';
date_default_timezone_set('America/Mexico_City');

$punto = $_GET['punto'];
$pto = $_GET['pto'];
$rango = $_GET['rango'];
// $start_date = $_GET['startDate'];
// $end_date = $_GET['endDate'];
// $start_date_month = $_GET['startDateMonth'] ?? null;
// $end_date_month = $_GET['endDateMonth'] ?? null;

$tabla = '';

if(isset($pto)){
    $sql = "SELECT * 
            FROM lecturas_$pto
            WHERE fecha >= DATE_SUB(NOW(), INTERVAL $rango)
            ORDER BY fecha ASC;";
}



if ($punto === "1semana") {
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
elseif ($punto === "2semana") {
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
elseif ($punto === "3semana") {
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
elseif ($punto === "1mes") {
    $sql = "SELECT 
    AVG(consumoEnergetico) as promedioEnergia,
    AVG(corrienteRMS) as promedioCorriente,
    AVG(potenciaRMS) as promedioPotencia,
    AVG(voltajeRMS) as promedioVoltaje
FROM lecturas_pto1
WHERE fecha BETWEEN '$start_date_month' AND '$end_date_month';";
}
elseif ($punto === "2mes") {
    $sql = "SELECT 
    AVG(consumoEnergetico) as promedioEnergia,
    AVG(corrienteRMS) as promedioCorriente,
    AVG(potenciaRMS) as promedioPotencia,
    AVG(voltajeRMS) as promedioVoltaje
FROM lecturas_pto2
WHERE fecha BETWEEN '$start_date_month' AND '$end_date_month';";
}
elseif ($punto === "3mes") {
    $sql = "SELECT 
    AVG(consumoEnergetico) as promedioEnergia,
    AVG(corrienteRMS) as promedioCorriente,
    AVG(potenciaRMS) as promedioPotencia,
    AVG(voltajeRMS) as promedioVoltaje
FROM lecturas_pto3
WHERE fecha BETWEEN '$start_date_month' AND '$end_date_month';";
}

try {
    $stmt = $pdo->query($sql);
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data);
} catch (PDOException $e) {
    die("Error al obtener los datos: " . $e->getMessage());
}


