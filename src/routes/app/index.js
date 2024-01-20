import { Router } from 'express';
import { proxy, union, first } from '../../controllers/proxy.js';
import swaggerRouter from './swagger.js'

const router = Router();

/**
 * @openapi
 * /getCachedResult:
 *   get:
 *     description: Return cached result
 */
router.get('/getCachedResult', proxy)

/**
 * @openapi
 * /getUnionResult:
 *   get:
 *     description: Return union result
 */
router.get('/getUnionResult', union)

/**
 * @openapi
 * /getFirstResult:
 *   get:
 *     description: Return firs result
 */
router.get('/getFirstResult', first)

router.use('/', swaggerRouter)

export default router;
