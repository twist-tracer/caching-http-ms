import {Router} from "express";
import config from "config";
import ProxyController from "controllers/ProxyController.ts";
import ProxyClientFactory from "services/proxy/ProxyClientFactory.ts";
import ProxyCacheService from "services/proxy/ProxyCacheService.ts";
import ProxyService from "services/proxy/ProxyService.ts";
import swaggerRouter from "routes/app/swagger.ts";
import NodeCache from "node-cache";
import IRouteConfig from "services/config/IRouteConfig.ts";

const router: Router = Router();

const routesConfigs: Array<IRouteConfig> = config.get('app.routes')

routesConfigs.forEach((routeConfig: IRouteConfig) => {
    const controller: ProxyController = new ProxyController(
        new ProxyCacheService(
            new NodeCache(),
            new ProxyService(
                (new ProxyClientFactory()).create(
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
        case routeConfig.proxy !== undefined:
            handler = controller.proxy(routeConfig.proxy)
            break
        case routeConfig.union !== undefined:
            handler = controller.union(routeConfig.union)
            break
        case routeConfig.first !== undefined:
            handler = controller.first(routeConfig.first)
            break
        default:
            throw new Error(`Invalid route config: ${JSON.stringify(routeConfig)}`)
    }

    router.get(routeConfig.route, handler);
})

router.use('/', swaggerRouter)

export default router;
