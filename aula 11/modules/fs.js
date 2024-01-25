const fs = require("fs");
const path = require("path");

// Criar pasta
/*
fs.mkdir(path.join(__dirname, "/test"), (error) => {
  if (error) {
    return console.log("Erro: ", error);
  }
  console.log("Pasta criada com sucesso!");
});
*/

// Criar arquivo
fs.writeFile(
  path.join(__dirname, "/test", "test.txt"),
  "Olá turma esse é o arquivo TXT!",
  (error) => {
    if (error) {
      return console.log("Erro: ", error);
    }
    console.log("Arquivo criado com sucesso!");
  }
);

// Adicionar ao arquivo
fs.appendFile(
  path.join(__dirname, "/test", "test.txt"),
  " Isso é um teste... 1... 2... 3!",
  (error) => {
    if (error) {
      return console.log("Erro: ", error);
    }
    console.log("Arquivo editado com sucesso!");
  }
);

// Ler arquivo
fs.readFile(
  path.join(__dirname, "/test", "test.txt"),
  "utf-8",
  (error, data) => {
    if (error) {
      return console.log("Erro: ", error);
    }
    console.log(data);
  }
);
