import { Router } from 'express'
import { PagesControllers } from './app/controllers/PagesControllers'
import { SettingControllers } from './app/controllers/SettingsController'
import { UserControllers } from './app/controllers/UsersControllers'
import { MessageControllers } from './app/controllers/MessagesControllers'

const settingsController = new SettingControllers()
const usersController = new UserControllers()
const messagesController = new MessageControllers()
const pagesController = new PagesControllers()

const routes = Router()

//default
routes.get('/', pagesController.index)
routes.get('/admin', pagesController.admim)

routes.get('/settings/:username', settingsController.findByUserName)
routes.post('/settings', settingsController.create)
routes.put('/settings/:username', settingsController.update)

routes.post('/users', usersController.create)

routes.get('/messages/:user_id', messagesController.index)
routes.post('/messages', messagesController.create)

export { routes }
