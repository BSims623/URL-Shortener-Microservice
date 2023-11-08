require('dotenv').config()
require('express-async-errors')
const cors = require('cors')
const express = require('express')
const connectDB = require('./db/connect')
const shortUrlRouter = require('./routes/urls')
const bodyParser = require('body-parser')
const errorHandlerMiddleware = require('./middleware/error-handler')


const app = express()

app.use(cors())

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use(express.static('./public'))

app.use('/api/shorturl', shortUrlRouter)

app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env['MONGO_URI'])
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error);
  }
}

start()