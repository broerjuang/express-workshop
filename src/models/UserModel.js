// @flow
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 6,
  },
});

const User = mongoose.model('User', UserSchema);

export default User;
