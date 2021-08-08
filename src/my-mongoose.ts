import mongoose from 'mongoose';

import { config } from '../config';

mongoose.set('useFindAndModify', false);

let connection;

export const connect = async () => {
  if (!connection) {
    connection = await mongoose.connect(config.dsn, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.info('Connected to Mongo on', config.dsn);
  }
  return connection;
};