import bcrypt from 'bcryptjs';
import jwt, {VerifyOptions} from 'jsonwebtoken';
import fs from 'fs'

type Token = { accountId: number}

const privateKey = fs.readFileSync('./keys/private.key', 'utf8');
const publicKey = fs.readFileSync('./keys/public.key', 'utf8');
const jwtExpires = parseInt(`${process.env.JWT_EXPIRES}`);
const jwtAlgorithm = "RS256";

function hashpassword(password: string){
    return bcrypt.hashSync(password, 10);
}

async function comparePassword(passowrd: string, hashedPassword: string){
    return await bcrypt.compare(passowrd, hashedPassword);
}

function sign(accountId: number){
    const token: Token = {accountId};
    return jwt.sign(token, privateKey,{expiresIn: jwtExpires, algorithm: jwtAlgorithm})
}

async function verify(token: string){
    try{
        const decoded: Token = await jwt.verify(token, publicKey, {algorithm:[jwtAlgorithm]} as VerifyOptions) as Token;
        return { accountId: decoded.accountId}
    }catch(error){
        console.log (`Verify: ${error}`);
        return null;
    }
}

export default { hashpassword, comparePassword, sign, verify}