export default (service) => {
    return {
        proxy: (url) => (req, res) => {
            console.log(`Handled proxy route: ${req.path}`)

            res.send(service.simpleProxy(url))
        },
        union: (map) => (req, res) => {
            console.log(`Handled union route: ${req.path}`)

            res.send(service.unionProxy(map))
        },
        first: (urls) => (req, res) => {
            console.log(`Handled first route: ${req.path}`)

            res.send(service.firstProxy(urls))
        },
    }
}
