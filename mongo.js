const mongoose = require('mongoose')

const url = 'mongodb://puhlu:sala123@ds155218.mlab.com:55218/puhlumongodb'

mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    number: String
})

if (process.argv.length - 2 == 0) {
    Person
        .find({})
        .then(result => {
            console.log("puhelinluettelo:")
            result.forEach(person => {
                console.log(person.name + " " + person.number)    
            });
        })
}
else if (process.argv.length - 2 == 2) {
    const person = new Person({
        name: process.argv[2],
        number: process.argv[3]
    })
    person
        .save()
        .then(response => {
            console.log("lisätään henkilö " + person.name + " numero " + person.number + " luetteloon")
            mongoose.connection.close()
        })
}
else {
    console.log("invalid arguments")
}

