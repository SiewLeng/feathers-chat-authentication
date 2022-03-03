import path from 'path';
import favicon from 'serve-favicon';
import compress from 'compression';
import helmet from 'helmet';
import cors from 'cors';

import feathers from '@feathersjs/feathers';
import configuration from '@feathersjs/configuration';
import express from '@feathersjs/express';
import socketio from '@feathersjs/socketio';


import { Application } from './declarations';
import logger from './logger';
import middleware from './middleware';
import services from './services';
import appHooks from './app.hooks';
import channels from './channels';
import { HookContext as FeathersHookContext } from '@feathersjs/feathers';
import authentication from './authentication';
import mongoose from './mongoose';
// Don't remove this comment. It's needed to format import lines nicely.

const app: Application = express(feathers());
export type HookContext<T = any> = { app: Application } & FeathersHookContext<T>;

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet({
  contentSecurityPolicy: false
}));
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

app.configure(mongoose);

// Configure other middleware (see `middleware/index.ts`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.ts`)
app.configure(services);
// Set up event channels (see channels.ts)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger } as any));

app.hooks(appHooks);

/*
app.service('users').create({
  id: 'b053747d-0db2-473e-a578-ebf7186225fb',
  auth0Id: '2058c91b-6f1b-4b82-880d-e9c3c790d61e',
  email: 'siewleng.lim@gmail.com',
  password: '123456',
  dateOfBirth: new Date('1970-08-07'),
  hobbies: ['reading']
});
*/

/*
app.service('users').create({
  id: '2175763a-3ee8-47d0-8500-fedfe417b599',
  auth0Id: '4fad1535-cebf-46cc-a0d8-e3a71febbff4',
  email: 'sherry.ong@gmail.com',
  password: '123456',
  dateOfBirth: new Date('2001-10-25'),
  hobbies: ['eating korean food']
});
*/

export default app;
