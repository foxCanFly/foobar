import { Router } from 'express';
import { fulfillment } from '../fulfillment';
import errorHandler from './error-handler';

export const router = Router();

router.use('/webhook', errorHandler(fulfillment));
