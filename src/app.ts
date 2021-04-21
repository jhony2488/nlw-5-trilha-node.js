export {}

import express from 'express'
import bodyParser from 'body-parser'

class AppController {
    public express
    constructor() {
        this.express = express()

        this.bodyParser()
        this.middleware()
        this.routes()
    }
    middleware() {
        this.express.use(express.json())
    }
    routes() {
        this.express.use(require('./routes'))
    }
    bodyParser() {
        this.express.use(bodyParser.urlencoded({ extended: false }))
        this.express.use(bodyParser.json())
    }
    server() {
        this.express.listen(3000, () => console.log('servidor rodando'))
    }
}

module.exports = new AppController()
