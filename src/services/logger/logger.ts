import winston from 'winston';
import { LoggingWinston } from '@google-cloud/logging-winston';

export const Logger = winston.createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
  transports: [
    new winston.transports.Console(),
    ...(process.env.NODE_ENV !== 'development' ? [new LoggingWinston({ logName: 'contractor-fulfillment' })] : [])
  ]
});
