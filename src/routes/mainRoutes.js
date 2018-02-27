import {Router} from 'express';
import {
  signupController,
  loginController,
} from '../controllers/authControllers';
import isAuthenticated from '../middlewares/isAuthenticated';

import {getAllUsers} from '../controllers/usersController';

let mainRoutes = Router();

//auth
mainRoutes.post('/auth/signup', signupController);
mainRoutes.post('/auth/login', loginController);

//users
mainRoutes.get('/users', isAuthenticated, getAllUsers);

export default mainRoutes;
