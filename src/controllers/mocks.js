function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default {
    getFast: (req, res) => {
        setTimeout(() => res.send('getFast'), 10)
    },
    getSlow: (req, res) => {
        setTimeout(() => res.send('getSlow'), 400)
    },
    getUnstable: (req, res) => {
        setTimeout(() => res.status(getRandomInt(0, 1) ? 200 : 502).send('getUnstable'), getRandomInt(100, 500))
    },
    getUnavailable: (req, res) => {
        res.status(502).send('getUnavailable')
    },
    getTimeout: (req, res) => {
        setTimeout(() => res.status(502).send('getTimeout'), 5000)
    }
}
