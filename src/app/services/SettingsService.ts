import { getCustomRepository, Repository } from 'typeorm'
import { Setting } from '../entities/Setting'
import { SettingRepository } from '../repositories/SettingRepository'

interface InterfaceSettingsService {
    chat: boolean
    username: string
}

class SettingsService {
    async create({ chat, username }: InterfaceSettingsService) {
        const settingsRepository = await getCustomRepository(SettingRepository)
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

    async findByUserName(username: string) {
        const settingsRepository = await getCustomRepository(SettingRepository)
        const settings = await settingsRepository.findOne({
            username,
        })

        return settings
    }
    async update(username: string, chat: boolean) {
        const settingsRepository = await getCustomRepository(SettingRepository)
        const settings = await settingsRepository
            .createQueryBuilder()
            .update(Setting)
            .set({ chat })
            .where('username= :username', {
                username,
            })
            .execute()

        return settings
    }
}

export { SettingsService }
