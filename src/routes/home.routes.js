


import {Router} from 'express'
import {renderHome } from '../controllers/home.controller.js'
import {redirectIndex} from "../middlewares/home.middleware.js"
const router = Router()



router.get("/home",redirectIndex, renderHome)




export default router
