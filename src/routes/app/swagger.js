import { Router } from 'express';
import swaggerUi from "swagger-ui-express";
import config from "config";

const router = Router();

/** @type Array<Object> */
const routes = config.get('app.routes')

let swaggerPaths = {};
routes.map((route) => {
    swaggerPaths[route.route] = {get: {responses: {200: {description: 'OK'}}}}
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
