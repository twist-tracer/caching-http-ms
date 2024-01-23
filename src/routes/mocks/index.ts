import { Router } from 'express';
import MocksController from '../../controllers/MocksController.ts';
import { faker } from '@faker-js/faker';

const router: Router = Router();

const controller: MocksController = new MocksController(faker);

router.get('/getFast', controller.getFast())

router.get('/getSlow', controller.getSlow())

router.get('/getUnstable', controller.getUnstable())

router.get('/getUnavailable', controller.getUnavailable())

router.get('/getTimeout', controller.getTimeout())

export default router;
