const { usuarios, perfis } = require('../data/db')

module.exports = {

    ola() {
        return 'Basta retorna uma stringa'
    },
    horaAtual() {
        return new Date()
    },
    usuarioLogado() {
        return {
            id: 1,
            nome: "Marcelo",
            email: "marcelo@mail.com",
            idade: 25,
            salario_real: 11300.20,
            vip: true
        }
    },
    produtoEmDestaque() {
        return {
            nome: 'Notebook Gamer',
            preco: 4890.89,
            desconto: 0.15
        }
    },
    numerosMegaSena() {
        const crescente = (a, b) => a - b
        return Array(6).fill(0).map(() => parseInt(Math.random() * 60 + 1)).sort(crescente)
    },
    usuarios() {
        return usuarios
    },
    usuario(_, { id }) {
        const selecionados = usuarios.filter(x => x.id === id);
        return selecionados ? selecionados[0] : null
    },
    perfis() {
        return perfis
    },
    perfil(_, { id }) {
        const selecionados = perfis.filter(x => x.id === id);
        return selecionados ? selecionados[0] : null
    }
}