const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()

const PORT = process.env.PORT || process.argv[2] || 3002

const MONGODB_URI = 'mongodb://wwv:password1@ds213715.mlab.com:13715/wwv'

mongoose.Promise = Promise
mongoose.connect(MONGODB_URI)

// app.use(express.static(path.join(__dirname,'client/build')))

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))