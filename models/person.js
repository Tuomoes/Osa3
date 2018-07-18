const mongoose = require('mongoose')

const url = 'mongodb://puhlu:sala123@ds155218.mlab.com:55218/puhlumongodb'

mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    number: String
})

module.exports = Person