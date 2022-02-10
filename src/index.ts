import { Environment } from './services/environment';
import { Server } from './server';
import { Logger } from './services/logger';

async function bootstrap() {
  const config = await Environment.config();

  await Server.start();

  Logger.info(`Environment config: `);
  Logger.info(JSON.stringify(config, null, 4));
}

bootstrap().then();
