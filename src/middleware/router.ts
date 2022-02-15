import { Router } from 'express';
import { fulfillment } from '../fulfillment';
import { asyncHandler } from './async-handler';
import { auth } from './auth';

export const router = Router();

router.post('/webhook', auth, asyncHandler(fulfillment));

router.get(
  '/ping',
  asyncHandler(async (req, res) => res.send('pong'))
);
