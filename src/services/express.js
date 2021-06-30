import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { PORT } from '../config';

import { errorHandler, successHandler } from '../utils/responseHandlers';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.set('view engine', 'ejs');

app.get('/status', async (req, res) => {
  try {
    successHandler(res, 'Status OK');
  } catch (error) {
    errorHandler(res, error);
  }
});

export const startServer = (apiRouter, port = PORT) => {
  app.use('/', apiRouter);

  app.listen(port, (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(`Error : ${err}`);
      process.exit(-1);
    }

    // eslint-disable-next-line no-console
    console.log(`Node Server is up at http://localhost:${port} port`);
  });
};

export default { startServer, app };
