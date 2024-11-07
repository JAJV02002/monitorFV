// Este archivo maneja la creación y actualización de los gráficos con Chart.js. y la interfaz de usuario
// Definición de funcion para mostrar y ocultar secciones
function showSection(sectionId) {
  const sections = ['inicio', 'tiempo-real', 'semana', 'mes', 'generado'];
  sections.forEach((id) => {
    document.getElementById(id).style.display = 'none';
  });
  document.getElementById(sectionId).style.display = 'block';
}

// Funciones para la creación de gráficos
let charts = {}; // Almacenamiento global para las instancias de Chart

// Crear un gráfico y almacenarlo en el objeto charts
function createChart(chartId, label, color, minY, maxY) {
  // Destruye el gráfico existente si ya ha sido creado
  if (charts[chartId]) {
    charts[chartId].destroy();
  }

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
  return charts[chartId];
}

// Actualizar un gráfico con nuevos datos
function updateChart(chartId, newData) {


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
function getData(punto) {
  // Get data from getdata.php

  // Get the id start-date and end-date input values
  const startDate = document.getElementById('start-date').value;
  const endDate = document.getElementById('end-date').value;


  if (startDate === '' || endDate === '') {
    alert('Por favor, seleccione un rango de fechas válido');
    return;
  }




  if (punto === "1semana") {
    chartC = 'avg-current-chart-1';
    chartV = 'avg-voltage-chart-1';
    chartP = 'avg-power-chart-1';
    chartE = 'avg-energy-chart-1';
  }
  if (punto === "2semana") {
    chartC = 'avg-current-chart-2';
    chartV = 'avg-voltage-chart-2';
    chartP = 'avg-power-chart-2';
    chartE = 'avg-energy-chart-2';
  }
  if (punto === "3semana") {
    chartC = 'avg-current-chart-3';
    chartV = 'avg-voltage-chart-3';
    chartP = 'avg-power-chart-3';
    chartE = 'avg-energy-chart-3';
  }


  fetch('getdata.php' + '?punto=' + punto + '&startDate=' + startDate + '&endDate=' + endDate)
    .then(response => response.json())
    .then(data => {

      // Set data in the UI, the data received is an array of objects is
      // [0] => {dia: "Monday", promedioEnergia: "0.0000", promedioCorriente: "0.0000", promedioPotencia: "0.0000", promedioVoltaje: "0.0000"}
      const avgCurrentChart = document.getElementById(chartC).getContext('2d');
      const avgVoltageChart = document.getElementById(chartV).getContext('2d');
      const avgPowerChart = document.getElementById(chartP).getContext('2d');
      const avgEnergyChart = document.getElementById(chartE).getContext('2d');

      const days = data.map(item => item.dia);
      const avgCurrent = data.map(item => item.promedioCorriente);
      const avgVoltage = data.map(item => item.promedioVoltaje);
      const avgPower = data.map(item => item.promedioPotencia);
      const avgEnergy = data.map(item => item.promedioEnergia);

      // Destruir los gráficos si ya existen
      if (charts[chartC]) {
        charts[chartC].destroy();
      }
      if (charts[chartV]) {
        charts[chartV].destroy();
      }
      if (charts[chartP]) {
        charts[chartP].destroy();
      }
      if (charts[chartE]) {
        charts[chartE].destroy();
      }

      // Crear gráficos
      charts[chartC] = new Chart(avgCurrentChart, {
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

      charts[chartV] = new Chart(avgVoltageChart, {
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

      charts[chartP] = new Chart(avgPowerChart, {
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

      charts[chartE] = new Chart(avgEnergyChart, {
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

// Función getDataMes para que obtenga y grafique los promedios del mes
function getDataMes(punto) {
  const startDateMonth = document.getElementById('start-date-month').value;
  const endDateMonth = document.getElementById('end-date-month').value;

  if (!startDateMonth || !endDateMonth) {
    alert('Por favor, seleccione un rango de fechas válido');
    return;
  }

  let chartCMonth, chartVMonth, chartPMonth, chartEMonth;
  if (punto === "1mes") {
    chartCMonth = 'avg-current-chart-1-month';
    chartVMonth = 'avg-voltage-chart-1-month';
    chartPMonth = 'avg-power-chart-1-month';
    chartEMonth = 'avg-energy-chart-1-month';
  }
  if (punto === "2mes") {
    chartCMonth = 'avg-current-chart-2-month';
    chartVMonth = 'avg-voltage-chart-2-month';
    chartPMonth = 'avg-power-chart-2-month';
    chartEMonth = 'avg-energy-chart-2-month';
  }
  if (punto === "3mes") {
    chartCMonth = 'avg-current-chart-3-month';
    chartVMonth = 'avg-voltage-chart-3-month';
    chartPMonth = 'avg-power-chart-3-month';
    chartEMonth = 'avg-energy-chart-3-month';
  }

  fetch('getdata.php' + '?punto=' + punto + '&startDateMonth=' + startDateMonth + '&endDateMonth=' + endDateMonth)
    .then(response => response.json())
    .then(data => {
      const avgCurrentChartMonth = document.getElementById(chartCMonth).getContext('2d');
      const avgVoltageChartMonth = document.getElementById(chartVMonth).getContext('2d');
      const avgPowerChartMonth = document.getElementById(chartPMonth).getContext('2d');
      const avgEnergyChartMonth = document.getElementById(chartEMonth).getContext('2d');

      const labels = ['Promedio del Mes'];
      const avgCurrent = [data[0].promedioCorriente];
      const avgVoltage = [data[0].promedioVoltaje];
      const avgPower = [data[0].promedioPotencia];
      const avgEnergy = [data[0].promedioEnergia];

      if (charts[chartCMonth]) charts[chartCMonth].destroy();
      if (charts[chartVMonth]) charts[chartVMonth].destroy();
      if (charts[chartPMonth]) charts[chartPMonth].destroy();
      if (charts[chartEMonth]) charts[chartEMonth].destroy();

      charts[chartCMonth] = new Chart(avgCurrentChartMonth, {
        type: 'bar',
        data: {
          labels: labels,
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

      charts[chartVMonth] = new Chart(avgVoltageChartMonth, {
        type: 'bar',
        data: {
          labels: labels,
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

      charts[chartPMonth] = new Chart(avgPowerChartMonth, {
        type: 'bar',
        data: {
          labels: labels,
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

      charts[chartEMonth] = new Chart(avgEnergyChartMonth, {
        type: 'bar',
        data: {
          labels: labels,
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

// Función getDataMes para que obtenga y grafique los promedios del mes
function getDataGenerado(rango) {
  var dt = document.getElementById('dataTable');
  html = `<tr><td colspan="5">Aún no hay lecturas</td></tr>`;
  dt.innerHTML = "";

  var punto = document.getElementById('selectPto').value;


  let chartCGen, chartVGen, chartPGen, chartEGen;
    chartCGen = 'avg-current-chart-1-gen';
    chartVGen = 'avg-voltage-chart-1-gen';
    chartPGen = 'avg-power-chart-1-gen';
    chartEGen = 'avg-energy-chart-1-gen';

  fetch('getdata.php' + '?pto=' + punto + '&punto=null&startDateMonth=null&endDateMonth=null&rango=' + rango)
    .then(response => response.json())
    .then(data => {

      // Se modifica la tabla para mostrar las lecturas
      if (data.length > 0) {
        for (let reading of data) {
          html += `
            <tr>
              <td>${reading.consumoEnergetico}</td>
              <td>${reading.corrienteRMS}</td>
              <td>${reading.voltajeRMS}</td>
              <td>${reading.potenciaRMS}</td>
              <td>${reading.fecha}</td>
            </tr>
            `;
        }
      }

      dt.innerHTML += html;

      const avgCurrentChartGen = document.getElementById(chartCGen).getContext('2d');
      const avgVoltageChartGen = document.getElementById(chartVGen).getContext('2d');
      const avgPowerChartGen = document.getElementById(chartPGen).getContext('2d');
      const avgEnergyChartGen = document.getElementById(chartEGen).getContext('2d');

      const labels = ['Promedio'];
      const avgCurrent = [data[0].corrienteRMS];
      const avgVoltage = [data[0].voltajeRMS];
      const avgPower = [data[0].potenciaRMS];
      const avgEnergy = [data[0].consumoEnergetico];

      if (charts[chartCGen]) charts[chartCGen].destroy();
      if (charts[chartVGen]) charts[chartVGen].destroy();
      if (charts[chartPGen]) charts[chartPGen].destroy();
      if (charts[chartEGen]) charts[chartEGen].destroy();

      charts[chartCGen] = new Chart(avgCurrentChartGen, {
        type: 'bar',
        data: {
          labels: labels,
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

      charts[chartVGen] = new Chart(avgVoltageChartGen, {
        type: 'bar',
        data: {
          labels: labels,
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

      charts[chartPGen] = new Chart(avgPowerChartGen, {
        type: 'bar',
        data: {
          labels: labels,
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

      charts[chartEGen] = new Chart(avgEnergyChartGen, {
        type: 'bar',
        data: {
          labels: labels,
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

function fetchPotenciaRmsData(type) {
  let endpoint = '';
  //Para enviar la fecha al archivo php
  let fecha = document.getElementById('fecha-potenciaRMS').value;

  //Para enviar el punto al archivo php
  let punto = document.getElementById('selectPunto').value;


  if (type === 'potenciaRMS') {
    endpoint = 'get_potenciaRMS_data.php?fecha=' + fecha + '&punto=' + punto;
  }

  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      if (!charts.potenciaDia) {
        charts.potenciaDia = createChart('potenciaDia-chart', type.toUpperCase(), 'blue', 0, 100);
      }

      const potenciaDiaChart = charts.potenciaDia;
      potenciaDiaChart.data.labels = data.labels;
      potenciaDiaChart.data.datasets[0].data = data.values;
      potenciaDiaChart.update();

      document.getElementById('potenciaDia-chart-container').style.display = 'block';
    })
    .catch(error => console.error('Error fetching PotenciaDia data:', error));
}

// Hacer las funciones accesibles globalmente.
window.showSection = showSection;
window.toggleChart = toggleChart;
window.createChart = createChart;
window.updateChart = updateChart;
window.getData = getData;
window.getDataMes = getDataMes;
window.getDataGenerado = getDataGenerado;