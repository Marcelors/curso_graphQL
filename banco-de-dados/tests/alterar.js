const db = require('../config/db')

const novoUsuario = {
    nome: 'Pedro',
    email: 'pedro@mail.com',
    senha: '12345678'
}

async function exercicio() {
    const { qtde } = await db('usuario').count('* as qtde').first()

    console.log(qtde)

    if (qtde === 0) {
        await db("usuario").insert(novoUsuario)
    }

    let { id } = await db('usuario').select('id').limit(1).first()

    await db('usuario').where({ id }).update({ nome: 'Pedro Garcia' })

    return await db('usuario').where({ id })
}

exercicio()
    .then(usuario => console.log(usuario))
    .finally(() => db.destroy())
