import { getCustomRepository, Repository } from 'typeorm'
import { UserRepository } from '../repositories/UserRepository'

interface InterfaceUsersService {
    email: string
}

class UsersService {

    async create({ email }: InterfaceUsersService) {
        const usersRepository = getCustomRepository(UserRepository)

        const userAlreadyExists = await usersRepository.findOne({
            email,
        })
        if (userAlreadyExists) {
            return userAlreadyExists
        }
        const user = await usersRepository.create({
            email,
        })
        await usersRepository.save(user)

        return user
    }
}

export { UsersService }
