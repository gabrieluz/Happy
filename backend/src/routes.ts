import {Router} from 'express'
import multer from 'multer'

import uploadConfig from './config/upload'
import orphanagesController from './controllers/orphanagesController'

const upload = multer(uploadConfig)
const routes = Router()

routes.post('/orphanages', upload.array('images') ,orphanagesController.create)
routes.get('/orphanages', orphanagesController.index)
routes.get('/orphanages/:id', orphanagesController.show)

export default routes