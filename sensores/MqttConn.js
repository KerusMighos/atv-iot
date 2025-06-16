import mqtt from 'mqtt';

class MqttConn {
    constructor(node_name) {
        this.node_name = node_name;
        this.client = null;
    }

    async connect({ca, key, cert}) {

        const options = {
            clientId: this.node_name,
            host: 'mosquitto',
            port: 8883,                         // Porta segura com TLS
            protocol: 'mqtts',                  // MQTT over TLS
            rejectUnauthorized: true,           // Confirma que o certificado do servidor deve ser válido
            ca,
            key,
            cert,
        };

        this.client = mqtt.connect(options);


        return new Promise((resolve, reject) => {
            this.client.on('connect', () => {
                console.log(`🔗 Conectado com sucesso no nó ${this.node_name} via TLS!`);
                resolve();
            });

            this.client.on('error', (err) => {
                console.error(`❌ Erro de conexão no nó ${this.node_name}:`, err);
                reject(err);
            });
        });


    }

    publish(topic, message, qos = 1) {

        if (this.client) {

            this.client.publish(topic, message, { qos }, (err) => {
                if (err) {
                    console.error(`❌ Erro ao publicar no nó ${this.node_name}:`, err);
                } else {
                    console.log(`📤 Mensagem publicada no nó ${this.node_name}:`, message);
                }
            });
        } else {
            console.error(`❌ Cliente MQTT não conectado no nó ${this.node_name}.`);
        }
    }
}

export default MqttConn;