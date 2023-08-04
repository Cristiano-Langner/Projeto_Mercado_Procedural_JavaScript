const { carregarProdutos } = require('../Estoque/estoque');
const CarrinhoCompras = require('../Carrinho/carrinho');
const { verificaOpcao, formaPagamento } = require('../Verificador/verificar');

async function opcoes(continuar) {
    const { produtos, tamanhoEstoque } = await carregarProdutos("Estoque/produtos.csv");
    const carrinhoCompras = new CarrinhoCompras();

    while (true) {
        try {
            console.log("\n1. Comprar produtos");
            console.log("2. Ver carrinho");
            console.log("3. Concluir compra");
            console.log("4. Sair");
            const opcao = parseInt(await getInput("Escolha uma opção: "));
            verificaOpcao(opcao);

            if (opcao === 1) {
                const codigo = await getInput("Digite o código do produto: ");
                if (isNaN(codigo) || !Number.isInteger(+codigo)) {
                    throw new TypeError("Escolha um dos produtos disponíveis!\n");
                } else if (1 <= parseInt(codigo) && parseInt(codigo) <= tamanhoEstoque) {
                    const quantidade = parseInt(await getInput("Digite a quantidade: "));
                    carrinhoCompras.adicionarProdutos(produtos, codigo, quantidade);
                } else {
                    throw new ValueError("O produto está fora de estoque!\n");
                }
            } else if (opcao === 2) {
                carrinhoCompras.mostrarCarrinho(produtos);
            } else if (opcao === 3) {
                const total = carrinhoCompras.calcularTotal(produtos);
                if (total > 0) {
                    console.log("Total da compra: R$", total, "\n");
                    const pagamento = await formaPagamento(produtos);
                    carrinhoCompras.notaFiscal(produtos, "Nota_Fiscal.csv", pagamento);
                    const novaCompra = await getInput("Se deseja realizar outra compra tecle letra 'y': ");
                    if (novaCompra.toLowerCase() !== 'y') {
                        return false;
                    }
                } else {
                    console.log("O carrinho está vazio! Por favor, selecione os produtos desejados.");
                }
            } else if (opcao === 4) {
                console.log("Compra cancelada. Saindo do sistema...");
                return false;
            }
        } catch (error) {
            console.log("\nErro!", error);
        }
    }
}

// Função auxiliar para simular entrada de dados via terminal no Node.js
function getInput(prompt) {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question(prompt, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

module.exports = { opcoes };