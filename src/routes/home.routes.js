


import {Router} from 'express'
import {renderHome, updateUserCtrl } from '../controllers/home.controller.js'
import {redirectIndex, middlewareMulter, errorUpload} from "../middlewares/home.middleware.js"

import {validateUserDto} from '../utils/validations/validate-update-user-dto.js'

const router = Router()



router.get("/home",redirectIndex, renderHome)


router.post('/update-user',redirectIndex,middlewareMulter, errorUpload, updateUserCtrl)





export default router
