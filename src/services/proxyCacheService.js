export default (cache, proxyService, ttl) => {
    async function remember(key, ttl, callable) {
        const cachedResult = cache.get(key);

        if (cachedResult) {
            return cachedResult
        }

        const result = await callable();

        cache.set(key, result, ttl)

        return result
    }

    return {
        /**
         *
         * @param {String} url
         */
        simpleProxy: async (url) => {
            return remember(
                `simpleproxy:${url}`,
                ttl,
                () => proxyService.simpleProxy(url)
            )
        },
        /**
         *
         * @param {Object} map
         */
        unionProxy: async (map) => {
            return remember(
                `unionProxy:${Object.values(map).join(',')}`,
                ttl,
                () => proxyService.unionProxy(map)
            )
        },
        /**
         *
         * @param {Array} urls
         */
        firstProxy: async (urls) => {
            return remember(
                `firstProxy:${urls.join(',')}`,
                ttl,
                () => proxyService.firstProxy(urls)
            )
        }
    }
}
