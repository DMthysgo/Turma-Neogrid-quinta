const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../models/user.model");

// Registro
router.post("/cadastro", async (req, res) => {
  // {user : "dmthysgo", email: "thyago@gmail.com", senha: "12345678"}
  const { user, email, senha } = req.body;

  const emailExiste = await userModel.findOne({
    email: email,
  });

  if (emailExiste) {
    return res.status(422).json({
      msg: "Email já cadastro, tente com um email diferente ou faça login!",
    });
  }

  const userExiste = await userModel.findOne({
    user: user,
  });

  if (userExiste) {
    return res.status(422).json({
      msg: "Usuário já cadastro, tente um usúario diferente.",
    });
  }

  const salt = await bcrypt.genSalt(12);
  const senhaHash = await bcrypt.hash(senha, salt);

  const usuario = new userModel({
    user,
    email,
    senha: senhaHash,
  });

  try {
    await usuario.save();
    res.status(201).json({
      msg: "Usuário cadastro com sucesso!",
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { user, senha } = req.body;

  // validações de dados recibidos
  if (!user) {
    return res.status(422).json({
      msg: "Usuário é obrigatorio!",
    });
  }
  if (!senha) {
    return res.status(422).json({
      msg: "Senha é obrigatoria!",
    });
  }

  // checar se usuário existe
  const usuario = await userModel.findOne({
    user: user,
  });
  if (!usuario) {
    return res.status(404).json({
      msg: "Usuário não encontrado!",
    });
  }
  // checar se senha é compativel
  const valida_senha = await bcrypt.compare(senha, usuario.senha);
  if (!valida_senha) {
    return res.status(422).json({
      msg: "Senha invalida!",
    });
  }

  try {
    const Segredo = process.env.SEGREDO;
    const token = jwt.sign(
      {
        user: user.user,
      },
      Segredo
    );

    res.status(200).json({
      msg: "Login realizado com sucesso!",
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
