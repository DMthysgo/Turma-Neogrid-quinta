// Config inicial (requires)
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

// Forma de ler JSON / Middlewares
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Request Type: ${req.method}`);
  console.log(`Content Type: ${req.headers["content-type"]}`);
  console.log(`Date: ${new Date()}`);
  next();
});

// rotas da API
const funkoRoutes = require("./routes/funkoRoutes");

app.use("/funko", funkoRoutes);

// rotas iniciais / endpoints
app.get("/", (req, res) => {
  res.json({ msg: "Teste de express!" });
});

// entregar uma porta / iniciar servidor
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const database = "bancoAPI";

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@aulaneogrid.8j0uizy.mongodb.net/${database}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conectado ao MongoDB Atlas com sucesso!");
    app.listen(8080);
  })
  .catch((err) => console.log(err));
