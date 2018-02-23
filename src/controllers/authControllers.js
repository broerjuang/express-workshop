// @flow
import type {$Request as Req, $Response as Res} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel';
import {SECRET} from '../globals/config';

const SALT = bcrypt.genSaltSync(10);

type ReqBodySignUp = {
  name: String,
  email: string,
  password: string,
  passwordConfirm: string,
};

type ReqBodyLogin = {
  email: string,
  password: string,
};

type ExtReq = {
  body: ReqBodySignUp,
} & Req;

type ExtReqLogin = {
  body: ReqBodyLogin,
} & Req;

export async function signupController(req: ExtReq, res: Res) {
  let {name, email, password, passwordConfirm} = req.body;
  if (
    name === 'undefined' ||
    email === 'undefined' ||
    password === 'undefined' ||
    passwordConfirm === 'undefined'
  ) {
    res.status(400).json({
      status: 'Failed',
      message: 'BAD REQUEST',
    });
  }

  if (password !== passwordConfirm) {
    res.status(400).json({
      status: 'NOT OK',
      message: 'bad password',
    });
  }

  try {
    let {name, email, password} = req.body;
    let hashedPassword = bcrypt.hashSync(password, SALT);
    let userData = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    let token = jwt.sign({data: userData._id}, SECRET, {expiresIn: 10000});
    res.status(200).json({
      status: 'OK',
      body: req.body,
      hashedPassword: hashedPassword,
      token,
    });
  } catch (err) {
    res.status(500).json({
      status: 'BAD',
      message: 'server error',
    });
  }
}

export async function loginController(req: ExtReqLogin, res: Res) {
  let {email, password} = req.body;
  let hashedPassword = bcrypt.hashSync(password, SALT);
  // TODO: make try catch
  // try {
  //   let user = await User.findOne({email});
  //   if (hashedPassword !== user.password) {
  //   }
  // } catch (err) {
  //   res.status(400).json({
  //     status: 'BAD',
  //     message: 'BAD REQUEST',
  //   });
  // }
  User.findOne({email: email}, (err, user) => {
    if (err) {
      res.status(400).json({
        status: 'BAD',
        message: 'ERROR',
      });
    }
    let token = jwt.sign({data: user._id}, SECRET, {expiresIn: 10000});
    if (hashedPassword !== user.password) {
      console.log('hashed', hashedPassword);
      console.log('not hashed', user.password);
      res.status(400).json({
        status: 'BAD',
        message: 'password does not match',
      });
    } else {
      res.status(200).json({
        status: 'OK',
        message: 'password match',
        token,
      });
    }
  });
}

function findUserByPassword(password: string) {}
