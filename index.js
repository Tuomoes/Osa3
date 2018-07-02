const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

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



app.get('/', (req, res) => {
    res.send('<h1>Hello! Use .../api/persons to get some phone book data out.</h1>')
})


app.get('/api/persons', (req, res) => {
    res.json(persons)
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

    if (!body.name) { errorStr = errorStr + 'Person name is missing. '}
    if (!body.number) { errorStr = errorStr + 'Person number is missing. '}
    if (persons.filter(person => person.name === body.name).length > 0) { errorStr = errorStr + 'Person name must be unque. '}

    if (errorStr != '') {
        return res.status(400).json({error: errorStr})
    }
    
    const person = req.body
    person.id = getRandomInt(0, 9999999)
    persons = persons.concat(person)
    res.json(person)
})

const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min)) + min
}

app.get('/info', (req, res) => {
    res.send('<p>puhelinluettelossa ' + persons.length + ' henkilön tiedot</p><p>' + new Date() + '</p>')
})

const port = 3001
app.listen(port, () => { console.log('Server is running on port', port) })
