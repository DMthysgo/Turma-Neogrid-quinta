const http = require("http");

const port = 8080;

const server = http.createServer((req, res) => {
  if (req.url === "/home") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1> Bem vindo a Home Page! <h1>");
  }
  if (req.url === "/users") {
    const users = [
      {
        name: "Thyago",
        email: "thyago@gmail.com",
      },
      {
        name: "John Doe",
        email: "john@doe.com",
      },
    ];
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  }
});

server.listen(port, () => console.log(`Rodando na porta ${port}!`));
