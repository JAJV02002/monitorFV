<?php

require_once 'pdo.php';
date_default_timezone_set('America/Mexico_City');

$punto = $_GET['punto'];
$tabla = '';

if($punto == 1){
    $sql = "SELECT 
    DAYNAME(fecha) as dia,
    AVG(consumoEnergetico) as promedioEnergia,
    AVG(corrienteRMS) as promedioCorriente,
    AVG(potenciaRMS) as promedioPotencia,
    AVG(voltajeRMS) as promedioVoltaje
FROM lecturas_pto1
GROUP BY DAYOFWEEK(fecha)
ORDER BY DAYOFWEEK(fecha);";
}elseif($punto == 2){
    $sql = "SELECT 
    DAYNAME(fecha) as dia,
    AVG(consumoEnergetico) as promedioEnergia,
    AVG(corrienteRMS) as promedioCorriente,
    AVG(potenciaRMS) as promedioPotencia,
    AVG(voltajeRMS) as promedioVoltaje
FROM lecturas_pto2
GROUP BY DAYOFWEEK(fecha)
ORDER BY DAYOFWEEK(fecha);";
}elseif($punto == 3){
    $sql = "SELECT 
    DAYNAME(fecha) as dia,
    AVG(consumoEnergetico) as promedioEnergia,
    AVG(corrienteRMS) as promedioCorriente,
    AVG(potenciaRMS) as promedioPotencia,
    AVG(voltajeRMS) as promedioVoltaje
FROM lecturas_pto3
GROUP BY DAYOFWEEK(fecha)
ORDER BY DAYOFWEEK(fecha);";
}



try {
    $stmt = $pdo->query($sql);
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data);
} catch (PDOException $e) {
    die("Error al obtener los datos: " . $e->getMessage());
}
