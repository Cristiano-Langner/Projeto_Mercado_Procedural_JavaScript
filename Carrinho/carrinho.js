const fs = require('fs');

class CarrinhoCompras {
    constructor() {
        this.produtosCarrinho = {}; // Dicionário para armazenar os produtos no carrinho de compras
    }

    adicionarProdutos(produtos, codigo, quantidade) {
        if (codigo in produtos) {
            if (quantidade > 0) {
                if (codigo in this.produtosCarrinho) {
                    this.produtosCarrinho[codigo] += quantidade;
                } else {
                    this.produtosCarrinho[codigo] = quantidade;
                }
                console.log("Produto adicionado ao carrinho!");
            } else {
                throw new Error("A quantidade deve ser maior que zero!\n");
            }
        } else {
            throw new Error("O produto está fora de estoque!\n");
        }
    }

    // Função para mostrar o carrinho de compras
    mostrarCarrinho(produtos) {
        console.log("\n=== Carrinho de compras ===");
        for (const codigo in this.produtosCarrinho) {
            const quantidade = this.produtosCarrinho[codigo];
            const { nome, valor } = produtos[codigo];
            console.log(`Produto: ${nome} - Quantidade: ${quantidade} - Valor unidade: R$${valor}`);
        }
        console.log("\n");
    }

    // Função para calcular o total e apresentar os valores
    calcularTotal(produtos) {
        let total = 0;
        for (const codigo in this.produtosCarrinho) {
            const quantidade = this.produtosCarrinho[codigo];
            const { nome, valor } = produtos[codigo];
            const subtotal = valor * quantidade;
            total += subtotal;
            console.log(`${nome} - Quantidade: ${quantidade} - Subtotal: R$${subtotal.toFixed(2)}`);
        }
        return total;
    }

    // Função para gerar a NF da compra e salvar em arquivo csv
    notaFiscal(produtos, arquivo, pagamento) {
        let total = 0;
        const writeStream = fs.createWriteStream(arquivo);
        writeStream.write("Nome, Quantidade, Subtotal\n");
        for (const codigo in this.produtosCarrinho) {
            const quantidade = this.produtosCarrinho[codigo];
            const { nome, valor } = produtos[codigo];
            const subtotal = valor * quantidade;
            total += subtotal;
            writeStream.write(`${nome} - Quantidade: ${quantidade} - Subtotal: R$${subtotal.toFixed(2)}\n`);
        }
        if (pagamento === 1 || pagamento === 3) {
            const desconto = total * 0.05;
            total = total * (1 - 0.05);
            writeStream.write(`Desconto aplicado: R$ ${desconto.toFixed(2)}\n`);
            writeStream.write(`Total da compra: R$ ${total.toFixed(2)}\n`);
        } else {
            writeStream.write(`Total da compra: R$ ${total.toFixed(2)}\n`);
        }
        writeStream.end();
    }
}

module.exports = CarrinhoCompras;
