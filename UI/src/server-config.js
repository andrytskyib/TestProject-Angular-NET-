const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const user = require('./db.json').user;

server.use(middlewares)

server.use(jsonServer.bodyParser)
server.post('/login', (req, res) => {
  const currUser = user.find(user => user.email === req.body.email)
  if (currUser && req.body.email === currUser.email && req.body.password === currUser.password) {
    res.jsonp(currUser.id)
  } else {
    res.jsonp(null)
  }
})

server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
