#!/bin/bash

# =========================
# Configurações
# =========================

# Lista de clientes/serviços
CLIENTS=("rabbitmq" "mosquitto" "node-red" "temperatura" "luminosidade" "umidade-solo" "exaustor" "irrigacao")

# Limpar pasta anterior
rm -rf tls/

# =========================
# Gerar CA (Autoridade Certificadora)
# =========================

echo "🔧 Gerando CA..."

mkdir -p tls/ca

openssl genrsa -out tls/ca/ca.key 4096

openssl req -x509 -new -nodes -key tls/ca/ca.key -sha256 -days 3650 -out tls/ca/ca.pem -subj "/CN=MinhaCA"

echo "✅ CA gerada em tls/ca"

# =========================
# Gerar certificados para cada cliente
# =========================

for CLIENT in "${CLIENTS[@]}"; do
    echo "🔧 Gerando certificados para: $CLIENT"

    mkdir -p "tls/$CLIENT"

    openssl genrsa -out "tls/$CLIENT/$CLIENT.key" 2048

    openssl req -new -key "tls/$CLIENT/$CLIENT.key" -out "tls/$CLIENT/$CLIENT.csr" -subj "/CN=$CLIENT"

    openssl x509 -req -in "tls/$CLIENT/$CLIENT.csr" -CA tls/ca/ca.pem -CAkey tls/ca/ca.key -CAcreateserial \
    -out "tls/$CLIENT/$CLIENT.pem" -days 825 -sha256

    rm "tls/$CLIENT/$CLIENT.csr"

    chmod 644 "tls/$CLIENT/$CLIENT.key"

    echo "✅ Certificados para $CLIENT gerados em tls/$CLIENT"
done

echo "🎉 Todos os certificados foram gerados com sucesso."
