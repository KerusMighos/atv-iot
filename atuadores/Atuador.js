export class Atuador {
    constructor(nome){
        this.nome = nome;
        this.potencia = 0;
    }

    updatePotencia(potencia){
        this.potencia = potencia;
        console.log(`Potencia atualizada para: ${this.potencia}%`);
    }

    getPotencia(potencia){
        return this.potencia;
    }
}