import { getCustomRepository, Repository } from 'typeorm'
import { MessageRepository } from '../repositories/MessageRepository'
import { UserRepository } from '../repositories/UserRepository'

interface InterfaceMessagesServiceCreate {
    user_id: string
    admin_id?: string
    text: string
}
interface InterfaceMessagesServiceIndex {
    user_id: string
}

class MessagesService {
    async create({ user_id, admin_id, text }: InterfaceMessagesServiceCreate) {
        const userRepository =await getCustomRepository(UserRepository)
        const messagesRepository =await getCustomRepository(MessageRepository)

        const userAlreadyExists = await userRepository.findOne({
            id: user_id,
        })
        if (!userAlreadyExists) {
            throw new Error('User not exists!')
        }
        const message = await messagesRepository.create({
            user_id,
            admin_id,
            text,
        })
        await messagesRepository.save(message)

        return message
    }

    async index({ user_id }: InterfaceMessagesServiceIndex) {
        const messagesRepository =await getCustomRepository(MessageRepository)
        const messages = await messagesRepository.find({
            where: { user_id },
            relations: ['user'],
        })

        return messages
    }
}

export { MessagesService }
