function verificaOpcao(opcao) {
    if (opcao < 1 || opcao > 4) {
        throw new Error("Escolha uma das opções disponíveis!\n");
    }
}

async function formaPagamento() {
    try {
        const pagamento = parseInt(await getInput("1. Débito.\n2. Crédito.\n3. Dinheiro.\nInforme a forma de pagamento: "));
        if (![1, 2, 3].includes(pagamento)) {
            throw new Error("Opção de pagamento inválida!");
        }
        if (pagamento === 1 || pagamento === 3) {
            console.log("Pagamento no débito/dinheiro selecionado.");
            console.log("Adicionado desconto de 5%!");
            console.log("Imprimindo NF...\n");
        } else if (pagamento === 2) {
            console.log("Pagamento no crédito selecionado.");
            console.log("Imprimindo NF...\n");
        }
        return pagamento; // Retorna a opção de pagamento escolhida
    } catch (error) {
        console.error("Erro!", error);
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

module.exports = { verificaOpcao, formaPagamento };