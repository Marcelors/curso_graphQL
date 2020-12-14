module.exports = {
    precoComDesconto(produto) {
        return produto.desconto == null ? produto.preco : produto.preco - (produto.preco * produto.desconto)
    }
}