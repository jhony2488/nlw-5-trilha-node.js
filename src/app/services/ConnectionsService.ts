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
        if (!userAlreadyExists) {
            throw new Error('User not exists!')
        }
        const connection = await connectionRepository.create({
            user_id,
            admin_id,
            socket_id,
        })
        await connectionRepository.save(connection)

        return connection
    }
    async findByUserId(user_id: string) {
        const connectionRepository = await getCustomRepository(
            ConnectionRepository
        )

        const connection = await connectionRepository.findOne({ user_id })

        return connection
    }
}

export { ConnectionsService }
