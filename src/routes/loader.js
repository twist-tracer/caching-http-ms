import fs from "fs";
import yaml from "yaml";
import { proxy, union, first } from "../controllers/proxy.js"
import SwaggerUi from "swagger-ui-express";
import SwaggerDoc from 'swagger-jsdoc'

const swaggerConfig = SwaggerDoc({
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API',
            version: '1.0.0',
        },
    },
    apis: [
        // './src/ui/routes/*.ts',
        // './src/app/*/application/dto/*.ts',
    ], // Path to the API routes file
})

export default {
    load: function (app) {
        const routesFile = fs.readFileSync('src/routes/routes.yml')

        const routes = yaml.parse(routesFile.toString())

        routes.forEach((route) => {
            app.get(route.route, this.resolveProxyForRoute(route))
        })

        app.use(
            '/docs',
            SwaggerUi.serve,
            SwaggerUi.setup(swaggerConfig)
        )
    },

    resolveProxyForRoute: (route) => {
        switch (true) {
            case route.hasOwnProperty('proxy'):
                return proxy;
            case route.hasOwnProperty('union'):
                return union;
            case route.hasOwnProperty('first'):
                return first
            default:
                throw new Error('Undefined route type')
        }
    }
}
