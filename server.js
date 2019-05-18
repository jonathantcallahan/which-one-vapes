const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const PORT = process.env.PORT || process.argv[2] || 3002

const MONGODB_URI = 'mongodb://wwv:password1@ds137206.mlab.com:37206/muppets'

mongoose.Promise = Promise
mongoose.connect(MONGODB_URI, { useNewUrlParser:true })

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
// app.use(express.static(path.join(__dirname,'client/build')))

const Celeb = require('./models/celeb')
const api = require('./controllers/api')
api(app, Celeb)

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))