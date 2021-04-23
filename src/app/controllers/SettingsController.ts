import { Request, Response } from 'express'
import { SettingsService } from '../services/SettingsService'

const settingsService = new SettingsService()

class SettingControllers {
    async create(req: Request, res: Response) {
        const { chat, username } = req.body
        try {
            const result = await settingsService.create({ chat, username })
            return res.json(result)
        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    }
}

export { SettingControllers }
