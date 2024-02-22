// Imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = express();

const userModel = require("./models/user.model");

// Config JSON
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// Middlewares
app.use(express.static("web"));
app.use((req, res, next) => {
  console.log(`Request Type: ${req.method}`);
  console.log(`Content Type: ${req.headers["content-type"]}`);
  console.log(`Date: ${new Date()}`);

  next();
});

// rota pública - rota aberta - página login
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/web/login/login.html");
});

// rotas privadas - rota fechada
app.get("/Home?:user", (req, res) => {
  const user = req.params.user;
  res.sendFile(__dirname + "/web/home/home.html");
});

app.post("/user/:user", checkToken, async (req, res) => {
  const user = req.params.user;

  // Checar se usuário existe
  const usuario = await userModel.findOne(
    {
      user: user,
    },
    "- senha -email"
  );

  if (!usuario) {
    return res.status(404).json({
      msg: "Usuário não encontrado",
    });
  }
  res.status(200).json({ usuario });
});

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      msg: "Acesso negado",
    });
  }

  try {
    const Segredo = process.env.SEGREDO;
    jwt.verify(token, Segredo);

    next();
  } catch (error) {
    res.status(400).json({
      msg: "Token invalido!",
    });
  }
}

// rotas da API
const authRoute = require("./routes/authRoute");
app.use("/auth", authRoute);

// Entregar porta
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const database = "bancoUsers";

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@aulaneogrid.8j0uizy.mongodb.net/${database}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conectado ao MongoDB com sucesso!");
    app.listen(8080);
  })
  .catch((err) => console.log(err));
