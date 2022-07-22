const express = require('express');
const app = express();

let produtos = require('./produtos');
app.use(express.json());

// Redireciona para a rota /produtos
app.get('/', (req, res) => {
    res.redirect('/produtos');
});

// Obter todos os produtos
app.get('/produtos', (req, res) => {
    return res.status(200).send(produtos);
});

// Obter um produto por ID
app.get('/produtos/:id', (req, res) => {
    const id = Number(req.params.id);

    const buscaPorID = produtos.find((produto) => produto.id === id)
    if(!buscaPorID) {
        return res.status(404).json({message: "Produto não encontrado!"})
    }

    return res.status(200).json(buscaPorID)
});

// Cadastrar um novo produto
app.post('/produtos', (req, res) => {
    const novoProduto = req.body;

    novoProduto.forEach((produto) => {
        produtos.push(produto);
    })
    
    return res.status(201).json({message: "Produto criado com sucesso!"})
});

// Atualizar um produto por ID
app.put('/produtos/:id', (req, res) => {
    const id = Number(req.params.id);
    const conteudo = req.body;

    const buscarProduto = produtos.findIndex((produto) => produto.id === id);
    produtos[buscarProduto] = conteudo;

    res.status(200).json({message: "Produto atualizado com sucesso!"});
})

// Deletar um produto por ID
app.delete('/produtos/:id', (req, res) => {
    const id = Number(req.params.id);

    const buscarProduto = produtos.findIndex((produto) => produto.id === id);
    produtos.splice(buscarProduto, 1);

    res.status(200).json({message: "Produto deletado com sucesso"});
})

app.listen(3000, () =>
    console.log('Servidor funcionando na porta 3000')
);