import './config/database'
import './app/websocket/client'
import './app/websocket/admin'

const app = require('./app')

app.server()
