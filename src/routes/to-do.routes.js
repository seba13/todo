import {Router} from 'express'
import {renderHome } from '../controllers/home.controller.js'
import {redirectIndex} from "../middlewares/home.middleware.js"
import { renderTodo } from '../controllers/to-do.controllers.js'
const router = Router()



router.get('/to-do', redirectIndex, renderTodo)



export default router