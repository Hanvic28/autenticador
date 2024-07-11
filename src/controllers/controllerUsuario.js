const ModelUsuario = require('../models/modelUsuario.js');
const knex = require('../models/conexão.js');
const Joi = require('joi')

class UsuarioController{

    async InsereUsuario(req, res){

        try{

            await validaEntrada(req.body);

            if(selecionaUsuario(req.body)){
                res.status(400).send({status:"NOK", messagem: "Usuario já cadastrado"})
                return ""
            };

            const modelUsuario = new ModelUsuario();
            const retorno = await modelUsuario.insereUsuario(req.body);

            console.log(req.body)
            res.status(201).send({status:"Ok", message:"Usuario Cadastrado com sucesso"})

        }catch(err){
            res.status(400).send({status:"NOK", messagem: err.message})
        }
    }

    async Login(req, res){

            try{
                await validaLogin(req.body);

                const modelUsuario = new ModelUsuario();
                const retorno = await modelUsuario.Login(req.body);

                if(!selecionaUsuario(req.body)){
                    console.log(retorno.length)
                }

                res.status(200).send({status:"OK", message:"Usuario Logado"})
            }catch(err){
                res.status(401).send({status:"NOK", message: err.message})
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

        if(dadosEntrada.senha !== dadosEntrada.rep_senha){
            throw new Error("senha não se batem")

        };

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

async function selecionaUsuario(usuario){

    try{
        const modelUsuario = new ModelUsuario();
        const retorno = await modelUsuario.Login(usuario);


        if(retorno.length == 0){

           return false
        };

        return true
    }catch(err){
        throw new Error("Banco de dados não logado")
    }
};

        



module.exports = UsuarioController