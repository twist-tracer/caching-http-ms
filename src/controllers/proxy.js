export default (service) => {
    return {
        proxy: (url) => (req, res) => {
            console.log(`Handled proxy route: ${req.path}`)

            service
                .simpleProxy(url)
                .then((proxyRes) => {
                    res.send({
                        meta: {
                            proxyType: 'simple'
                        },
                        included: [proxyRes]
                    })
                })
        },
        union: (map) => (req, res) => {
            console.log(`Handled union route: ${req.path}`)

            service.unionProxy(map).then((proxyRes) => {
                res.send({
                    meta: {
                        proxyType: 'union'
                    },
                    included: [...Object.keys(proxyRes).map(key => proxyRes[key])]
                })
            })
        },
        first: (urls) => (req, res) => {
            console.log(`Handled first route: ${req.path}`)

            service.firstProxy(urls).then((proxyRes) => {
                res.send({
                    meta: {
                        proxyType: 'first'
                    },
                    included: [proxyRes]
                })
            })
        },
    }
}
