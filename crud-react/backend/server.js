// Importa o express
const express = require('express');
// Cria o servidor
const app = express();
// Define a porta
const porta = 3000;
// Rota inicial (teste)
app.get('/', (req, res) => {
res.send('Servidor funcionando!');
});
// Liga o servidor
app.listen(porta, () => {
console.log(`Servidor rodando em http://localhost:${porta}`);
});