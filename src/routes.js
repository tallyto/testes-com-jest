const {Router} = require('express')

const routes =Router()
const UserController = require('./app/controllers/UserController')
routes.get("/", (req, res)=> {
  res.send("Hello World")
})

routes.post('/users', UserController.store)


module.exports = routes