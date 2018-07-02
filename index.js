const express = require('express')
const app = express()

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

app.get('/info', (req, res) => {
    res.send('<p>puhelinluettelossa ' + persons.length + ' henkilön tiedot</p><p>' + new Date() + '</p>')
})

const port = 3001
app.listen(port, () => { console.log('Server is running on port', port) })
