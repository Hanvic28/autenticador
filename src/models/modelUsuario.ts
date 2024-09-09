import { dbconn } from './conexao';
import { Usuario } from '../@types/usuario';
import md5 from 'md5';

export class ModelUsuario {
	async insereUsuario(usuario: Usuario): Promise<number[]> {
		const retorno: number[] = await dbconn('usuario').insert({ nome: usuario.nome, senha: md5(usuario.senha), rep_senha: md5(usuario.rep_senha)});
		return retorno;
	}

	async Login(usuario: Usuario): Promise<Usuario[]> {
		const retorno: Usuario[] = await dbconn('usuario').select().where({ nome: usuario.nome});
		return retorno;
	}
}
