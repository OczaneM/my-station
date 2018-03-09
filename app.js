const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const path = require('path')
const PORT = (process.env.PORT || 4001)

app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.use(express.static(path.join(__dirname, '.')))

app.use('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, './index.html'))
  next()
})

app.post('/idToken', (req, res, next) => {
  let {idtoken} = req.body
  res.send(idtoken)
})

const server = app.listen(PORT, () => console.log(`Listening to port ${PORT}`))
