import { Request, Response } from 'express'

class PagesControllers {
    async index(req: Request, res: Response) {
        try {
            return res.render('html/client.html')
        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    }

    async admim(req: Request, res: Response) {
        try {
            return res.render('html/admin.html')
        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    }
}

export { PagesControllers }
