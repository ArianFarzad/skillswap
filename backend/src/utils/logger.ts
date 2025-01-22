import winston from 'winston';
import { env } from '../config/config';

const logger = winston.createLogger({
  level: env.NODE_ENV === 'production' ? 'warn' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp}: [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: './logs/error.log',
      level: 'error',
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: './logs/exceptions.log' }),
  ],
});

export default logger;
