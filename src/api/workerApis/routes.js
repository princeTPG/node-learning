import express from 'express';
import { getFibonacciSeries } from './controller';

const router = express.Router();

router.get('/fibonacciSeries/:num', getFibonacciSeries);

export default router;
