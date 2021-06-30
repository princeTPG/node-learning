import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { successHandler } from '../utils/responseHandlers';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.set('view engine', 'ejs');

export const startServer = (apiRouter, port, processId) => {
  app.get('/status', async (req, res) => {
    successHandler(res, { message: `Status OK from cluster-worker ${processId}` });
  });
  app.use('/', apiRouter);

  app.listen(port, (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(`Error : ${err}`);
      process.exit(-1);
    }

    // eslint-disable-next-line no-console
    console.log(
      `Node Server is up for cluster-worker ${processId} at http://localhost:${port} port`,
    );
  });
};

export default { startServer, app };
