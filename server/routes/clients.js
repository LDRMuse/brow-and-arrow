import { Router } from 'express';

import sendClientEmails from '../emails';
import { addClient, addChartEntry, showAllClients } from '../db';

const router = new Router();

// just a test for localhost:5000/clients
router.get('/', (_, res) => {
  res.send('<h1>Hello from clients</h1>');
});

router.get('/:uid', async ({ params }, res) => {
  // show all clients from ADMIN uid (uid is from firebase)
  try {
    const dbRes = await showAllClients(params);
    res.status(200);
    res.json(dbRes);
  } catch (error) {
    error.message = 'Database Error';
  }
});

router.post('/create', async ({ body }, res) => {
  try {
    const dbRes = await addClient(body);
    res.status(201);
    res.json(dbRes);
  } catch (error) {
    error.message = 'Database Error';
    res.status(500).send(error);
  }
});

router.patch('/chart-entry', async ({ body: { chart, email } }, res) => {
  try {
    const dbRes = await addChartEntry(chart, email);
    res.status(201);
    res.json(dbRes);
  } catch (error) {
    error.message = 'Database Error';
    res.status(500).send(error);
  }
});

router.post('/create/email', async ({ body: { email, list } }, res) => {
  console.log(email, list, 'let me lg');
  try {
    const emailRes = await sendClientEmails(email, list);
    res.status(202);
    res.json(emailRes);
  } catch (error) {
    res.status(500);
    console.error(error);
  }
});
export default router;
