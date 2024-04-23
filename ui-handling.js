// Este archivo maneja la creación y actualización de los gráficos con Chart.js. y la interfaz de usuario

// Definición de funcion para mostrar y ocultar secciones
function showSection(sectionId) {
  const sections = ['inicio', 'tiempo-real', 'semana', 'mes'];
  sections.forEach((id) => {
    document.getElementById(id).style.display = 'none';
  });
  document.getElementById(sectionId).style.display = 'block';
}

// Funciones para la creación de gráficos
let charts = {};// Almacenamiento global para las instancias de Chart

// Crear un gráfico y almacenarlo en el objeto charts
function createChart(chartId, label, color, minY, maxY) {
  // Asegúrate de que la creación del gráfico solo ocurre si aún no ha sido creado
  if (!charts[chartId]) {
    const ctx = document.getElementById(chartId).getContext('2d');
    charts[chartId] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: label,
          data: [],
          borderColor: color,
          fill: false
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
            suggestedMin: minY,
            suggestedMax: maxY,
          }
        }
      }
    });
  }
  return charts[chartId];
}

// Actualizar un gráfico con nuevos datos
function updateChart(chartId, newData) {
  console.log(`Updating chart (${chartId}) with new data:`, newData);

  const chart = charts[chartId];
  if (chart) {
    const now = new Date();
    const label = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    // Añadir la nueva etiqueta al eje X.
    chart.data.labels.push(label);
    chart.data.datasets[0].data.push(newData);

    // Si ya tienes muchas entradas, elimina la primera para mantener el gráfico manejable.
    if (chart.data.labels.length > 20) {
      chart.data.labels.shift();
      chart.data.datasets[0].data.shift();
    }

    // Finalmente, se le dice a Chart.js que actualice el gráfico con los nuevos datos.
    chart.update();
  } else {
    console.error(`Chart with ID '${chartId}' not found`);
  }
}

// Alternar la visualización de un contenedor de gráfico
function toggleChart(chartId) {
  const chartContainerId = chartId + '-container';
  const chartContainer = document.getElementById(chartContainerId);
  
  if (chartContainer.style.display === "none") {
    chartContainer.style.display = "block";
    // Crea el gráfico si no existe
    if (!charts[chartId]) {
      // Suponiendo que 'label' y 'color' sean proporcionados correctamente
      createChart(chartId, 'Etiqueta', 'Color');
    }
  } else {
    chartContainer.style.display = "none";
  }
}
// Inicializar gráficos vacíos para datos semanales
// ...

// Inicializar gráficos vacíos para datos mensuales
// ...

// Suscripción a datos en tiempo real de Firebase y actualización de gráficos
document.addEventListener('DOMContentLoaded', () => {
  //Creación de graficos aqui para evitar cualquier referencia a elementos del DOM que aún no existan
  const voltageChart = createChart('voltage-chart', 'Voltaje (V)', 'blue', 110, 130); //Considerando que los valores de voltaje estan alrededor de 110V a 130V
  const currentChart = createChart('current-chart', 'Corriente (A)', 'green', 0, 1);//Considerando que los valores de corriente están alrededor de 0A a 1 A
  const powerChart = createChart('power-chart', 'Potencia (W)', 'red', 90, 120);//Considerando que los valores de potencia están alrededor de 90W a 120W
  const energyChart = createChart('energy-chart', 'Consumo Energetico (kWh)', 'yellow', 0.0, 0.85);//Considerando que los valores de consumo energetico están alrededor de 0.7kWh a 0.850

  // Asegúrate de que las funciones de suscripción sean llamadas después de que los gráficos hayan sido creados.
  subscribeToSensorData('Ejemplo_01/sensorData/Voltaje_RMS', (newVoltage) => {
    document.getElementById('voltaje-value').textContent = `${newVoltage} V`;
    updateChart('voltage-chart', newVoltage);
  });

  subscribeToSensorData('Ejemplo_01/sensorData/Corriente_RMS', (newCurrent) => {
    document.getElementById('corriente-value').textContent = `${newCurrent} A`; 
    updateChart('current-chart', newCurrent);
  });

  subscribeToSensorData('Ejemplo_01/sensorData/Potencia_RMS', (newPower) => {
    document.getElementById('potencia-value').textContent = `${newPower} W`;
    updateChart('power-chart', newPower);
  });

  subscribeToSensorData('Ejemplo_01/sensorData/Consumo_energetico', (newEnergy) => {
    document.getElementById('energia-value').textContent = `${newEnergy} kWh`;
    updateChart('energy-chart', newEnergy);
  });

  // Inicializa la visualización de la sección principal
  showSection('inicio');
});

// Hacer las funciones accesibles globalmente.
window.showSection = showSection;
window.toggleChart = toggleChart;
window.createChart = createChart;
window.updateChart = updateChart;

// Initialize the Chart.js instances
var ctxEnergy = document.getElementById('avg-energy-chart').getContext('2d');
var energyChart = new Chart(ctxEnergy, { type: 'line', data: { labels: [], datasets: [] } });

var ctxCurrent = document.getElementById('avg-current-chart').getContext('2d');
var currentChart = new Chart(ctxCurrent, { type: 'line', data: { labels: [], datasets: [] } });

var ctxPower = document.getElementById('avg-power-chart').getContext('2d');
var powerChart = new Chart(ctxPower, { type: 'line', data: { labels: [], datasets: [] } });

var ctxVoltage = document.getElementById('avg-voltage-chart').getContext('2d');
var voltageChart = new Chart(ctxVoltage, { type: 'line', data: { labels: [], datasets: [] } });

// Para hacer Fetch a la data y actualizar las graficas
$.ajax({
  url: 'getdata.php',
  method: 'GET',
  success: function(data) {
    var labels = data.map(function(item) {
      return item.dia;
    });

    console.log(labels);

    var avgEnergia = data.map(function(item) {
      return item.promedioEnergia;
    });

    var avgCorriente = data.map(function(item) {
      return item.promedioCorriente;
    });

    var avgPotencia = data.map(function(item) {
      return item.promedioPotencia;
    });

    var avgVoltaje = data.map(function(item) {
      return item.promedioVoltaje;
    });

    // Update the charts with the new data
    energyChart.data.labels = labels;
    energyChart.data.datasets[0] = {
      label: 'Consumo Energético',
      data: avgEnergia,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    };
    energyChart.update();

    currentChart.data.labels = labels;
    currentChart.data.datasets[0] = {
      label: 'Corriente RMS',
      data: avgCorriente,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    };
    currentChart.update();

    powerChart.data.labels = labels;
    powerChart.data.datasets[0] = {
      label: 'Potencia RMS',
      data: avgPotencia,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    };
    powerChart.update();

    voltageChart.data.labels = labels;
    voltageChart.data.datasets[0] = {
      label: 'Voltaje RMS',
      data: avgVoltaje,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    };
    voltageChart.update();
  }
});