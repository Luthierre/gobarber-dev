import {Router} from 'express';
import UserControler from './app/controllers/UsersController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.post('/users', UserControler.store);
// somente as rotas abaixo do middleware que vai precisar do jwttoken;
routes.use(authMiddleware);
routes.put('/users', UserControler.update);
routes.get('/users', UserControler.find);

module.exports = routes;
