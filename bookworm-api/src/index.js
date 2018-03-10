import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Promise from 'bluebird';

import auth from './routes/auth';
import users from './routes/users';
import books from './routes/books';

dotenv.config();
const app = express();
app.use(bodyParser.json());
mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URL);

const { use, get, listen } = app;

use('/api/auth', auth);
use('/api/users', users);
use('/api/books', books);

get('/*', (req: {}, { sendFile }: { sendFile: {} }) => {
  sendFile(path.join(__dirname, 'index.html'));
});

listen(8080, console.log('Running on localhost:8080'));
