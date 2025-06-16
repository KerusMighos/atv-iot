class SensorSimulado {
    constructor(nome, min, max, variacao) {
        this.nome = nome;
        this.min = min;
        this.max = max;
        this.variacao = variacao;
        this.valorAtual = this._random(min, max);
    }

    _random(min, max) {
        return Math.random() * (max - min) + min;
    }

    lerValor() {
        const delta = this._random(-this.variacao, this.variacao);

        let novoValor = this.valorAtual + delta;

        // Limita o valor ao intervalo permitido
        novoValor = Math.min(this.max, Math.max(this.min, novoValor));

        this.valorAtual = novoValor;
        return parseFloat(novoValor.toFixed(2));
    }
}

export default SensorSimulado;