import { Router } from 'express';
import controller from '../../controllers/mocks.js';

const router = Router();

router.get('/getFast', controller.getFast)

router.get('/getSlow', controller.getSlow)

router.get('/getUnstable', controller.getUnstable)

router.get('/getUnavailable', controller.getUnavailable)

router.get('/getTimeout', controller.getTimeout)

export default router;
