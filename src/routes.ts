import { Router } from 'express'
import { SettingControllers } from './app/controllers/SettingsController'
import { UserControllers } from './app/controllers/UsersControllers'
import { MessageControllers } from './app/controllers/MessagesControllers'

const settingsController = new SettingControllers()
const usersController = new UserControllers()
const messagesController = new MessageControllers()

const routes = Router()

//default
routes.get('/', (req, res) => {
    res.render('html/client.html')
})

routes.post('/users', usersController.create)

routes.get('/messages/:user_id', messagesController.index)
routes.post('/messages', messagesController.create)

routes.post('/settings', settingsController.create)

export { routes }
