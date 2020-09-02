import { createLogger, format, transports } from 'winston';

const options = {
  file: {
    level: 'info' || 'error',
    filename: `${__dirname}/../logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
};

export default (label) => createLogger({
  level: 'info',
  format: format.combine(
    format.label({ label }),
    format.splat(),
    format.simple()
  ),
  transports: [
    new transports.Console()
  ],
});
