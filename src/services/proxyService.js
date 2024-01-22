export default (client) => {
    return {
        /**
         *
         * @param {String} url
         */
        simpleProxy: async (url) => {
            const proxyResult = await client.get(url);

            return proxyResult.data
        },
        /**
         *
         * @param {Object} map
         */
        unionProxy: async (map) => {
            let result = {};

            for (let key in map) {
                const proxyResult = await client.get(map[key]);

                result[key] = proxyResult.data
            }

            return result
        },
        /**
         *
         * @param {Array} urls
         */
        firstProxy: async (urls) => {
            const proxyResult = await Promise.any(urls.map(
                (url) => client.get(url)
            ))

            return proxyResult.data
        }
    }
}
