import { getCustomRepository, Repository } from 'typeorm'
import { ConnectionRepository } from '../repositories/ConnectionRepository'
import { UserRepository } from '../repositories/UserRepository'

interface InterfaceConnectionsServiceCreate {
    user_id: string
    admin_id?: string
    socket_id: string
}

class ConnectionsService {
    async create({
        user_id,
        admin_id,
        socket_id,
    }: InterfaceConnectionsServiceCreate) {
        const userRepository = await getCustomRepository(UserRepository)
        const connectionRepository = await getCustomRepository(
            ConnectionRepository
        )

        const userAlreadyExists = await userRepository.findOne({
            id: user_id,
        })
        const userAdminAlreadyExists = await userRepository.findOne({
            id: admin_id,
        })
        if (!userAlreadyExists) {
            throw new Error('User not exists!')
        }
        if (!userAdminAlreadyExists) {
            throw new Error('User Admin not exists!')
        }
        const connection = await connectionRepository.create({
            user_id,
            admin_id,
            socket_id,
        })
        await connectionRepository.save(connection)

        return connection
    }
}

export { ConnectionsService }
