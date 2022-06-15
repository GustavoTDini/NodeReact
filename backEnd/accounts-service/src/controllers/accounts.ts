import{Request, Response} from 'express';
import {IAccount} from '../models/account'
import accountRepository from '../models/accountModel';
import auth from '../auth';

async function getAccounts(req: Request, res: Response, next: any){
    const accounts = await accountRepository.findAllAccounts();
    
    res.json(accounts.map(item =>{
        item.password = '';
        return item;
    }));
    res.status(200).end();
}

async function getAccount(req: Request, res: Response, next: any){
    try{
        const id = parseInt(req.params.id);
        if (!id) {
            throw new Error('Id is not a number!');
        }
        const account = await accountRepository.findAccount(id) as IAccount;
        if (account === null){
            return res.status(404).end()
        } else{
            account.password = '';
            res.json(account)
            res.status(200).end();
        }
    }catch(error){
        console.log(error);
        res.status(400).end();
    }
}

async function addAccount(req: Request, res: Response, next: any){
    try{
        const newAccount = req.body as IAccount;
        newAccount.password = auth.hashpassword(newAccount.password);
        const result = await accountRepository.addAccount(newAccount);
        newAccount.password = '';
        newAccount.id = result.id;
        res.status(201).json(newAccount);
    }catch(error){
        console.log(error);
        res.status(400).end();
    }
}

async function setAccount(req: Request, res: Response, next: any){
    try{
        const accountId = parseInt(req.params.id)
        if (!accountId) {
            throw new Error('Id is not a number!');
        }
        const accountParams = req.body as IAccount;
        accountParams.password = auth.hashpassword(accountParams.password);
        const updatedAccount = await accountRepository.setAccount(accountId, accountParams);
        updatedAccount.password = '';
        res.status(200).json(updatedAccount);
        
    
    }catch(error){
        console.log(error);
        res.status(400).end();
    }
}

async function loginAccount(req: Request, res: Response, next: any){
    try{
        const loginParams = req.body as IAccount;
        const account = await accountRepository.findByEmail(loginParams.email);
        if (account !== null){
            const isValid = await auth.comparePassword(loginParams.password, account.password);
            if (isValid){
                const token = auth.sign(account.id!);
                res.json({auth: true, token});
            }
        } 
        return res.status(401).end();   
    }catch(error){
        console.log(error);
        res.status(400).end();
    }
}

function logoutAccount(req: Request, res: Response, next: any){
    res.json({auth: false, token: null});

}


export default { getAccounts, getAccount, addAccount, setAccount, loginAccount, logoutAccount}