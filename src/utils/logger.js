import { createLogger, format, transports } from 'winston';

import { ENV, EnvironmentsEnum } from '../constants/environments';

const { combine, timestamp, printf } = format;

const myFormat = printf(
  ({ level, message, timestamp: printTimestamp }) => `[${printTimestamp}]:[${level}]: ${message}`,
);

const logger = createLogger({
  level: 'info',
  format: combine(timestamp(), myFormat),
  transports: [new transports.Console()],
});

if (ENV === EnvironmentsEnum.PROD) {
  logger.add(new transports.File({ filename: 'logs/all-logs.log' }));
}

export default logger;
