import { Request, Response, Router } from 'express';

import StatusController from '../controllers/StatusGetController';
import container from '../dependency-injection';

export const register = (router: Router) => {
  const controller = container.get<StatusController>('StatusGetController');
  router.get('/status', (req: Request, res: Response) => controller.run(req, res));
};
