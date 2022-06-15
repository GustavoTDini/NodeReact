import { Router } from "express";
import accountsControler from "../controllers/accounts";
import {validateAccount, validateLogin, validateUpdate, validateAuth} from "./validate";

const router = Router();

router.get('/accounts/', validateAuth, accountsControler.getAccounts);

router.get('/accounts/:id', validateAuth, accountsControler.getAccount);

router.post('/accounts/', validateAuth, validateAccount, accountsControler.addAccount)

router.patch('/accounts/:id', validateUpdate, accountsControler.setAccount)

router.post('/accounts/login/', validateLogin, accountsControler.loginAccount)

router.post('/accounts/logout/',validateAuth, accountsControler.logoutAccount)

export default router;