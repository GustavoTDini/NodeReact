import { Router, Request, Response } from "express";
import accountsControler from "../controllers/accounts";
import { accountSchema } from "../models/account";

function validateAccount(req: Request, res: Response, next: any){
    const{error} = accountSchema.validate(req.body);
    if (error == null) {
        return next()
    }

    const {details} = error;
    const message = details.map(item => item.message).join(',');

    console.log(message)
    res.status(422).end()

}

const router = Router();

router.get('/accounts/', accountsControler.getAccounts);

router.get('/accounts/:id', accountsControler.getAccount);

router.post('/accounts/', validateAccount, accountsControler.addAccount)

export default router;