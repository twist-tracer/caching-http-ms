import { Router } from 'express';
import config from "config";
import proxyController from '../../controllers/proxy.js';
import proxyService from "../../services/proxyService.js";
import proxyCacheService from "../../services/proxyCacheService.js";
import proxyClient from "../../services/proxyClient.js";
import swaggerRouter from './swagger.js'
import NodeCache from "node-cache";

const router = Router();
const nodeCache = new NodeCache();

/** @type Array<Object> */
const routesConfigs = config.get('app.routes')

routesConfigs.forEach((routeConfig) => {
    const controller = proxyController(
        proxyCacheService(
            nodeCache,
            proxyService(
                proxyClient(
                    routeConfig.timeout,
                    routeConfig.retries,
                    routeConfig.factor,
                )
            ),
            routeConfig.cache,
        )
    );

    let handler;
    switch (true) {
        case routeConfig.hasOwnProperty('proxy'):
            handler = controller.proxy(routeConfig.proxy)
            break
        case routeConfig.hasOwnProperty('union'):
            handler = controller.union(routeConfig.union)
            break
        case routeConfig.hasOwnProperty('first'):
            handler = controller.first(routeConfig.first)
            break
        default:
            throw new Error(`Invalid route config: ${JSON.stringify(routeConfig)}`)
    }

    router.get(routeConfig.route, handler);
})

router.use('/', swaggerRouter)

export default router;
