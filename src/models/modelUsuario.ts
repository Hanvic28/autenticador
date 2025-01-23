import { dbconn } from './conexao';
import { Usuario } from '../@types/usuario';
import md5 from 'md5';
import CryptoJs from 'crypto-js' 
import { criptografia } from 'src/uteis/criptografia';

export class ModelUsuario {

	 async insereUsuario(usuario: Usuario): Promise<number[]> {
		criptografia(usuario)
	 	const retorno: number[] = await dbconn('usuario').insert({ nome: usuario.nome, senha: usuario.senha, rep_senha: usuario.senha });
	 	return retorno;
	 }

	async Login(usuario: Usuario): Promise<Usuario[]> {
		const retorno: Usuario[] = await dbconn('usuario').select().where({ nome: usuario.nome});
		return retorno;
	}
}
