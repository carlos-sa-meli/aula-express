const express = require('express');
const app = express();
const rotaProdutos = require('./routes/rotaProdutos');

app.use(express.json());

app.use('/produtos', rotaProdutos);

app.use('/*', (req, res, next) => {
    res.send('Erro 404: Página não encontrada!')
});

app.listen(3000, () =>
    console.log('Servidor funcionando na porta 3000')
);