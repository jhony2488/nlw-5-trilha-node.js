export {}
import { Socket } from 'socket.io'
import { ConnectionsService } from '../services/ConnectionsService'
import { UsersService } from '../services/UsersService'

const app = require('../../app')

const ioClient = app.io

ioClient.on('connect', (client: Socket) => {
    const connectionsService = new ConnectionsService()
    const usersService = new UsersService()

    client.on('client_first_acess', async (params) => {
        const socket_id = client.id
        const { text, email } = params

        try {
            const userExists = await usersService.findByEmail(email)

            if (!userExists) {
                console.log(email)

                const user = await usersService.create({ email })

                connectionsService.create({
                    socket_id,
                    user_id: user.id,
                })
            } else {
                const connection = await connectionsService.findByUserId(
                    userExists.id
                )

                if (connection) {
                    connection.socket_id = socket_id
                    connectionsService.create(connection)
                } else {
                    connectionsService.create({
                        socket_id,
                        user_id: userExists.id,
                    })
                }
            }
        } catch (err) {
            console.log('err: ' + err)
        }
    })
})
