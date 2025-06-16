
# Passos para gerar as chaves tls

## Gerar par de chaves para a Autoridade Certificadora

##### Gera uma chave privada:

`openssl genrsa -out ca.key 4096`

##### Gera uma chave publica auto assinada:

`openssl req -x509 -new -nodes -key ca.key -sha256 -days 3650 -out ca.crt`


## Gerar par chaves para os serviços:

Para cada serviço, execute os comandos abaixo para gerar um par exclusivo por serviço

Substitua a paravra `servico` nos comandos pelo nome do servico

##### Gera uma chave privada para o serviço

`openssl genrsa -out servico.key 2048`

##### Gera uma chave publica para o serviço, e embuti ela em uma requisição de assinatura, com o objetivo de ser assinada pela CA

`openssl req -new -key servico.key -out servico.csr`

##### Usando a chave privada da CA, assina a requisição anterior

`openssl x509 -req -in servico.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out servico.crt -days servico -sha256`

