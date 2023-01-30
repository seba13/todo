import {Router} from 'express'
import { renderIndex } from '../controllers/index.controller.js'
import {redirectHome} from '../middlewares/home.middleware.js'
const indexRouter = Router()


indexRouter.get("/", redirectHome, renderIndex)


export  {indexRouter as default} ;