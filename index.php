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
</head>
<body>

  <div id="header">
    <img src="./logo.png" alt="Logo" id="logo">
    <h1>Monitoreo de Sistema Fotovoltaico</h1>
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
      <p>Esta interfaz es el núcleo de este proyecto de tesis destinado a la gestión de energía en sistemas fotovoltaicos. Aquí se puede monitorear en tiempo real los parámetros críticos del sistema, garantizando así una supervisión efectiva y la optimización del rendimiento energético.</p>
      <p>Las Centrales Eléctricas Virtuales (VPPs) representan una red de recursos energéticos distribuidos que, coordinados, funcionan como una única central eléctrica. La relevancia de los sistemas de monitoreo es crucial en las VPPs, ya que permiten una gestión eficiente y una respuesta rápida a las demandas del mercado energético.</p>
        <div id="vpp-image-container">
          <img src="vpp-image.jpg" alt="VPP Image" style="max-width: 100%; height: auto;">
        </div>
      <p>La interactividad y la respuesta inmediata son elementos esenciales de esta plataforma, que se adapta a diferentes tamaños de pantalla para facilitar el acceso desde cualquier dispositivo.</p> 
      </div>
    </div>

    <div id="tiempo-real" class="section" style="display:none;">
        <h2>Lecturas en Tiempo Real</h2>
        <div id="sensor-values">
          <!-- Valores del sensor aquí -->
          <div class="sensor-value">
            <strong>Corriente RMS:</strong> <span id="corriente-value">Cargando...</span>
            <button onclick="toggleChart('current-chart')">Mostrar/Ocultar gráfico</button>
            <div id="current-chart-container" style="display:none;">
                <canvas id="current-chart"></canvas>
            </div>
          </div>
          <div class="sensor-value">
            <strong>Voltaje RMS:</strong> <span id="voltaje-value">Cargando...</span>
            <button onclick="toggleChart('voltage-chart')">Mostrar/Ocultar gráfico</button>
            <div id="voltage-chart-container" style="display:none;">
                <canvas id="voltage-chart"></canvas>
            </div>
          </div>
          <div class="sensor-value">
            <strong>Potencia activa:</strong> <span id="potencia-value">Cargando...</span>
            <button onclick="toggleChart('power-chart')">Mostrar/Ocultar gráfico</button>
            <div id="power-chart-container" style="display:none;">
                <canvas id="power-chart"></canvas>
            </div>
          </div>
          <div class="sensor-value">
            <strong>Consumo Energético:</strong> <span id="energia-value">Cargando...</span>
            <button onclick="toggleChart('energy-chart')">Mostrar/Ocultar gráfico</button>
            <div id="energy-chart-container" style="display:none;">
                <canvas id="energy-chart"></canvas>
            </div>
          </div>
        </div>      
    </div>

    <div id="semana" class="section" style="display:none;">
      <h2>Lecturas de la semana</h2>

    <div id="avg-current-chart-container">
      <h3>Corriente RMS</h3>
      <canvas id="avg-current-chart"></canvas>
    </div>

    <div id="avg-voltage-chart-container">
      <h3>Voltaje RMS</h3>
        <canvas id="avg-voltage-chart"></canvas>
      </div>

    <div id="avg-power-chart-container">
      <h3>Potencia activa</h3>
      <canvas id="avg-power-chart"></canvas>
    </div>

    <div id="avg-energy-chart-container">
      <h3>Consumo Energético</h3>
      <canvas id="avg-energy-chart"></canvas>
    </div>

    </div>

    <div id="mes" class="section" style="display:none;">
      <h2>Lecturas del Mes</h2>
      <!-- Contenido de Mediciones del Mes aquí -->
    </div>
  </div>

</body>
</html>

