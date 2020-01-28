import {Router} from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import authMiddleware from './app/middlewares/auth';
import AppointmentController from './app/controllers/AppointmentController';
import FileController from './app/controllers/FileController';
import UserControler from './app/controllers/UsersController';
import ProvidersController from './app/controllers/ProvidersController';
import SessionController from './app/controllers/SessionController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);
routes.post('/users', UserControler.store);
// somente as rotas abaixo do middleware que vai precisar do jwttoken;
routes.use(authMiddleware);
routes.put('/users/:id', UserControler.update);
routes.get('/users', UserControler.find);

routes.get('/providers', ProvidersController.index);
routes.get('/providers/:providerId/available', AvailableController.index);

routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);
routes.delete('/appointments/:id', AppointmentController.delete);
routes.get('/schedule', ScheduleController.index );
routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);
routes.post('/files', upload.single('file'), FileController.store);

module.exports = routes;
