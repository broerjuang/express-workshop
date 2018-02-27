// @flow
import type {$Request as Req, $Response as Res} from 'express';
import User from '../models/UserModel';

type AllUsersRequestHeaders = {
  ['x-token']: string,
};

type ExtensionRequestAllUsers = {
  headers: AllUsersRequestHeaders,
} & Req;

export async function getAllUsers(req: ExtensionRequestAllUsers, res: Res) {
  try {
    let users = await User.find({});
    // make new objects it so it won't show users list with password
    let usersListFinal = {};
    users.forEach((user) => {
      usersListFinal[user._id] = {
        name: user.name,
        email: user.email,
      };
    });
    res.status(200).json(usersListFinal);
  } catch (err) {
    res.status(400).send(err);
  }
}
