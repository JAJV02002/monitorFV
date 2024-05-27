<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Tablero de Monitoreo de Sistema Fotovoltaico</title>
  <link rel="icono sitio" type="png" href="./logo.png">
  <link rel="stylesheet" type="text/css" href="./styles.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-database.js"></script>
  <script src="./firebase.js" type="module"></script>
  <script src="./ui-handling.js"></script>

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

</head>

<body>

  <div id="header">
    <img src="./logo.png" alt="Logo" id="logo">
    <h1>SolarVista</h1>
  </div>

  <div id="nav-menu">
    <ul>
      <li><a href="#" onclick="showSection('inicio')">Inicio</a></li>
      <li><a href="#" onclick="showSection('tiempo-real')">Lecturas en Tiempo Real</a></li>
      <li><a href="#" onclick="showSection('semana')">Lecturas de la Semana</a></li>
      <li><a href="#" onclick="showSection('mes')">Lecturas del Mes</a></li>
    </ul>
  </div>

  <div id="content">
    <div id="inicio" class="section">
      <h2>Inicio</h2>
      <div class="inicio-content">
        <div class="inicio-text">
          <strong>Bienvenido a la interfaz SolarVista.</strong>
          <p>Esta interfaz es el núcleo de este proyecto de tesis destinado a la gestión de energía en sistemas fotovoltaicos. Aquí se puede monitorear en tiempo real los parámetros críticos del sistema, garantizando así una supervisión efectiva y la optimización del rendimiento energético.</p>
          <p>Las Centrales Eléctricas Virtuales (VPPs) representan una red de recursos energéticos distribuidos que, coordinados, funcionan como una única central eléctrica. La relevancia de los sistemas de monitoreo de este tipo es crucial en las VPPs, ya que permiten una gestión eficiente y una respuesta rápida a las demandas del mercado energético.</p>
        </div>
        <img class="inicio-img" src="vpp-image.jpg" alt="VPP Imagen" style="max-width: 100%; height: auto;">
      </div> 
    </div>

    <div id="tiempo-real" class="section" style="display:none;">
      <h2>Lecturas en Tiempo Real</h2>
      <div id="sensor-values" style="display: flex; flex-wrap: wrap; justify-content: space-between;">
        <!-- Valores del punto de medición 1 -->
        <div class="sensor-value">
          <strong>Corriente RMS (punto 1):</strong> <span id="corriente-value-1">Cargando...</span>
          <button onclick="toggleChart('current-chart-1')">Mostrar gráfico</button>
          <div id="current-chart-1-container" style="display:none;">
            <canvas id="current-chart-1"></canvas>
          </div>
        </div>
        <div class="sensor-value">
          <strong>Voltaje RMS (punto 1):</strong> <span id="voltaje-value-1">Cargando...</span>
          <button onclick="toggleChart('voltage-chart-1')">Mostrar gráfico</button>
          <div id="voltage-chart-1-container" style="display:none;">
            <canvas id="voltage-chart-1"></canvas>
          </div>
        </div>
        <div class="sensor-value">
          <strong>Potencia activa (punto 1):</strong> <span id="potencia-value-1">Cargando...</span>
          <button onclick="toggleChart('power-chart-1')">Mostrar gráfico</button>
          <div id="power-chart-1-container" style="display:none;">
            <canvas id="power-chart-1"></canvas>
          </div>
        </div>
        <div class="sensor-value">
          <strong>Consumo Energético (punto 1):</strong> <span id="energia-value-1">Cargando...</span>
          <button onclick="toggleChart('energy-chart-1')">Mostrar gráfico</button>
          <div id="energy-chart-1-container" style="display:none;">
            <canvas id="energy-chart-1"></canvas>
          </div>
        </div>
      </div>

      <div id="sensor-values" style="display: flex; flex-wrap: wrap; justify-content: space-between;">
        <!-- Valores del punto de medición 2 -->
        <div class="sensor-value">
          <strong>Corriente RMS (punto 2):</strong> <span id="corriente-value-2">Cargando...</span>
          <button onclick="toggleChart('current-chart-2')">Mostrar gráfico</button>
          <div id="current-chart-2-container" style="display:none;">
            <canvas id="current-chart-2"></canvas>
          </div>
        </div>
        <div class="sensor-value">
          <strong>Voltaje RMS (punto 2):</strong> <span id="voltaje-value-2">Cargando...</span>
          <button onclick="toggleChart('voltage-chart-2')">Mostrar gráfico</button>
          <div id="voltage-chart-2-container" style="display:none;">
            <canvas id="voltage-chart-2"></canvas>
          </div>
        </div>
        <div class="sensor-value">
          <strong>Potencia activa (punto 2):</strong> <span id="potencia-value-2">Cargando...</span>
          <button onclick="toggleChart('power-chart-2')">Mostrar gráfico</button>
          <div id="power-chart-2-container" style="display:none;">
            <canvas id="power-chart-2"></canvas>
          </div>
        </div>
        <div class="sensor-value">
          <strong>Consumo Energético (punto 2):</strong> <span id="energia-value-2">Cargando...</span>
          <button onclick="toggleChart('energy-chart-2')">Mostrar gráfico</button>
          <div id="energy-chart-2-container" style="display:none;">
            <canvas id="energy-chart-2"></canvas>
          </div>
        </div>
      </div>

      <div id="sensor-values" style="display: flex; flex-wrap: wrap; justify-content: space-between;">
        <!-- Valores del punto de medición 3 -->
        <div class="sensor-value">
          <strong>Corriente RMS (punto 3):</strong> <span id="corriente-value-3">Cargando...</span>
          <button onclick="toggleChart('current-chart-3')">Mostrar gráfico</button>
          <div id="current-chart-3-container" style="display:none;">
            <canvas id="current-chart-3"></canvas>
          </div>
        </div>
        <div class="sensor-value">
          <strong>Voltaje RMS (punto 3):</strong> <span id="voltaje-value-3">Cargando...</span>
          <button onclick="toggleChart('voltage-chart-3')">Mostrar gráfico</button>
          <div id="voltage-chart-3-container" style="display:none;">
            <canvas id="voltage-chart-3"></canvas>
          </div>
        </div>
        <div class="sensor-value">
          <strong>Potencia activa (punto 3):</strong> <span id="potencia-value-3">Cargando...</span>
          <button onclick="toggleChart('power-chart-3')">Mostrar gráfico</button>
          <div id="power-chart-3-container" style="display:none;">
            <canvas id="power-chart-3"></canvas>
          </div>
        </div>
        <div class="sensor-value">
          <strong>Consumo Energético (punto 3):</strong> <span id="energia-value-3">Cargando...</span>
          <button onclick="toggleChart('energy-chart-3')">Mostrar gráfico</button>
          <div id="energy-chart-3-container" style="display:none;">
            <canvas id="energy-chart-3"></canvas>
          </div>
        </div>
      </div>
    </div>

    <div id="semana" class="section" style="display:none;">
      <h2>Lecturas de la semana</h2>
      <strong>Seleccione la fecha de inicio y fin de la semana que desea visualizar los datos:</strong>
      <input type="date" id="start-date" required>
      <input type="date" id="end-date" required>
      <div style="display: flex; flex-wrap: wrap; justify-content: space-between;">
        <button class="button-style" id="getSemanaP1" onclick="getData('1semana')">Obtener Datos punto 1</button>
        <button class="button-style" id="getSemanaP2" onclick="getData('2semana')">Obtener Datos punto 2</button>
        <button class="button-style" id="getSemanaP3" onclick="getData('3semana')">Obtener Datos punto 3</button>
      </div>

      <!-- Gráficas del punto de medición 1 -->
      <div id="avg-sensor-values" style="display: flex; flex-wrap: wrap; justify-content: space-between;">
        <div class="sensor-value">
          <button onclick="toggleChart('avg-current-chart-1')">Mostrar Corriente RMS</button>
          <div id="avg-current-chart-1-container" style="display:none;">
            <canvas id="avg-current-chart-1"></canvas>
          </div>
        </div>
        <div class="sensor-value">
          <button onclick="toggleChart('avg-voltage-chart-1')">Mostrar Voltaje RMS</button>
          <div id="avg-voltage-chart-1-container" style="display:none;">
            <canvas id="avg-voltage-chart-1"></canvas>
          </div>
        </div>
        <div class="sensor-value">
          <button onclick="toggleChart('avg-power-chart-1')">Mostrar Potencia activa</button>
          <div id="avg-power-chart-1-container" style="display:none;">
            <canvas id="avg-power-chart-1"></canvas>
          </div>
        </div>
        <div class="sensor-value">
          <button onclick="toggleChart('avg-energy-chart-1')">Mostrar Consumo Energético</button>
          <div id="avg-energy-chart-1-container" style="display:none;">
            <canvas id="avg-energy-chart-1"></canvas>
          </div>
        </div>
      </div>

      <!-- Gráficas del punto de medición 2 -->
      <div id="avg-sensor-values" style="display: flex; flex-wrap: wrap; justify-content: space-between;">
        <div class="sensor-value">
          <button onclick="toggleChart('avg-current-chart-2')">Mostrar Corriente RMS</button>
          <div id="avg-current-chart-2-container" style="display:none;">
            <canvas id="avg-current-chart-2"></canvas>
          </div>
        </div>
        <div class="sensor-value">
          <button onclick="toggleChart('avg-voltage-chart-2')">Mostrar Voltaje RMS</button>
          <div id="avg-voltage-chart-2-container" style="display:none;">
            <canvas id="avg-voltage-chart-2"></canvas>
          </div>
        </div>
        <div class="sensor-value">
          <button onclick="toggleChart('avg-power-chart-2')">Mostrar Potencia activa</button>
          <div id="avg-power-chart-2-container" style="display:none;">
            <canvas id="avg-power-chart-2"></canvas>
          </div>
        </div>
        <div class="sensor-value">
          <button onclick="toggleChart('avg-energy-chart-2')">Mostrar Consumo Energético</button>
          <div id="avg-energy-chart-2-container" style="display:none;">
            <canvas id="avg-energy-chart-2"></canvas>
          </div>
        </div>
      </div>

      <!-- Gráficas del punto de medición 3 -->
      <div id="avg-sensor-values" style="display: flex; flex-wrap: wrap; justify-content: space-between;">
        <div class="sensor-value">
          <button onclick="toggleChart('avg-current-chart-3')">Mostrar Corriente RMS</button>
          <div id="avg-current-chart-3-container" style="display:none;">
            <canvas id="avg-current-chart-3"></canvas>
          </div>
        </div>
        <div class="sensor-value">
          <button onclick="toggleChart('avg-voltage-chart-3')">Mostrar Voltaje RMS</button>
          <div id="avg-voltage-chart-3-container" style="display:none;">
            <canvas id="avg-voltage-chart-3"></canvas>
          </div>
        </div>
        <div class="sensor-value">
          <button onclick="toggleChart('avg-power-chart-3')">Mostrar Potencia activa</button>
          <div id="avg-power-chart-3-container" style="display:none;">
            <canvas id="avg-power-chart-3"></canvas>
          </div>
        </div>
        <div class="sensor-value">
          <button onclick="toggleChart('avg-energy-chart-3')">Mostrar Consumo Energético</button>
          <div id="avg-energy-chart-3-container" style="display:none;">
            <canvas id="avg-energy-chart-3"></canvas>
          </div>
        </div>
      </div>
    </div>

    <div id="mes" class="section" style="display:none;">
      <h2>Lecturas del Mes</h2>
      <strong>Seleccione la fecha de inicio y fin del mes que desea visualizar los datos:</strong>
      <input type="date" id="start-date-month" required>
      <input type="date" id="end-date-month" required>
      <div style="display: flex; flex-wrap: wrap; justify-content: space-between;">
        <button class="button-style" id="getMesP1" onclick="getData('1mes')">Obtener Datos punto 1</button>
        <button class="button-style" id="getMesP2" onclick="getData('2mes')">Obtener Datos punto 2</button>
        <button class="button-style" id="getMesP3" onclick="getData('3mes')">Obtener Datos punto 3</button>
      </div>

      <!-- Gráficas del punto de medición 1 -->
      <div id="avg-sensor-values" style="display: flex; flex-wrap: wrap; justify-content: space-between;">
        <div class="sensor-value">
          <button onclick="toggleChart('avg-current-chart-1-month')">Mostrar Corriente RMS</button>
          <div id="avg-current-chart-1-month-container" style="display:none;">
            <canvas id="avg-current-chart-1-month"></canvas>
          </div>
        </div>
        <div class="sensor-value">
          <button onclick="toggleChart('avg-voltage-chart-1-month')">Mostrar Voltaje RMS</button>
          <div id="avg-voltage-chart-1-month-container" style="display:none;">
            <canvas id="avg-voltage-chart-1-month"></canvas>
          </div>
        </div>
        <div class="sensor-value">
          <button onclick="toggleChart('avg-power-chart-1-month')">Mostrar Potencia activa</button>
          <div id="avg-power-chart-1-month-container" style="display:none;">
            <canvas id="avg-power-chart-1-month"></canvas>
          </div>
        </div>
        <div class="sensor-value">
          <button onclick="toggleChart('avg-energy-chart-1-month')">Mostrar Consumo Energético</button>
          <div id="avg-energy-chart-1-month-container" style="display:none;">
            <canvas id="avg-energy-chart-1-month"></canvas>
          </div>
        </div>
      </div>

      <!-- Gráficas del punto de medición 2 -->
      <div id="avg-sensor-values" style="display: flex; flex-wrap: wrap; justify-content: space-between;">
        <div class="sensor-value">
          <button onclick="toggleChart('avg-current-chart-2-month')">Mostrar Corriente RMS</button>
          <div id="avg-current-chart-2-month-container" style="display:none;">
            <canvas id="avg-current-chart-2-month"></canvas>
          </div>
        </div>
        <div class="sensor-value">
          <button onclick="toggleChart('avg-voltage-chart-2-month')">Mostrar Voltaje RMS</button>
          <div id="avg-voltage-chart-2-month-container" style="display:none;">
            <canvas id="avg-voltage-chart-2-month"></canvas>
          </div>
        </div>
        <div class="sensor-value">
          <button onclick="toggleChart('avg-power-chart-2-month')">Mostrar Potencia activa</button>
          <div id="avg-power-chart-2-month-container" style="display:none;">
            <canvas id="avg-power-chart-2-month"></canvas>
          </div>
        </div>
        <div class="sensor-value">
          <button onclick="toggleChart('avg-energy-chart-2-month')">Mostrar Consumo Energético</button>
          <div id="avg-energy-chart-2-month-container" style="display:none;">
            <canvas id="avg-energy-chart-2-month"></canvas>
          </div>
        </div>
      </div>

      <!-- Gráficas del punto de medición 3 -->
      <div id="avg-sensor-values" style="display: flex; flex-wrap: wrap; justify-content: space-between;">
        <div class="sensor-value">
          <button onclick="toggleChart('avg-current-chart-3-month')">Mostrar Corriente RMS</button>
          <div id="avg-current-chart-3-month-container" style="display:none;">
            <canvas id="avg-current-chart-3-month"></canvas>
          </div>
        </div>
        <div class="sensor-value">
          <button onclick="toggleChart('avg-voltage-chart-3-month')">Mostrar Voltaje RMS</button>
          <div id="avg-voltage-chart-3-month-container" style="display:none;">
            <canvas id="avg-voltage-chart-3-month"></canvas>
          </div>
        </div>
        <div class="sensor-value">
          <button onclick="toggleChart('avg-power-chart-3-month')">Mostrar Potencia activa</button>
          <div id="avg-power-chart-3-month-container" style="display:none;">
            <canvas id="avg-power-chart-3-month"></canvas>
          </div>
        </div>
        <div class="sensor-value">
          <button onclick="toggleChart('avg-energy-chart-3-month')">Mostrar Consumo Energético</button>
          <div id="avg-energy-chart-3-month-container" style="display:none;">
            <canvas id="avg-energy-chart-3-month"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>

</body>

</html>


