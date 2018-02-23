// @flow
import express from 'express';
import mainRoutes from './routes/mainRoutes';
import {PORT, CONNECTION_STRING} from './globals/config';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

mongoose.connect(CONNECTION_STRING);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
let app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/api', mainRoutes);
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
