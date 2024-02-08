const mongoose = require("mongoose");

const BolsaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  colecao: {
    type: String,
    required: true,
  },
  valor: {
    type: Number,
    required: true,
    minlength: 50,
    maxlength: 300,
  },
  cor: {
    type: String,
    required: true,
  },
  estoque: {
    type: Boolean,
    required: true,
  },
});

const BolsaModel = mongoose.model("Bolsa", BolsaSchema);

module.exports = BolsaModel;
