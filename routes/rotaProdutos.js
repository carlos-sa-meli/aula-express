const express = require('express');
const routes = express.Router();
let produtos = require('../produtos');

routes.use(express.json());

// Obter todos os produtos
routes.get('/', (req, res) => {
    return res.status(200).send(produtos);
});

// Obter um produto por ID
routes.get('/:id', (req, res) => {
    const id = Number(req.params.id);

    const buscaPorID = produtos.find((produto) => produto.id === id)
    if(!buscaPorID) {
        return res.status(404).json({message: "Produto não encontrado!"})
    }

    return res.status(200).json(buscaPorID)
});

// Cadastrar um novo produto
routes.post('/', (req, res) => {
    const novoProduto = req.body;

    novoProduto.forEach((produto) => {
        produtos.push(produto);
    })
    
    return res.status(201).json({message: "Produto criado com sucesso!"})
});

// Atualizar um produto por ID
routes.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const conteudo = req.body;

    const buscarProduto = produtos.findIndex((produto) => produto.id === id);
    produtos[buscarProduto] = conteudo;

    res.status(200).json({message: "Produto atualizado com sucesso!"});
})

// Deletar um produto por ID
routes.delete('/:id', (req, res) => {
    const id = Number(req.params.id);

    const buscarProduto = produtos.findIndex((produto) => produto.id === id);
    produtos.splice(buscarProduto, 1);

    res.status(200).json({message: "Produto deletado com sucesso"});
})

module.exports = routes;