const express = require('express')
const fs = require('fs')
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const SERVER_PORT = process.env.SERVER_PORT
const SECRET_KEY = 'the_secret_key'

const server = express()
server.use(cors())
server.use(bodyParser.json())

server.get('/', (_, res) => {
  res.json({
    message: 'Welcome to the API.'
  })
})

server.post('/login', (req, res) => {
  const userDB = fs.readFileSync('./db/user.json')
  const userInfo = JSON.parse(userDB)

  if (
    req.body &&
    req.body.email === userInfo.email &&
    req.body.password === userInfo.password
  ) {
    const token = jwt.sign(userInfo, SECRET_KEY)
    res.json({
      token,
      email: req.body.email
    })
  } else {
    res.send(403)
  }
})

server.post('/register', (req, res) => {
  if (req.body) {
    const dbUserEmail = require('./db/user.json').email
    if (dbUserEmail === req.body.email) {
      // 409 Conflict
      res.sendStatus(409)
    } else {
      const user = {
        email: req.body.email,
        password: req.body.password
        // don't forget to encrypt password in PRODUCTION env
      }
      const data = JSON.stringify(user, null, 2)

      fs.writeFile('./db/user.json', data, () => {
        const token = jwt.sign(user, SECRET_KEY)
        res.json({
          token,
          email: req.body.email
        })
      })
    }
  } else {
    res.sendStatus(400)
  }
})

server.get('*', verifyToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err) => {
    if (err) {
      res.sendStatus(401)
    } else {
      res.json({
        dataFromServer: 'data from server 😎'
      })
    }
  })
})

// MIDDLEWARE
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization']

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    req.token = bearerToken
    next()
  } else {
    res.sendStatus(401)
  }
}

server.listen(SERVER_PORT, () => {
  console.log(`Server listen on port ${SERVER_PORT}`)
})
