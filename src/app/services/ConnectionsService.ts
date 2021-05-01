import { getCustomRepository, Repository } from 'typeorm'
import { ConnectionRepository } from '../repositories/ConnectionRepository'
import { UserRepository } from '../repositories/UserRepository'
import { Connection } from '../entities/Connection'

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
        const connectionAlreadyExists = await connectionRepository.findOne({
            user_id,
        })
        if (!userAlreadyExists) {
            throw new Error('User not exists!')
        }
        if (connectionAlreadyExists) {
            const connectionUpdate = await connectionRepository.update(
                {
                    socket_id,
                },
                {
                    socket_id,
                    admin_id,
                }
            )
            return connectionUpdate
        }
        const connection = await connectionRepository.create({
            user_id,
            admin_id,
            socket_id,
        })
        await connectionRepository.save(connection)

        return connection
    }
    async findByUserId(user_id) {
        const connectionRepository = await getCustomRepository(
            ConnectionRepository
        )

        const connection = await connectionRepository.findOne({
            where: {
                user_id,
            },
        })
        return connection
    }
    async findAllConnectionsWithoutAdmin() {
        const connectionRepository = await getCustomRepository(
            ConnectionRepository
        )

        const connections = await connectionRepository.find({
            where: { admin_id: null },
            relations: ['user'],
        })

        return connections
    }
    async findBySocketId(socket_id) {
        const connectionRepository = await getCustomRepository(
            ConnectionRepository
        )

        const connection = await connectionRepository.findOne({
            where: { socket_id },
        })

        return connection
    }
    async updateAdminId(user_id: string, admin_id: string) {
        const connectiondRepository = await getCustomRepository(
            ConnectionRepository
        )
        const settings = await connectiondRepository
            .createQueryBuilder()
            .update(Connection)
            .set({ admin_id })
            .where('user_id= :user_id', {
                user_id,
            })
            .execute()

        return settings
    }
}

export { ConnectionsService }
