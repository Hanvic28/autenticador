const knex = require('../models/conexão');

class ModelUsuario {

    async insereUsuario(usuario){
        
        const retorno = await knex('usuario').insert({nome: usuario.nome, senha: usuario.senha});
        return retorno
    }

    async Login(usuario){

        const retorno = (await knex('usuario').select().where({nome: usuario.nome, senha: usuario.senha}))
        return retorno
    }

}

module.exports = ModelUsuario;