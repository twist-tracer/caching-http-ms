import { Router } from 'express';
import ProxyController from '../../controllers/proxy.js';
import swaggerRouter from './swagger.js'
import routeSettings from "../../services/routeSettings.js";
import ProxyService from "../../services/proxyService.js";
import ProxyClient from "../../services/proxyClient.js";

const router = Router();

/**
 * @openapi
 * /getCachedResult:
 *   get:
 *     description: Return cached result
 */
router.get('/getCachedResult', (req, res) => {
    const settings = routeSettings('/getCachedResult');

    return ProxyController(
        ProxyService(
            ProxyClient(
                settings.timeout,
                settings.retries,
                settings.factor,
            )
        )
    ).proxy(settings.proxy)(req, res)
});

/**
 * @openapi
 * /getUnionResult:
 *   get:
 *     description: Return union result
 */
router.get('/getUnionResult', (req, res) => {
    const settings = routeSettings('/getUnionResult');

    return ProxyController(
        ProxyService(
            ProxyClient(
                settings.timeout,
                settings.retries,
                settings.factor,
            )
        )
    ).union(settings.union)(req, res)
})

/**
 * @openapi
 * /getFirstResult:
 *   get:
 *     description: Return first result
 */
router.get('/getFirstResult', (req, res) => {
    const settings = routeSettings('/getFirstResult');

    return ProxyController(
        ProxyService(
            ProxyClient(
                settings.timeout,
                settings.retries,
                settings.factor,
            )
        )
    ).first(settings.first)(req, res)
})

router.use('/', swaggerRouter)

export default router;
