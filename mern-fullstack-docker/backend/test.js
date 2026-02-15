const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Servidor funcionando");
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Servidor en puerto 3000");
});
