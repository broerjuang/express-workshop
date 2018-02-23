// @flow
import {Router} from 'express';
import {
  signupController,
  loginController,
} from '../controllers/authControllers';

let mainRoutes = Router();

//aut
mainRoutes.post('/auth/signup', signupController);
mainRoutes.post('/auth/login', loginController);

export default mainRoutes;
