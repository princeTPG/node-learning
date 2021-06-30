import mongoose from 'mongoose';
import { MONGO_URI, ENV, EnvironmentsEnum } from '../constants/environments';
import logger from '../utils/logger';

mongoose.Promise = Promise;

mongoose.connection.on('connected', () => {
  logger.info('MongoDB is connected to :- ', MONGO_URI);
});
mongoose.connection.on('error', (err) => {
  logger.info(`Could not connect to MongoDB because of ${err}`);
  process.exit(1);
});

if (ENV === EnvironmentsEnum.DEV) {
  /** uncomment this to see logs for each mongo operation performed */
  mongoose.set('debug', true);
}

/**
 * Mongoose connection function
 * @returns {Object}
 */
export const mongooseConnect = () => {
  mongoose.connect(MONGO_URI, {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  return mongoose.connection;
};

export default mongooseConnect;
