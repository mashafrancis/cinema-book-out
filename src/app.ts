import path from 'path';
import favicon from 'serve-favicon';
import compress from 'compression';
import helmet from 'helmet';
import cors from 'cors';

import feathers from '@feathersjs/feathers';
import configuration from '@feathersjs/configuration';
import express from '@feathersjs/express';
import swagger from 'feathers-swagger';
import hooks from "feathers-hooks";

import {Application} from './declarations';
import Logger from './logger';
import middleware from './middleware';
import services from './services';
import appHooks from './app.hooks';
import sequelize from './sequelize';

const app: Application = express(feathers());
const logger = Logger('App');

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(sequelize);
app.configure(hooks());

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
// Set up our services (see `services/index.js`)
app.configure(services);
// Configure swagger
app.configure(swagger({
  specs: {
    info: {
      title: 'Cinema Booking',
      description: 'App for booking movie tickets',
      version: '1.0.0',
    }
  }
}))

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({logger}));

app.hooks(appHooks);

export default app;
