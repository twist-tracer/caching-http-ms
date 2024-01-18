import express from 'express'

const app = express()

const APP_PORT = parseInt(process.env.APP_PORT ?? 3001)

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.listen(APP_PORT, () => {
    console.log(`Server running at http://localhost:${APP_PORT}`)
})
