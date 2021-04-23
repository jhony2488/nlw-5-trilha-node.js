export {}

import express from 'express'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import bodyParser from 'body-parser'
import { routes } from './routes'
import path from 'path'

class AppController {
    public express
    private http
    public io
    constructor() {
        this.express = express()

        this.http = createServer(this.express)
        this.io = new Server(this.http)

        this.websocket()
        this.static()
        this.bodyParser()
        this.middleware()
        this.routes()
    }
    middleware() {
        this.express.use(express.json())
    }
    routes() {
        this.express.use(routes)
    }
    bodyParser() {
        this.express.use(bodyParser.urlencoded({ extended: false }))
        this.express.use(bodyParser.json())
    }
    static() {
        this.express.use(express.static(path.join(__dirname, '../public')))
        this.express.set('views', path.join(__dirname, '../public'))
        this.express.engine('html', require('ejs').renderFile)
        this.express.set('view engine', 'html')
    }
    websocket() {
        this.io.on('connection', (client: Socket) => {
            console.log('Conectado:' + client.id)
        })
    }
    server() {
        this.http.listen(80, () => {
            console.log('servidor rodando')
        })
    }
}

module.exports = new AppController()
