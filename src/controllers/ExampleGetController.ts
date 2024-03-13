import { Request, Response } from 'express';

import { Controller } from './Controller';

export default class ExampleGetController implements Controller {
  async run(req: Request, res: Response): Promise<void> {
    const { name } = req.body;
    res.status(200).json({ message: `Hello ${name}!` });
  }
}
