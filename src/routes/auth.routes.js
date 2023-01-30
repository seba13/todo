

import {Router} from "express";
import {middlewareLocals, renderSignIn, renderSignUp, renderLogin, renderRegister, logout} from '../controllers/auth.controller.js'
import {redirectHome} from '../middlewares/home.middleware.js'
import {removeSession} from '../middlewares/session.middleware.js'
const router = Router();


router.post('/login',middlewareLocals, renderSignIn)

router.get('/login',redirectHome, renderLogin)


router.get('/register',redirectHome, renderRegister)
router.post('/register', renderSignUp)


router.get('/logout', removeSession, logout)

export default router;