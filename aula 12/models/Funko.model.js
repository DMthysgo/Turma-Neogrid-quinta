const mongoose = require("mongoose");

const FunkoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  colecao: {
    type: String,
    required: false,
  },
  valor: {
    type: Number,
    required: true,
    minlength: 50,
    maxlength: 300,
  },
  estoque: {
    type: Boolean,
    required: true,
  },
});

const FunkoModel = mongoose.model("Funko", FunkoSchema);

module.exports = FunkoModel;
