export default (service) => {
    return {
        proxy: (url) => (req, res) => {
            console.log(`Handled proxy route: ${req.path}`)

            const jsonApiObject = {
                meta: {
                    proxyType: 'proxy'
                }
            }

            service
                .simpleProxy(url)
                .then((proxyRes) => {
                    jsonApiObject.included = [proxyRes]

                    return jsonApiObject;
                })
                .catch((error) => {
                    jsonApiObject.errors = [error.message]

                    return jsonApiObject;
                })
                .finally(() => {
                    res.send(jsonApiObject)
                })
        },
        union: (map) => (req, res) => {
            console.log(`Handled union route: ${req.path}`)

            const jsonApiObject = {
                meta: {
                    proxyType: 'union'
                }
            }

            service
                .unionProxy(map)
                .then((proxyRes) => {
                    jsonApiObject.included = Object.values(proxyRes)

                    return jsonApiObject;
                })
                .catch((error) => {
                    jsonApiObject.errors = [error.message]

                    return jsonApiObject;
                })
                .finally(() => {
                    res.send(jsonApiObject)
                })
        },
        first: (urls) => (req, res) => {
            console.log(`Handled first route: ${req.path}`)

            const jsonApiObject = {
                meta: {
                    proxyType: 'first'
                }
            }

            service
                .firstProxy(urls)
                .then((proxyRes) => {
                    jsonApiObject.included = [proxyRes]

                    return jsonApiObject;
                })
                .catch((error) => {
                    jsonApiObject.errors = [error.message]

                    return jsonApiObject;
                })
                .finally(() => {
                    res.send(jsonApiObject)
                })
        },
    }
}
