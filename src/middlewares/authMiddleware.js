import jwt from 'jsonwebtoken';
import {SECRET} from '../globals/config';

export function isAuthenticated(req, res, next) {
  try {
    let token = req.get('x-token');
    let decoded = jwt.verify(token, SECRET, {maxAge: 10000});
    if (decoded) {
      next();
    } else {
      throw new Error();
    }
  } catch (err) {
    res.status(400).send(err);
  }
}
