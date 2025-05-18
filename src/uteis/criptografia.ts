
import { Usuario } from '../@types/usuario';
const bcrypt = require('bcrypt');
const saltRounds = 10;
const senha = 's0/\/\P4$$w0rD';
const outraSenha = 'not_bacon';

const hash = bcrypt.hashSync(senha, saltRounds);
bcrypt.compareSync(senha, hash); // true
bcrypt.compareSync(outraSenha, hash); // false

async function checaSenha(Usuario: any, password: any) {
    //... fetch user from a db etc.

    const match = await bcrypt.compare(password, Usuario.nome.passwordHash);

    if(match) {
        //login
    }

    //...
}

async function criptografia(senha: any){
    const hash = bcrypt.hashSync(senha, saltRounds);
}

criptografia(12345678900);