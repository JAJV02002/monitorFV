#include "EmonLib.h" // Librería para los sensores
#include <WiFi.h> // Librería para conectar a WiFi
#include <WiFiClientSecure.h> // Librería para realizar peticiones HTTPS
#include <FirebaseESP32.h> // Librería para conectar ESP32 con Google Firebase

struct WiFiInfo {
  const char* ssid;
  const char* password;
};

const WiFiInfo knownNetworks[] PROGMEM = {
  {"LABCEECM1", "2016labCEECM"},
  {"LABCEECM2", "2016labCEECM"},
  {"Kawai", "nihongo2024!*"}
};

#define FIREBASE_HOST "https://monitorfv-basedatos-esp32-default-rtdb.firebaseio.com/"
#define FIREBASE_AUTH "1vD8ukIX6yFk1lX3Y6RaYKb7yRDvltUUnnpWqelw"
FirebaseConfig config;
FirebaseAuth auth;
FirebaseData MonitorFV;
const String ruta = "/Ejemplo_02";

EnergyMonitor emonV, emonI;
constexpr float calibrationV = 41.0;
constexpr float calibrationI = 1.12;
constexpr int pinSensorVoltaje = 34;
constexpr int pinSensorCorriente = 35;

double energiaAcumulada = 0.0;
unsigned long tiempoUltimaMedicion = 0;

void setup() {
  conectarAWiFi();
  configurarFirebase();
  configurarSensores();
}

void conectarAWiFi() {
  for (size_t i = 0; i < sizeof(knownNetworks)/sizeof(knownNetworks[0]); ++i) {
    WiFiInfo network;
    memcpy_P(&network, &knownNetworks[i], sizeof(WiFiInfo));
    WiFi.begin(network.ssid, network.password);
    
    for (int j = 0; j < 10 && WiFi.status() != WL_CONNECTED; j++) {
      delay(1000);
    }
    if (WiFi.status() == WL_CONNECTED) {
      break;
    }
  }
}

void disconnectWiFi() {
  WiFi.disconnect(true);
  WiFi.mode(WIFI_OFF);
}

void configurarFirebase() {
  config.host = FIREBASE_HOST;
  config.signer.tokens.legacy_token = FIREBASE_AUTH;
  Firebase.begin(&config, &auth);
  Firebase.reconnectNetwork(true);
}

void configurarSensores() {
  emonV.voltage(pinSensorVoltaje, calibrationV, 1.7);
  emonI.current(pinSensorCorriente, calibrationI);
  tiempoUltimaMedicion = millis();
}

void sendToServer(double voltaje, double corriente, double potencia, double energia) {
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClientSecure client;
    client.setInsecure(); // Use insecure connection (no certificate validation)
    
    if (client.connect("monitorFV.com", 443)) { // 443 is the port for HTTPS
      String url = "/save_data_p2.php";
      String data = "voltaje=" + String(voltaje, 2) + "&corriente=" + String(corriente, 3) + "&potencia=" + String(potencia, 2) + "&energia=" + String(energia, 3);

      // HTTP request
      client.print(String("POST ") + url + " HTTP/1.1\r\n" +
                   "Host: monitorFV.com\r\n" +
                   "Content-Type: application/x-www-form-urlencoded\r\n" +
                   "Content-Length: " + data.length() + "\r\n" +
                   "Connection: close\r\n\r\n" +
                   data + "\r\n");
      
      // Skip HTTP headers
      while (client.connected()) {
        String line = client.readStringUntil('\n');
        if (line == "\r") break;
      }

      // Optional: Print server response
      String response = client.readString();
      // Serial.println(response); // Uncomment this line if you need to debug
    }
    client.stop();
  }
}

void loop() {
  emonV.calcVI(20, 2000); // Ajustar para ZMPT101B
  emonI.calcVI(20, 1480); // Ajustar para SCT-013
  
  double voltaje = emonV.Vrms;
  double corriente = emonI.Irms;
  double potencia = voltaje * corriente; // Potencia instantánea en Watts
  unsigned long tiempoActual = millis();
  double energia = potencia * (tiempoActual - tiempoUltimaMedicion) / 3600000.0; // kWh
  energiaAcumulada += energia;

  conectarAWiFi();

  if (WiFi.status() == WL_CONNECTED) {
    if (Firebase.ready()) {
      FirebaseJson json;
      json.set("/sensorData/Voltaje_RMS", voltaje);
      json.set("/sensorData/Corriente_RMS", corriente);
      json.set("/sensorData/Potencia_RMS", potencia);
      json.set("/sensorData/Consumo_energetico", energia);
      Firebase.updateNode(MonitorFV, ruta, json);
    }

    sendToServer(voltaje, corriente, potencia, energia);
  }

  disconnectWiFi();

  tiempoUltimaMedicion = tiempoActual;
  delay(30000);
}
