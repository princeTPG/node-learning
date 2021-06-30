import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { mongooseConnect } from './services/mongoose';

import { PORT } from './config';

import { errorHandler, successHandler } from './utils/responseHandlers';
import urlRouter from './api/url/urlRoutes';
import analyticsRouter from './api/analytics/analyticsRoutes';

const app = express();
mongooseConnect();

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/status', async (req, res) => {
  try {
    successHandler(res, 'Status OK');
  } catch (error) {
    errorHandler(res, error);
  }
});
app.use('/', urlRouter);
app.use('/analytics', analyticsRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Node Server is up at http://localhost:${PORT} port`);
});
