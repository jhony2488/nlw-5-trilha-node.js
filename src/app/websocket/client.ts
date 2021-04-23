export {}
import { Socket } from 'socket.io'
const app = require('../../app')

const ioClient = app.io

ioClient.on('connect', (client: Socket) => {
    client.on('client_first_acess', (params) => {
        console.log(params)
    })
})
