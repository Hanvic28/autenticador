const md5 = require('md5');

class Criptografia {
	criptografia(dados) {
		return md5(dados);
	}
}

const cripto = new Criptografia();
const retorno = cripto.criptografia(12345678900);

console.log(retorno);

module.exports = Criptografia;
