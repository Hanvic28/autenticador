const express = require('express')
const routerUsuario = require('./src/routes/routerUsuario.js')
const bodyParser = require('body-parser');
const app = express()
const port = 32

app.use(bodyParser.urlencoded({ extended: true }))
app.use(routerUsuario)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})