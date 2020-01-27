import {Router} from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import AppointmentController from './app/controllers/AppointmentController';
import FileController from './app/controllers/FileController';
import UserControler from './app/controllers/UsersController';
import ProvidersController from './app/controllers/ProvidersController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);
routes.post('/users', UserControler.store);
// somente as rotas abaixo do middleware que vai precisar do jwttoken;
routes.use(authMiddleware);
routes.put('/users/:id', UserControler.update);
routes.get('/users', UserControler.find);

routes.get('/providers', ProvidersController.index);

routes.post('/appointments', AppointmentController.store);

routes.post('/files', upload.single('file'), FileController.store);

module.exports = routes;
