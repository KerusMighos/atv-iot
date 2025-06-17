import { AmqpConn } from "./AmqpConn.js";
import fs from 'fs';
import { getTlsFiles } from "./tls.js";
import { Atuador } from "./Atuador.js";

// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

process.on("SIGINT", () => {
    console.log("🛑 Encerrando o processo...");
    process.exit(0);
});

// Atraso para esperar o rabbitmq iniciar
await new Promise(resolve => setTimeout(resolve, 20000));

const node_name = process.env.NODE_NAME;







const conn = new AmqpConn(node_name);

conn.connect({...getTlsFiles(node_name), queueName: `${node_name}`})

const atuador = new Atuador(node_name);

conn.consume((msg) => {
    const content = JSON.parse(msg.content.toString());

    if (content.potencia !== undefined) {
        atuador.updatePotencia(content.potencia);
        console.log(`🔧 Potência atualizada para: ${atuador.getPotencia()}`);
    } else {
        console.warn(`⚠️ Mensagem sem campo 'potencia':`, content);
    }
})





