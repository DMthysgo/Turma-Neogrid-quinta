class Pessoa {
  constructor(nome) {
    this.nome = nome;
  }
  digaMeuNome() {
    return `Meu nome é ${this.nome}!`;
  }
}

module.exports = {
  Pessoa,
};
