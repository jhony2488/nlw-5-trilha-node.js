import { Socket } from 'socket.io'
import { ConnectionsService } from '../services/ConnectionsService'
import { UsersService } from '../services/UsersService'
import { MessagesService } from '../services/MessagesService'

const app = require('../../app')

const ioAdmin = app.io

ioAdmin.on('connect', async (admin: Socket) => {
    const connectionsService = new ConnectionsService()
    const messagesService = new MessagesService()

    const allConnectionsWithoutAdmin = await connectionsService.findAllConnectionsWithoutAdmin()

    await ioAdmin.emit('admin_list_all_users', allConnectionsWithoutAdmin)

    admin.on('admin_list_messages_by_user', async (params, callback) => {
        const { user_id } = params

        const allMessages = await messagesService.index({ user_id })

        callback(allMessages)
    })

    admin.on('admin_send_message', async (params) => {
        const { text, user_id } = params
        await messagesService.create({ text, user_id, admin_id: admin.id })
        const { socket_id } = await connectionsService.findByUserId(user_id)
        ioAdmin.to(socket_id).emit('admin_send_to_client', {
            text,
            socket_id: admin.id,
        })
    })

    admin.on('admin_user_in_support', async (params) => {
        const { user_id } = params

        await connectionsService.updateAdminId(user_id, admin.id)

        const allConnectionsWithoutAdmin = await connectionsService.findAllConnectionsWithoutAdmin()

        ioAdmin.emit('admin_list_all_users', allConnectionsWithoutAdmin)
    })
})
