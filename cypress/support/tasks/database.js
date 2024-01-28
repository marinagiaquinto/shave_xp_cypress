const { Pool } = require('pg')

const dbConfig = {
    host: '',
    user: '',
    password: '',
    database: '',
    port: 5432

}

module.exports = {

    removeUser(email) {

        return new Promise(function (resolve) {
            const pool = new Pool(dbConfig)

            pool.query('DELETE FROM users WHERE email = $1', [email], function (error, result) {
                if (error) {
                    throw error
                }
                resolve({ success: result })
            })
        })
    }
}

//module é um objeto e "exports" é a propriedade desse objeto que permite exportar funções, 
//objetos e variáveis para outros módulos