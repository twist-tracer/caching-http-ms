import { Router } from 'express';
import mocksController from '../../controllers/mocks.js';

const router = Router();

router.get('/getFast', mocksController.getFast)

router.get('/getSlow', mocksController.getSlow)

router.get('/getUnstable', mocksController.getUnstable)

router.get('/getUnavailable', mocksController.getUnavailable)

router.get('/getTimeout', mocksController.getTimeout)

export default router;
