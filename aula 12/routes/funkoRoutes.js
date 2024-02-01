const router = require("express").Router();

const FunkoModel = require("../models/Funko.model");

// Create - Criar o nosso Funko no sistema
router.post("/", async (req, res) => {
  // {nome: "Batman", colecao: "DC", valor: 100, estoque: true}
  const { nome, colecao, valor, estoque } = req.body;

  if (!nome) {
    res.status(422).json({ error: "O nome é obrigatório!" });
    return;
  }

  const funko = {
    nome,
    colecao,
    valor,
    estoque,
  };

  try {
    await FunkoModel.create(funko);

    res.status(201).json({ msg: "Funko criado com sucesso no sistema!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Read - Ler os funkos no sistema
router.get("/", async (req, res) => {
  try {
    const Funkos = await FunkoModel.find();

    res.status(200).json(Funkos);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Read - Ler um funko no sitema
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const Funko = await FunkoModel.findOne({ _id: id });

    if (!Funko) {
      res.status(422).json({ msg: "Funko não encontrado no sistema" });
    }

    res.status(200).json(Funko);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Update - atualizar dados do sistema (PUT, PATCH)
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { nome, colecao, valor, estoque } = req.body;

  const funko = {
    nome,
    colecao,
    valor,
    estoque,
  };

  try {
    const updatedFunko = await FunkoModel.updateOne({ _id: id }, funko);

    if (updatedFunko.matchedCount === 0) {
      res.status(422).json({ msg: "Funko não encontrado no sistema!" });
      return;
    }

    res.status(200).json(funko);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Delete - Deletar um Funko do sistema
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const Funko = await FunkoModel.findOne({ _id: id });

  if (!Funko) {
    res
      .status(422)
      .json({ msg: "Funko não encontrado, solicitação de apagar cancelada!" });
    return;
  }

  try {
    await FunkoModel.deleteOne({ _id: id });

    res.status(200).json({ msg: "Funko deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
