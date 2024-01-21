function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let jsonApiObject = {
    data: {
        id: getRandomInt(1, 999)
    }
}

export default {
    getFast: (req, res) => {
        setTimeout(() => res.send({
            data: {
                id: getRandomInt(1, 999),
                type: 'fast',
            }
        }), 10)
    },
    getSlow: (req, res) => {
        setTimeout(() => res.send({
            data: {
                id: getRandomInt(1, 999),
                type: 'slow',
            }
        }), 400)
    },
    getUnstable: (req, res) => {
        setTimeout(
            () => res
                .status(getRandomInt(0, 1) ? 200 : 502)
                .send({
                    data: {
                        id: getRandomInt(1, 999),
                        type: 'unstable',
                    }
                }),
            getRandomInt(100, 500)
        )
    },
    getUnavailable: (req, res) => {
        res.status(502).send({
            data: {
                id: getRandomInt(1, 999),
                type: 'unavailable',
            }
        })
    },
    getTimeout: (req, res) => {
        setTimeout(
            () => res
                .status(502)
                .send({
                    data: {
                        id: getRandomInt(1, 999),
                        type: 'timeout',
                    }
                }),
            5000
        )
    }
}
