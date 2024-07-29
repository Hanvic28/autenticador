import md5 from 'md5';

export class Criptografia {
	criptografia(dados: string) {
		return md5(dados);
	}
}