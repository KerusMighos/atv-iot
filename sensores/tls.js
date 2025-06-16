import fs from 'fs';


export function getTlsFiles(node_name) {

    // Caminhos dos certificados
    const ca = fs.readFileSync('/tls/ca/ca.crt');
    const key = fs.readFileSync(`/tls/${node_name}/${node_name}.key`);
    const cert = fs.readFileSync(`/tls/${node_name}/${node_name}.crt`);

    return { ca, key, cert };
}