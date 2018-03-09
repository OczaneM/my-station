const express = require('express')
const app = express()
const path = require('path')
const PORT = (process.env.PORT || 4001)

app.use(express.static(path.join(__dirname, '.')))

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'))
})

const server = app.listen(PORT, () => console.log(`Listening to port ${PORT}`))
