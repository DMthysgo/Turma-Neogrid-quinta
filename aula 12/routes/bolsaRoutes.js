const router = require("express").Router();

const BolsaModel = require("../models/Bolsa.model");

// Create - Criar o nosso Bolsa no sistema
router.post("/", async (req, res) => {
  // {nome: "Bolsa Chanel Couro vermelho", colecao: "Couro", valor: 5000, cor: "vermelho" estoque: true}
  const { nome, colecao, valor, cor, estoque } = req.body;

  if (!nome) {
    res.status(422).json({ error: "O nome é obrigatório!" });
    return;
  }
  if (!valor) {
    res.status(422).json({ error: "O valor é obrigatório!" });
    return;
  }

  const bolsa = {
    nome,
    colecao,
    valor,
    cor,
    estoque,
  };

  try {
    await BolsaModel.create(bolsa);

    res.status(201).json({ msg: "Bolsa criada com sucesso no sistema!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Read - Ler os bolsas no sistema
router.get("/", async (req, res) => {
  try {
    const Bolsas = await BolsaModel.find();

    res.status(200).json(Bolsas);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Read - Ler um bolsa no sitema
router.get("/:nome", async (req, res) => {
  const nome = req.params.nome;
  try {
    const Bolsa = await BolsaModel.findOne({ nome: nome });

    if (!Bolsa) {
      res.status(422).json({ msg: "Bolsa não encontrada no sistema" });
    }

    res.status(200).json(Bolsa);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Update - atualizar dados do sistema (PUT, PATCH)
router.patch("/:nome", async (req, res) => {
  const nomeurl = req.params.nome;
  const { nome, colecao, valor, cor, estoque } = req.body;

  const bolsa = {
    nome,
    colecao,
    valor,
    cor,
    estoque,
  };

  try {
    const updatedBolsa = await BolsaModel.updateOne({ nome: nomeurl }, bolsa);

    if (updatedBolsa.matchedCount === 0) {
      res.status(422).json({ msg: "Bolsa não encontrada no sistema!" });
      return;
    }

    res.status(200).json(bolsa);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Delete - Deletar um Bolsa do sistema
router.delete("/:nome", async (req, res) => {
  const nome = req.params.nome;
  const Bolsa = await BolsaModel.findOne({ nome: nome });

  if (!Bolsa) {
    res
      .status(422)
      .json({ msg: "Bolsa não encontrada, solicitação de apagar cancelada!" });
    return;
  }

  try {
    await BolsaModel.deleteOne({ nome: nome });

    res.status(200).json({ msg: "Bolsa deletada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
