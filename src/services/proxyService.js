export default (client) => {
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
            return `Aggregated proxy from ` + Object
                .keys(map)
                .map((key) => map[key])
                .join(', ')
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
