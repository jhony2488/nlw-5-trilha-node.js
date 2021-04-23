import { Request, Response } from 'express'
import { MessagesService } from '../services/MessagesService'

const messagesService = new MessagesService()

class MessageControllers {
    async create(req: Request, res: Response) {
        const { user_id, admin_id, text } = req.body
        try {
            const result = await messagesService.create({
                user_id,
                admin_id,
                text,
            })
            return res.json(result)
        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    }
    async index(req: Request, res: Response) {
        const { user_id } = req.params
        try {
            const result = await messagesService.index({
                user_id,
            })
            return res.json(result)
        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    }
}

export { MessageControllers }
