import config from "config";

/** @type Array<Object> */
const routeSettings = config.get('app.route_settings')

export default (routePath) => routeSettings.find((route) => {
    return route.route === routePath
})
