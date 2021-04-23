import { getCustomRepository, Repository } from 'typeorm'
import { SettingRepository } from '../repositories/SettingRepository'

interface InterfaceSettingsService {
    chat: boolean
    username: string
}

class SettingsService {
    async create({ chat, username }: InterfaceSettingsService) {
        const settingsRepository = getCustomRepository(SettingRepository)

        const userAlreadyExists = await settingsRepository.findOne({
            username,
        })
        if (userAlreadyExists) {
            throw new Error('User Already exists!')
        }
        const settings = await settingsRepository.create({
            chat,
            username,
        })
        await settingsRepository.save(settings)

        return settings
    }
}

export { SettingsService }
