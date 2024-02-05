import { Router, Request, Response } from 'express';
import container from '../dependency-injection';
import StatusController from '../controllers/StatusGetController';

export const register = (router: Router) => {
  const controller = container.get<StatusController>('StatusGetController');
  router.get('/status', (req: Request, res: Response) => controller.run(req, res));
};
