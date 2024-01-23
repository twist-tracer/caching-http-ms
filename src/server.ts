import express, {Express} from 'express'
import appRouter from './routes/app/index.ts'
import mocksRouter from './routes/mocks/index.ts'
import config from "config";

const app: Express = express()
const appPort: number = config.get('app.port');

app.use('/', appRouter)

app.listen(appPort, () => {
    console.log(`Server running at http://localhost:${appPort}`)
})

if (process.env.NODE_ENV !== 'production') {
    const mock: Express = express()
    const mockPort: number = config.get('mock.port');

    mock.use('/mocks', mocksRouter)

    mock.listen(mockPort, () => {
        console.log(`Mock server running at http://localhost:${mockPort}`)
    })
}
