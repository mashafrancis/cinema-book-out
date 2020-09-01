import 'reflect-metadata';
import app from './app';
import Logger from './logger';

const logger = Logger('Start');

async function startServer() {
  const port = app.get('port');

  process.on('uncaughtException', e => {
    logger.error(`Uncaught Exception: ${e.stack}`, `Error: ${e}`);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, p) => {
    logger.error(`Unhandled Rejection at: ${JSON.stringify(p)}`, `reason:, ${reason}`);
    process.exit(1);
  });

  const server = app.listen(port);

  server.on('listening', () =>
    logger.info(`
      ########################################
      😎  Server listening on port: ${port} 😎
      ########################################
    `)
  );
}

startServer().catch(err => logger.error(err.message, err.stack))
