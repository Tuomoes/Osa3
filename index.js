const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

//const mongoose = require('mongoose')

//const url = 'mongodb://puhlu:sala123@ds155218.mlab.com:55218/puhlumongodb'


app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())
//app.use(morgan('tiny'))
app.use(morgan((tokens, req, res) => {
    return[tokens.method(req,res), 
        tokens.url(req, res), 
        JSON.stringify(req.body),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms']
        .join(' ')
}))

let persons = [
    {
        name: "Arto Hellas",
        number: "040-12542",
        id: 1
    },
    {
        name: "Matti Tienari",
        number: "040-234567",
    
        id: 2
    },
    {
        name: "Arto Järvinen",
        number: "040-98765",
        id: 3
    },
    {
        name: "Lea Kutvonen",
        number: "040-356893",
        id: 4
    }
]

/** 
const app = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end(JSON.stringify(persons))
})
*/
const formatPerson = (person) => {
    return {
        name: person.name,
        number: person.number,
        id: person._id
    }
}


app.get('/', (req, res) => {
    res.send('<h1>Hello! Use .../api/persons to get some phone book data out.</h1>')
})


app.get('/api/persons', (req, res) => {
    //res.json(persons)
    Person
        .find({})
        .then(persons => {
            res.json(persons.map(formatPerson))
            //line below related to unfinished subtask 3.14*
           // res.json(persons.map(Person.format))
        })
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    
    let errorStr = ''
    const body = req.body

    //Error checks
    if (!body.name) { errorStr = errorStr + 'Person name is missing. '}
    if (!body.number) { errorStr = errorStr + 'Person number is missing. '}
    if (persons.filter(person => person.name === body.name).length > 0) { errorStr = errorStr + 'Person name must be unque. '}

    if (errorStr != '') {
        return res.status(400).json({error: errorStr})
    }
    
    //const person = req.body
    const person = new Person({
        name: body.name,
        number: body.number
    })

    person
        .save()
        .then(savedPerson => {
            res.json(formatPerson(savedPerson))
        })
        .catch(error => {
            console.log(error)
        })

    //person.id = getRandomInt(0, 9999999)
    //persons = persons.concat(person)
    //res.json(person)
})

const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min)) + min
}

app.get('/info', (req, res) => {
    res.send('<p>puhelinluettelossa ' + persons.length + ' henkilön tiedot</p><p>' + new Date() + '</p>')
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => { console.log('Server is running on port', PORT) })
