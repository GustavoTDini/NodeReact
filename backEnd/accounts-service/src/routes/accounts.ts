import { Router } from "express";
import accountsControler from "../controllers/accounts";
import {validateAccount, validateLogin} from "./validate";

const router = Router();

router.get('/accounts/', accountsControler.getAccounts);

router.get('/accounts/:id', accountsControler.getAccount);

router.post('/accounts/', validateAccount, accountsControler.addAccount)

router.patch('/accounts/:id', validateAccount, accountsControler.setAccount)

router.post('/accounts/login/', validateLogin, accountsControler.loginAccount)

router.post('/accounts/logout/', accountsControler.logoutAccount)

export default router;