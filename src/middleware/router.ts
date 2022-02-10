import { Router } from 'express';
import { fulfillment } from '../fulfillment';
import { routeHandler } from './route-handler';
import { auth } from './auth';

export const router = Router();

router.post('/webhook', auth, routeHandler(fulfillment));

router.get(
  '/ping',
  routeHandler(async (req, res) => res.send('pong'))
);
