import { Request, Response, Router } from 'express';

import ExampleGetController from '../controllers/ExampleGetController';
import container from '../dependency-injection';

export const register = (router: Router) => {
  const controller = container.get<ExampleGetController>('ExampleGetController');
  router.get('/', (req: Request, res: Response) => controller.run(req, res));
};
