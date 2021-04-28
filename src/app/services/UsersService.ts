import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../repositories/UserRepository'

interface InterfaceUsersService {
    email: string
}

class UsersService {
    async create({ email }: InterfaceUsersService) {
        const usersRepository = await getCustomRepository(UserRepository)

        const userAlreadyExists = await usersRepository.findOne({
            email,
        })
        if (!userAlreadyExists) {
            const user = await usersRepository.create({
                email,
            })
            await usersRepository.save(user)

            return user
        }
        return userAlreadyExists
    }

    async findByEmail({ email }: InterfaceUsersService) {
        const usersRepository = await getCustomRepository(UserRepository)

        const user = await usersRepository.findOne({
            email,
        })

        return user
    }
}

export { UsersService }
