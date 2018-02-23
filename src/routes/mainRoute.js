// @flow

import {Router} from 'express';
import {signupController, loginController} from '../controllers/authController';

let mainRoute = Router();

// auth
mainRoute.post('/auth/signup', signupController);
mainRoute.post('/auth/login', loginController);
//
// // users
// mainRoute.get('/users', /* users contoller*/);

export default mainRoute;
