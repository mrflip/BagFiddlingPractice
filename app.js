import Express from 'express'
import JSPath from 'path'
import CookieParser from 'cookie-parser'
import Logger from 'morgan'

import IndexRouter from './routes/index.js'
import UsersRouter from './routes/users.js'

const App = Express()

app.use(Logger('dev'))
app.use(Express.json())
app.use(Express.urlencoded({ extended: false }))
app.use(CookieParser())
app.use(Express.static(JSPath.join(__dirname, 'public')))

app.use('/', IndexRouter)
app.use('/users', UsersRouter)

const listener = App.listen(8080, function () {
  console.log('Listening on port ' + listener.address().port)
})
