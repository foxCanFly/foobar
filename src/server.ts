import express from 'express';
import { Environment } from './environment';
import { router } from './router';

const start = async () => {
  const config = await Environment.config();

  const app = express();

  app.use(express.json());
  app.use(express.text());
  app.use(express.urlencoded({ extended: false }));
  app.use(router);

  app.listen(config.PORT, () => {
    console.log(`The application is running ( PORT: ${config.PORT}, NODE_ENV: ${config.NODE_ENV} )`);
  });

  return app;
};

export const Server = {
  start
};
