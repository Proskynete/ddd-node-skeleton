import compress from 'compression';
import errorHandler from 'errorhandler';
import express, { NextFunction, Request, Response } from 'express';
import Router from 'express-promise-router';
import helmet from 'helmet';
import * as http from 'http';
import httpStatus from 'http-status';

import { registerRoutes } from './routes';

export class Server {
  private express: express.Express;
  private port: string;
  private httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;

    this.express = express();
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(helmet());
    this.express.use(compress());

    const router = Router();
    router.use(errorHandler());
    this.express.use(router);

    registerRoutes(router);

    router.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
      console.log(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    });
  }

  async listen(): Promise<void> {
    return new Promise(resolve => {
      this.httpServer = this.express.listen(this.port, () => {
        const _env = this.express.get('env');
        console.log(`  Mock Backend App is running at http://localhost:${this.port} in ${_env} mode`);
        console.log('  Press CTRL-C to stop\n');
        resolve();
      });
    });
  }

  getHTTPServer() {
    return this.httpServer;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close(error => {
          if (error) return reject(error);
          return resolve();
        });
      }

      return resolve();
    });
  }
}
