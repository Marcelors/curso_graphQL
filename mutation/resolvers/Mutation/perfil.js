const { perfis, proximoId } = require('../../data/db')

function indicePerfis(filtro) {
    if (!filtro) return -1

    const { id, nome } = filtro
    if (id) {
        return perfis.findIndex(u => u.id === id)
    } else if (nome) {
        return perfis.findIndex(u => u.nome === nome)
    }
    return -1;
}

module.exports = {
    novoPerfil(_, { dados }) {
        const nomeExistente = perfis.some(x => x.nome === dados.nome);

        if (nomeExistente) {
            throw new Error('Perfil já cadastrado')
        }

        const novo = {
            id: proximoId(),
            ...dados,
        }
        perfis.push(novo);

        return novo;
    },
    excluirPerfil(_, { filtro }) {
        const i = indicePerfis(filtro)

        if (i < 0) {
            return null;
        }

        const excluidos = perfis.splice(i, 1)
        return excluidos ? excluidos[0] : null
    },
    alterarPerfil(_, { filtro, dados }) {
        const i = indicePerfis(filtro);

        if (i < 0) {
            null;
        }

        const perfil = {
            ...perfis[i],
            ...dados
        }

        perfis.splice(i, 1, perfil)
        return perfil
    }
}