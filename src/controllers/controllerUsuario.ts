import Joi from 'joi';
import { Request, Response } from 'express';
import { Usuario } from '../@types/usuario';
import { dbconn } from 'src/models/conexao';
import { ModelUsuario } from 'src/models/modelUsuario';
import { Criptografia } from 'src/uteis/criptografia';

export class UsuarioController {
	async InsereUsuario(req: Request, res: Response): Promise<any> {
		try {
			await validaEntrada(req.body);

			if (await selecionaUsuario(req.body)) {
				res.status(400).send({ status: 'NOK', messagem: 'Usuario já cadastrado' });
				return '';
			}

			const modelUsuario = new ModelUsuario();
			const retorno: number[] = await modelUsuario.insereUsuario(req.body);

			console.log(req.body);
			res.status(201).send({ status: 'Ok', message: 'Usuario Cadastrado com sucesso' });
		} catch (err) {
			console.log('Passei aqui');
			res.status(400).send({ status: 'NOK', messagem: err.message });
		}
	}

	async Login(req: Request, res: Response): Promise<any> {
		try {
			await validaLogin(req.body);

			const modelUsuario = new ModelUsuario();
			const retorno: Usuario[] = await modelUsuario.Login(req.body);

			if (!selecionaUsuario(req.body)) {
				console.log(retorno.length);
			}

			res.status(200).send({ status: 'OK', message: 'Usuario Logado' });
		} catch (err) {
			res.status(401).send({ status: 'NOK', message: err.message });
		}
	}
}

async function validaEntrada(dadosEntrada: Usuario): Promise<any> {
	try {
		const schema = Joi.object({
			nome: Joi.string().min(4).max(150).required(),
			senha: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
			rep_senha: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
		});

		if (dadosEntrada.senha !== dadosEntrada.rep_senha) {
			throw new Error('senha não se batem');
		}

		const value: Usuario = await schema.validateAsync(dadosEntrada);
	} catch (erro) {
		throw new Error('Erro de validação: ' + erro.message);
	}
}

async function validaLogin(dadosEntrada: Usuario): Promise<any> {
	try {
		const schema = Joi.object({
			nome: Joi.string().min(4).max(150).required(),
			senha: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
		});

		const value: Usuario = await schema.validateAsync(dadosEntrada);
	} catch (erro) {
		throw new Error('Erro de validação: ' + erro.message);
	}
}

async function selecionaUsuario(usuario: Usuario): Promise<any> {
	try {
		const modelUsuario = new ModelUsuario();
		const retorno: Usuario[] = await modelUsuario.Login(usuario);

		if (retorno.length == 0) {
			return false;
		}

		return true;
	} catch (err) {
		throw new Error('Banco de dados não logado');
	}
}
