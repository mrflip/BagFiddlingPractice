import Express from 'express'
const HomeRouter = Express.Router()

/* GET home page. */
HomeRouter.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

export default HomeRouter
