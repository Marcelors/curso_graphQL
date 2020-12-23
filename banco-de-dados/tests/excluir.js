const db = require('../config/db')

// db('usuario')
//     .where({ id: 1 })
//     .delete()
//     .then(res => console.log(res))
//     .finally(() => db.destroy())

db('perfis')
    .delete()
    .then(res => console.log(res))
    .finally(() => db.destroy())