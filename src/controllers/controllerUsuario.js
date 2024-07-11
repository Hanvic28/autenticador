const ModelUsuario = require('../models/modelUsuario.js');
const knex = require('../models/conexão.js');
const Joi = require('joi')

class UsuarioController{

      async InsereUsuario(req, res){

         await validaEntrada(req.body);

             const modelUsuario = new ModelUsuario();
             const retorno = await modelUsuario.insereUsuario(req.body);

         console.log(req.body)
        res.status(201).send("Usuario Cadastrado")

        }

        async Login(req, res){

            try{
                await validaLogin(req.body);

                const modelUsuario = new ModelUsuario();
                const retorno = await modelUsuario.Login(req.body);

                console.log(req.body)
                res.status(200).send({status:"OK", message:"Usuario Logado"})
            }catch(err){
                res.status(401).send({status:"NOK", message:"Usuario Não Autenticado"})
            }
       }
   
}   


    
async function validaEntrada (dadosEntrada){
    
    try{

        const schema = Joi.object({
             nome: Joi.string().min(4).max(150).required(),
             senha: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
             rep_senha: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        }
        )
            const value = await schema.validateAsync(dadosEntrada);

        }catch(erro){

            throw new Error('Erro de validação: ' + erro.message)
    }
    
    }


    async function validaLogin (dadosEntrada){

        try{
    
            const schema = Joi.object({
            nome: Joi.string().min(4).max(150).required(),
            senha: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    
            }
        )
    
            const value = await schema.validateAsync(dadosEntrada);
    
            }catch(erro){
    
                throw new Error('Erro de validação: ' + erro.message)
            }
        
    
        }

        



module.exports = UsuarioController