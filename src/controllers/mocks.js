function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const getFast = (req, res) => {
    setTimeout(() => res.send('getFast'), 10)
};

export const getSlow = (req, res) => {
    setTimeout(() => res.send('getSlow'), 400)
};

export const getUnstable = (req, res) => {
    setTimeout(() => res.status(getRandomInt(0, 1) ? 200 : 502).send('getUnstable'), getRandomInt(100, 500))
};

export const getUnavailable = (req, res) => {
    res.status(502).send('getUnavailable')
};

export const getTimeout = (req, res) => {
    setTimeout(() => res.status(502).send('getTimeout'), 5000)
};

export default {
    getFast,
    getSlow,
    getUnstable,
    getUnavailable,
    getTimeout
}
