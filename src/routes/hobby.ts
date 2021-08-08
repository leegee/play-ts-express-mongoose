import express, { Request, Response } from 'express';

import * as Hobby from '../controllers/hobby';

export const hobbyRouter = express.Router()

hobbyRouter.post('/', async (req: Request, res: Response): Promise<void> => {
  const hobby = await Hobby.create(req.body);
  res.status(201).send({ hobby });
});

hobbyRouter.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const hobby = await Hobby.retrieve(req.params.id);
    res.send({ hobby });
  } catch (error) {
    res.status(404).send({ error });
  }
});

hobbyRouter.patch('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const hobby = await Hobby.update(req.body);
    res.status(200).send({ hobby });
  } catch (error) {
    res.status(404).send({ error });
  }
});

hobbyRouter.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const hobby = await Hobby.del(req.body);
    res.status(204).send({ hobby });
  } catch (error) {
    res.status(404).send({ error });
  }
});
