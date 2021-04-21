import { Router } from 'express'
import { SettingControllers } from './app/controllers/SettingsController'

const settingsController = new SettingControllers()

const routes = Router()

//default
routes.get('/', (req, res) => {
    res.json({ version: '1.0.0' })
})

routes.post('/settings', settingsController.create)

export { routes }
