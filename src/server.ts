import express from 'express';
import { Environment } from './services/environment';
import { errorHandler, router } from './middleware';
import { Logger } from './services/logger';

const start = async () => {
  const config = await Environment.config();

  const app = express();

  app.use(express.json());
  app.use(express.text());
  app.use(express.urlencoded({ extended: false }));
  app.use(router);
  app.use(errorHandler);

  app.listen(config.PORT, () => {
    Logger.info(`The application is running ( PORT: ${config.PORT}, NODE_ENV: ${config.NODE_ENV} )`);
  });

  return app;
};

export const Server = {
  start
};
