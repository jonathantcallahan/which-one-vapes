const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const celebSchema = new Schema({
    name: String,
    yes: {
        type: Number,
        default: 0
    },
    no: {
        type: Number,
        default: 0
    },
    ratio: {
        type: Number,
        default: 0
    }
})

const Celeb = mongoose.model('Celeb',celebSchema)

module.exports = Celeb