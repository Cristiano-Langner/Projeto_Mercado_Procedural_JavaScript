const csv = require('csv-parser');
const fs = require('fs');

async function carregarProdutos(arquivo) {
    const produtosEstoque = {};
    return new Promise((resolve, reject) => {
        fs.createReadStream(arquivo)
            .pipe(csv())
            .on('data', (row) => {
                const codigo = row["codigo"];
                const nome = row["nome"];
                const valor = parseFloat(row["valor"]);
                produtosEstoque[codigo] = { nome, valor };
            })
            .on('end', () => {
                const tamanhoEstoque = Object.keys(produtosEstoque).length;
                resolve({ produtos: produtosEstoque, tamanhoEstoque });
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

// Função para mostrar os produtos do carrinho.
function listarProdutos(produtos) {
    console.log("====== PRODUTOS ======");
    console.log("Código, Nome, Preço");
    for (const codigo in produtos) {
        const { nome, valor } = produtos[codigo];
        console.log(`${codigo}, ${nome}, R$${valor.toFixed(2)}`);
    }
    console.log("=====================");
}

module.exports = { carregarProdutos, listarProdutos };