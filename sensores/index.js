
import SensorSimulado from './SensorSimulado.js';
import MqttConn from './MqttConn.js';
import { getTlsFiles } from './tls.js';


process.on("SIGTERM", () => {
    console.log("🛑 Encerrando o processo...");
    process.exit(0);
});


const node_name = process.env.NODE_NAME;
const min = parseFloat(process.env.MIN_VALUE) || 0;
const max = parseFloat(process.env.MAX_VALUE) || 100;
const variacao = parseFloat(process.env.VARIATION) || 5;


const sensor = new SensorSimulado(node_name, min, max, variacao);

const mqttConn = new MqttConn(node_name);

await mqttConn.connect({ ...getTlsFiles(node_name) });

setInterval(() => {
    const data = sensor.lerValor();
    const payload = JSON.stringify({ from: node_name, time: new Date().toISOString(), ...data });

    mqttConn.publish(node_name, payload, 1);
}, 5000);