import express from 'express'
import RoutesLoader from './routes/loader.js'

const app = express()

RoutesLoader.load(app)

app.listen(3001, () => {
    console.log(`Server running at http://localhost:3001`)
})
