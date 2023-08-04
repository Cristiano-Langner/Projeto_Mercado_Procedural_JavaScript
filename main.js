const { carregarProdutos, listarProdutos } = require('./Estoque/estoque');
const { opcoes } = require('./Opcoes/opcoes');

// Função principal.
async function main() {
    try {
        const { produtos, tamanhoEstoque } = await carregarProdutos("Estoque/produtos.csv");
        console.log("\n=================== Sejam Bem Vindos ao Mercado Jcavi ====================");
        console.log(`=== No momento contamos com uma variedade de ${tamanhoEstoque} itens em nosso estoque ===\n`);
        listarProdutos(produtos);
        const continuar = true;
        await opcoes(continuar);
    } catch (error) {
        console.error("Ocorreu um erro:", error);
    }
}

main(); // Chama a função principal