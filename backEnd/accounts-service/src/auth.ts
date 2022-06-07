import bcrypt from 'bcryptjs';

function hashpassword(password: string){
    return bcrypt.hashSync(password, 10);
}

function comparePassword(passowrd: string, hashedPassword: string){
    return bcrypt.compare(passowrd, hashedPassword);
}

export default { hashpassword, comparePassword}