import fs from 'fs';

import * as  OpenApiValidator from 'express-openapi-validator';
import express, { Request, Response, NextFunction, Application } from 'express';
import 'express-async-errors';

import * as myMongoose from './my-mongoose';

import { config } from '../config';
import { userRouter } from './routes/user';
import { hobbyRouter } from './routes/hobby';

export async function app(): Promise<Application> {

  await myMongoose.connect();
  const app: Application = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  if (fs.existsSync(config.oasPath)) {
    app.use(OpenApiValidator.middleware({
      apiSpec: config.oasPath,
      validateRequests: true,
      validateResponses: true,
    }));
  } else {
    console.warn('No OAS yaml - I did not have to time to complete the task');
  }

  // Used by CI/start-server-and-test
  app.use('/health', (_req: Request, res: Response, next: NextFunction) => {
    res.status(200).send(JSON.stringify({ ok: true }));
  });

  app.use('/user', userRouter);
  app.use('/hobby', hobbyRouter);

  app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    if (res.headersSent) {
      return next(err);
    }

    res.status(500).send(JSON.stringify(err));
  });

  return app;
};
