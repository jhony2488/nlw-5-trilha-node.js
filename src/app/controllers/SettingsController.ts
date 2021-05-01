import { Request, Response } from 'express'
import { SettingsService } from '../services/SettingsService'

const settingsService = new SettingsService()

interface IsUpdate {}

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
    async findByUserName(req: Request, res: Response) {
        const { username } = req.params

        try {
            const result = await settingsService.findByUserName(username)
            return res.json(result)
        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    }
    async update(req: Request, res: Response) {
        const { username } = req.params
        const { chat } = req.body

        try {
            const result = await settingsService.update(username, chat)
            return res.json(result)
        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    }
}

export { SettingControllers }
