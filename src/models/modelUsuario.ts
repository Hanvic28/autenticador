import { dbconn } from './conexao';
import { Usuario } from '../@types/usuario';
import bcrypt from "bcrypt";

const saltRounds = 10;
const senha = 's0/\/\P4$$w0rD';
const outraSenha = 'not_bacon';


export class ModelUsuario {

	 async insereUsuario(usuario: Usuario): Promise<number[]> {

		const hash = bcrypt.hashSync(senha, saltRounds);


		const retorno: number[] = await dbconn('usuario').insert({ nome: usuario.nome, senha: hash, rep_senha: hash });
		return retorno;

	 }

	async Login(usuario: Usuario): Promise<Usuario[]> {
		const retorno: Usuario[] = await dbconn('usuario').select().where({ nome: usuario.nome});
		const hash = bcrypt.hashSync(senha, saltRounds);

		bcrypt.compareSync(senha, hash);
		bcrypt.compareSync(outraSenha, hash);

		return retorno;
	}
}
