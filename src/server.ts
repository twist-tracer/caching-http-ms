import express, {Express} from 'express'
import appRouter from './routes/app/index.ts'
import mocksRouter from './routes/mocks/index.ts'

const app: Express = express()

app.use('/', appRouter)

app.listen(3001, () => {
    console.log(`Server running at http://localhost:3001`)
})

if (process.env.NODE_ENV !== 'production') {
    const mock: Express = express()

    mock.use('/mocks', mocksRouter)

    mock.listen(3002, () => {
        console.log(`Mock server running at http://localhost:3002`)
    })
}