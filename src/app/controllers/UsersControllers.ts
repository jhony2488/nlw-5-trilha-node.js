import { Request, Response } from 'express'
import { UsersService } from '../services/UsersService'

const usersService = new UsersService()

class UserControllers {
    async create(req: Request, res: Response) {
        const { email } = req.body
        try {
            const result = await usersService.create({ email })
            return res.json(result)
        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    }
}

export { UserControllers }
