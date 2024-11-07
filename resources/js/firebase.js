// Importar la funciones necesarias aqui
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Configuración de Firebase para la web App 
const firebaseConfig = {
  apiKey: "AIzaSyBmTfSm5GohhphVdkvh2lxC8aTKf_N4Q1jS",
  authDomain: "monitorfv-basedatos-esp32.firebaseapp.com",
  databaseURL: "https://monitorfv-basedatos-esp32-default-rtdb.firebaseio.com",
  projectId: "monitorfv-basedatos-esp32",
  storageBucket: "monitorfv-basedatos-esp32.appspot.com",
  messagingSenderId: "4999868660",
  appId: "1:4999868660:web:3287ef844317b6a474e641",
  measurementId: "G-HCRFZHH927"
};

// Para inicializar Firebase
const app = initializeApp(firebaseConfig);

// Referenciar a la base de datos 
var database = getDatabase(app);

// Exporta el método para suscribirse a datos de Firebase para su uso en ui-handling.js
const subscribeToSensorData = (sensorPath, callback) => {
  const sensorRef = ref(database, sensorPath);
  onValue(sensorRef, (snapshot) => {
    const value = snapshot.val();
    callback(value);
  });
};

window.subscribeToSensorData = subscribeToSensorData;
