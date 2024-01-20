import { Router } from 'express';
import SwaggerUi from "swagger-ui-express";
import SwaggerDoc from "swagger-jsdoc";

const router = Router();

const swaggerConfig = SwaggerDoc({
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Caching http microservice',
            version: '1.0.0',
        },
    },
    apis: [
        './src/routes/app/*.js',
    ],
})

router.use(
    '/docs',
    SwaggerUi.serve,
    SwaggerUi.setup(swaggerConfig)
)

export default router;
