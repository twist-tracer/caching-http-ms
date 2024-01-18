import fs from "fs";
import yaml from "yaml";
import { proxy, union, first } from "../controllers/proxy.js"

export default {
    load: function (app) {
        const routesFile = fs.readFileSync('src/routes/routes.yml')

        const routes = yaml.parse(routesFile.toString())

        routes.forEach((route) => {
            app.get(route.route, this.resolveProxyForRoute(route))
        })
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
