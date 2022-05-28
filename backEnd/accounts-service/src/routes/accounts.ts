import { Router, Request, Response } from "express";
import accountsControler from "../controllers/accounts";

const router = Router();

router.get('/accounts/', accountsControler.getAccounts);

router.get('/accounts/:id', accountsControler.getAccount);

router.post('/accounts/', accountsControler.addAccount)

export default router;