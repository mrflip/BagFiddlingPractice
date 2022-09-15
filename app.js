import Express from 'express'
import JSPath from 'path'
import CookieParser from 'cookie-parser'
import Logger from 'morgan'

import IndexRouter from './routes/HomeRouter.js'
import UsersRouter from './routes/UsersRouter.js'

const App = Express()

App.use(Logger('dev'))
App.use(Express.json())
App.use(Express.urlencoded({ extended: false }))
App.use(CookieParser())
App.use(Express.static(JSPath.join('.', 'public')))

App.use('/', IndexRouter)
App.use('/users', UsersRouter)

const listener = App.listen(8080, function () {
  console.log('Listening on port ' + listener.address().port)
})
