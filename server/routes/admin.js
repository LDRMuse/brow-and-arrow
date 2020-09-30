import { Router } from 'express';

import { addAdmin, getAdmin } from '../db';

const router = new Router();

// just a test for localhost:5000/admins
router.get('/', (_, res) => {
  res.send('<h1>Hello from admins</h1>');
});

router.get('/:uid', async ({ params }, res) => {
  try {
    const mongoRes = await getAdmin(params);
    if (!mongoRes) {
      throw new Error('User not found!');
    }
    res.status(200);
    res.json(mongoRes);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
});

router.post('/create', async ({ body }, res) => {
  try {
    const mongoRes = await addAdmin(body);
    res.status(201);
    res.json({ uid: body.uid, mongoRes });
  } catch (err) {
    res.status(500);
    res.json(err);
  }
});
export default router;
