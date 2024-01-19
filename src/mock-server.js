import express from 'express'

const app = express()

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

app.get('/mocks/getFast', (req, res) => {
    setTimeout(() => res.send('getFast'), 10)
})

app.get('/mocks/getSlow', (req, res) => {
    setTimeout(() => res.send('getSlow'), 400)
})

app.get('/mocks/getUnstable', (req, res) => {
    setTimeout(() => res.status(getRandomInt(0, 1) ? 200 : 502).send('getUnstable'), getRandomInt(100, 500))
})

app.get('/mocks/getUnavailable', (req, res) => {
    res.status(502).send('getUnavailable')
})

app.get('/mocks/getTimeout', (req, res) => {
    setTimeout(() => res.status(502).send('getTimeout'), 5000)
})

app.listen(3002, () => {
    console.log(`Mock server running at http://localhost:3002`)
})
