import { Environment } from './environment';
import { Server } from './server';

async function bootstrap() {
  const config = await Environment.config();
  await Server.start();

  console.log(`Environment config: `);
  console.log(JSON.stringify(config, null, 4));
}

bootstrap().then();
