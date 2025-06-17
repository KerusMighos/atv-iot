import amqplib from 'amqplib';
import fs from 'fs';

export class AmqpConn {

    constructor(node_name) {
        this.node_name = node_name;
        this.connection = null;
        this.channel = null;
    }



    async connect({ ca, key, cert, queueName }) {

        let trys = 10;
        const delay = 15000;

        console.log('CA: ', ca);
        

        const options = {
            protocol: 'amqps',
            hostname: 'rabbitmq',
            port: 5671,
            username: 'default',
            password: 'default',
            ca: fs.readFileSync('/tls/ca/ca.pem'),

            // key,
            // cert,
        };

        while (trys > 0) {

            try {
                this.connection = await amqplib.connect(options);
                this.channel = await this.connection.createChannel();
                await this.channel.assertQueue(queueName, { durable: true });
                console.log(`🔗 Conectado com sucesso no RABBITMQ!`);
                break;
            } catch (error) {
                console.log(`❌ Erro de conexão:`);
                console.log(error);
                trys--;
                if (trys > 0) {
                    console.log(`🔄 Tentando novamente em ${delay / 1000} segundos...`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                } else {
                    console.error(`❌ Falha ao conectar após várias tentativas.`);
                    throw error;
                }
            }


        }
    }

    consume(callback) {
        if (!this.channel) {
            console.error(`❌ Canal AMQP não está conectado no nó ${this.node_name}.`);
            return;
        }

        this.channel.consume(this.queueName, (msg) => {
            if (msg !== null) {
                console.log(`📥 Mensagem recebida no nó ${this.node_name}:`, msg.content.toString());
                callback(msg);
                this.channel.ack(msg);
            }
        }, { noAck: false });
    }

}