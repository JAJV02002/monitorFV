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
  const voltageChart = createChart('voltage-chart-1', 'Voltaje (V)', 'blue', 110, 130); //Considerando que los valores de voltaje estan alrededor de 110V a 130V
  const currentChart = createChart('current-chart-1', 'Corriente (A)', 'green', 0, 1);//Considerando que los valores de corriente están alrededor de 0A a 1 A
  const powerChart = createChart('power-chart-1', 'Potencia (W)', 'red', 90, 120);//Considerando que los valores de potencia están alrededor de 90W a 120W
  const energyChart = createChart('energy-chart-1', 'Consumo Energetico (kWh)', 'yellow', 0.0, 0.85);//Considerando que los valores de consumo energetico están alrededor de 0.7kWh a 0.850

  const voltageChart2 = createChart('voltage-chart-2', 'Voltaje (V)', 'blue', 110, 130); //Considerando que los valores de voltaje estan alrededor de 110V a 130V
  const currentChart2 = createChart('current-chart-2', 'Corriente (A)', 'green', 0, 1);//Considerando que los valores de corriente están alrededor de 0A a 1 A
  const powerChart2 = createChart('power-chart-2', 'Potencia (W)', 'red', 90, 120);//Considerando que los valores de potencia están alrededor de 90W a 120W
  const energyChart2 = createChart('energy-chart-2', 'Consumo Energetico (kWh)', 'yellow', 0.0, 0.85);//Considerando que los valores de consumo energetico están alrededor de 0.7kWh a 0.850

  const voltageChart3 = createChart('voltage-chart-3', 'Voltaje (V)', 'blue', 110, 130); //Considerando que los valores de voltaje estan alrededor de 110V a 130V
  const currentChart3 = createChart('current-chart-3', 'Corriente (A)', 'green', 0, 1);//Considerando que los valores de corriente están alrededor de 0A a 1 A
  const powerChart3 = createChart('power-chart-3', 'Potencia (W)', 'red', 90, 120);//Considerando que los valores de potencia están alrededor de 90W a 120W
  const energyChart3 = createChart('energy-chart-3', 'Consumo Energetico (kWh)', 'yellow', 0.0, 0.85);//Considerando que los valores de consumo energetico están alrededor de 0.7kWh a 0.850

  // Asegúrate de que las funciones de suscripción sean llamadas después de que los gráficos hayan sido creados.
  // Suscribirse a los datos de los sensores en tiempo real del punto 1
  subscribeToSensorData('Ejemplo_01/sensorData/Voltaje_RMS', (newVoltage) => {
    document.getElementById('voltaje-value-1').textContent = `${newVoltage} V`;
    updateChart('voltage-chart-1', newVoltage);
  });

  subscribeToSensorData('Ejemplo_01/sensorData/Corriente_RMS', (newCurrent) => {
    document.getElementById('corriente-value-1').textContent = `${newCurrent} A`;
    updateChart('current-chart-1', newCurrent);
  });

  subscribeToSensorData('Ejemplo_01/sensorData/Potencia_RMS', (newPower) => {
    document.getElementById('potencia-value-1').textContent = `${newPower} W`;
    updateChart('power-chart-1', newPower);
  });

  subscribeToSensorData('Ejemplo_01/sensorData/Consumo_energetico', (newEnergy) => {
    document.getElementById('energia-value-1').textContent = `${newEnergy} kWh`;
    updateChart('energy-chart-1', newEnergy);
  });

  // Suscribirse a los datos de los sensores en tiempo real del punto 2
  subscribeToSensorData('Ejemplo_02/sensorData/Voltaje_RMS', (newVoltage) => {
    document.getElementById('voltaje-value-2').textContent = `${newVoltage} V`;
    updateChart('voltage-chart-2', newVoltage);
  });

  subscribeToSensorData('Ejemplo_02/sensorData/Corriente_RMS', (newCurrent) => {
    document.getElementById('corriente-value-2').textContent = `${newCurrent} A`;
    updateChart('current-chart-2', newCurrent);
  });

  subscribeToSensorData('Ejemplo_02/sensorData/Potencia_RMS', (newPower) => {
    document.getElementById('potencia-value-2').textContent = `${newPower} W`;
    updateChart('power-chart-2', newPower);
  });

  subscribeToSensorData('Ejemplo_02/sensorData/Consumo_energetico', (newEnergy) => {
    document.getElementById('energia-value-2').textContent = `${newEnergy} kWh`;
    updateChart('energy-chart-2', newEnergy);
  });

  // Suscribirse a los datos de los sensores en tiempo real del punto 3
  subscribeToSensorData('Ejemplo_03/sensorData/Voltaje_RMS', (newVoltage) => {
    document.getElementById('voltaje-value-3').textContent = `${newVoltage} V`;
    updateChart('voltage-chart-3', newVoltage);
  });

  subscribeToSensorData('Ejemplo_03/sensorData/Corriente_RMS', (newCurrent) => {
    document.getElementById('corriente-value-3').textContent = `${newCurrent} A`;
    updateChart('current-chart-3', newCurrent);
  });

  subscribeToSensorData('Ejemplo_03/sensorData/Potencia_RMS', (newPower) => {
    document.getElementById('potencia-value-3').textContent = `${newPower} W`;
    updateChart('power-chart-3', newPower);
  });

  subscribeToSensorData('Ejemplo_03/sensorData/Consumo_energetico', (newEnergy) => {
    document.getElementById('energia-value-3').textContent = `${newEnergy} kWh`;
    updateChart('energy-chart-3', newEnergy);
  });

  // Inicializa la visualización de la sección principal
  showSection('inicio');
});

// Get data from database using getdata.php and set in the UI when user
// clicks on id of the button id getSemana
function getData() {
  // Get data from getdata.php
  fetch('getdata.php')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Set data in the UI, the data received is an array of objects is
      // [0] => {dia: "Monday", promedioEnergia: "0.0000", promedioCorriente: "0.0000", promedioPotencia: "0.0000", promedioVoltaje: "0.0000"}
      const avgCurrentChart = document.getElementById('avg-current-chart').getContext('2d');
      const avgVoltageChart = document.getElementById('avg-voltage-chart').getContext('2d');
      const avgPowerChart = document.getElementById('avg-power-chart').getContext('2d');
      const avgEnergyChart = document.getElementById('avg-energy-chart').getContext('2d');

      const days = data.map(item => item.dia);
      const avgCurrent = data.map(item => item.promedioCorriente);
      const avgVoltage = data.map(item => item.promedioVoltaje);
      const avgPower = data.map(item => item.promedioPotencia);
      const avgEnergy = data.map(item => item.promedioEnergia);

      // Create charts
      new Chart(avgCurrentChart, {
        type: 'bar',
        data: {
          labels: days,
          datasets: [{
            label: 'Corriente RMS',
            data: avgCurrent,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      new Chart(avgVoltageChart, {
        type: 'bar',
        data: {
          labels: days,
          datasets: [{
            label: 'Voltaje RMS',
            data: avgVoltage,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      new Chart(avgPowerChart, {
        type: 'bar',
        data: {
          labels: days,
          datasets: [{
            label: 'Potencia activa',
            data: avgPower,
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      new Chart(avgEnergyChart, {
        type: 'bar',
        data: {
          labels: days,
          datasets: [{
            label: 'Consumo Energético',
            data: avgEnergy,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    })
    .catch(error => console.error('Error:', error));
}


// Hacer las funciones accesibles globalmente.
window.showSection = showSection;
window.toggleChart = toggleChart;
window.createChart = createChart;
window.updateChart = updateChart;