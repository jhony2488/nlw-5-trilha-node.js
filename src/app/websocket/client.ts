export {}
import { Socket } from 'socket.io'
import { ConnectionsService } from '../services/ConnectionsService'
import { UsersService } from '../services/UsersService'
import { MessagesService } from '../services/MessagesService'

const app = require('../../app')

const ioClient = app.io

interface IParams {
    text: string
    email: string
}

ioClient.on('connect', (client: Socket) => {
    const connectionsService = new ConnectionsService()
    const usersService = new UsersService()
    const messagesService = new MessagesService()

    client.on('client_first_acess', async (params) => {
        const socket_id = client.id
        const { text, email } = params as IParams
        let user_id = null
        try {
            const userExists = await usersService.findByEmail({ email })

            if (!userExists) {
                console.log(email)

                const user = await usersService.create({ email })

                await connectionsService.create({
                    socket_id,
                    user_id: user.id,
                })
                user_id = user.id
            } else {
                const connection = await connectionsService.findByUserId(
                    userExists.id
                )

                if (connection) {
                    connection.socket_id = socket_id
                    await connectionsService.create(connection)
                } else {
                    await connectionsService.create({
                        socket_id,
                        user_id: userExists.id,
                    })
                }
                user_id = userExists.id
            }
            await messagesService.create({ user_id, text })

            const allMessages = await messagesService.index({ user_id })
            client.emit('client_list_all_messages', allMessages)

            const allConnectionsWithoutAdmin = await connectionsService.findAllConnectionsWithoutAdmin()

            await ioClient.emit(
                'admin_list_all_users',
                allConnectionsWithoutAdmin
            )
        } catch (err) {
            console.log('err: ' + err)
        }
    })
    client.on('client_send_to_admin', async (params) => {
        const { text, socket_admin_id } = params
        const socket_id = client.id
        const connection = await connectionsService.findBySocketId(socket_id)

        const message = await messagesService.create({
            user_id: connection.user_id,
            text,
        })

        ioClient
            .to(socket_admin_id)
            .emit('admin_receive_message', { message, socket_id })
    })
})
