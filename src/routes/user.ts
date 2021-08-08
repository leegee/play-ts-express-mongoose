import express, { Request, Response } from 'express';

import * as User from '../controllers/user';

export const userRouter = express.Router()

userRouter.post('/', async (req: Request, res: Response): Promise<void> => {
  const user = await User.create(req.body);
  res.status(201).send({ user });
});

userRouter.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.retrieve(req.params.id);
    res.send({ user });
  } catch (error) {
    res.status(404).send({ error });
  }
});

userRouter.patch('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.update(req.body);
    res.status(200).send({ user });
  } catch (error) {
    res.status(404).send({ error });
  }
});

userRouter.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.del(req.body);
    res.status(204).send({ user });
  } catch (error) {
    res.status(404).send({ error });
  }
});
