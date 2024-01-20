export default (client) => {
    console.log('Service constructed');

    return {
        /**
         *
         * @param {string} url
         * @returns {`Simple proxy to ${string}`}
         */
        simpleProxy: (url) => {
            return `Simple proxy to ${url}`
        },
        /**
         *
         * @param {Object} map
         * @returns {string}
         */
        unionProxy: (map) => {
            return `Aggregated proxy from ` + map.toArray().join(',')
        },
        /**
         *
         * @param {Array} urls
         * @returns {string}
         */
        firstProxy: (urls) => {
            return `First successful proxy from ` + urls.join(',')
        }
    }
}
