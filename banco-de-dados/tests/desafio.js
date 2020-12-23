const db = require('../config/db')

async function salvarUsuario(nome, email, senha) {
    let usuario = await db('usuario')
        .where({ email })
        .first()

    if (!usuario) {
        let [id] = await db('usuario').insert({ nome, email, senha })
        usuario = await db('usuario').where({ id }).first()
        return usuario;
    }

    await db('usuario').where({ id: usuario.id })
        .update({ nome, email, senha })

    usuario = { ...usuario, nome, email, senha }
    return usuario;
}

async function salvarPerfil(nome, rotulo) {
    let perfil = await db('perfis')
        .where({ nome })
        .first()

    if (!perfil) {
        let [id] = await db('perfis').insert({ nome, rotulo })
        perfil = await db('perfis').where({ id }).first()
        return perfil
    }

    await db('perfis').where({ id: perfil.id })
        .update({ nome, rotulo })

    perfil = { ...perfil, nome, rotulo }
    return perfil
}

async function adicionarPerfis(usuario, ...perfis) {
    const usuario_id = usuario.id;
    await db('usuario_perfis').where({ usuario_id }).delete()

    for (perfil of perfis) {
        const perfil_id = perfil.id;
        await db('usuario_perfis').insert({ usuario_id, perfil_id })
    }
}

async function executar() {
    const usuario = await salvarUsuario('Ana',
        'ana@empresa.com.br', '123456')
    const perfilA = await salvarPerfil('rh', 'Pessoal')
    const perfilB = await salvarPerfil('fin', 'Financeiro')

    console.log(usuario)
    console.log(perfilA)
    console.log(perfilB)

    await adicionarPerfis(usuario, perfilA, perfilB)
}

executar()
    .catch(err => console.log(err))
    .finally(() => db.destroy())