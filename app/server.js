import express from 'express'
import yaml from "yaml";
import fs from "fs";

const app = express()

const APP_PORT= 3001

const routesFile = fs.readFileSync('app/routes.yml')

const routes = yaml.parse(routesFile.toString())

routes.forEach((route) => {
    app.get(route.route, (req, res) => {
        res.send(route.route)
    })
})

app.listen(APP_PORT, () => {
    console.log(`Server running at http://localhost:${APP_PORT}`)
})
