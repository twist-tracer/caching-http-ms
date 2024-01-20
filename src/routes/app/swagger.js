import { Router } from 'express';
import SwaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const router = Router();

const swaggerDocument = SwaggerJsDoc({
    definition: {
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

router.use('/docs', swaggerUi.serve);

router.get('/docs', swaggerUi.setup(swaggerDocument));

export default router;
