import { Usuario } from '../@types/usuario';
import CryptoJs from 'crypto-js' 



export async function criptografia(dados: Usuario): Promise <any>{

    var criptoHash = CryptoJs.AES.encrypt(dados.nome, dados.senha).toString()
    console.log(criptoHash)
    return dados;
}

