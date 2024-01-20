import { Router } from 'express';
import config from "config";
import proxyController from '../../controllers/proxy.js';
import proxyService from "../../services/proxyService.js";
import proxyClient from "../../services/proxyClient.js";
import swaggerRouter from './swagger.js'

const router = Router();

/** @type Array<Object> */
const routes = config.get('app.routes')

routes.forEach((route) => {
    const controller = proxyController(
        proxyService(
            proxyClient(
                route.timeout,
                route.retries,
                route.factor,
            )
        )
    );

    let handler;
    switch (true) {
        case route.hasOwnProperty('proxy'):
            handler = controller.proxy(route.proxy)
            break
        case route.hasOwnProperty('union'):
            handler = controller.union(route.union)
            break
        case route.hasOwnProperty('first'):
            handler = controller.first(route.first)
            break
        default:
            throw new Error(`Invalid route: ${JSON.stringify(route)}`)
    }

    router.get(route.route, handler);
})

router.use('/', swaggerRouter)

export default router;
