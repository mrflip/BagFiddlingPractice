import Express from 'express'
const UsersRouter = Express.Router()

/* GET users listing. */
UsersRouter.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

export default UsersRouter
