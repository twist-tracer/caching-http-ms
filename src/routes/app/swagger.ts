import { Router } from 'express';
import swaggerUi from "swagger-ui-express";
import config from "config";
import {RouteConfig} from "../../types.js";

const router: Router = Router();

const routesConfigs: Array<RouteConfig> = config.get('app.routes')

const swaggerPaths: {[key:string]: Object} = {};

routesConfigs.map((routesConfig) => {
    swaggerPaths[routesConfig.route] = {get: {responses: {200: {description: 'OK'}}}}
})

const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: config.get('app.name'),
        version: '1.0.0',
    },
    paths: swaggerPaths
}

router.use('/docs', swaggerUi.serve);

router.get('/docs', swaggerUi.setup(swaggerDocument));

export default router;
