const http = require('http')

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

const app = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end(JSON.stringify(persons))
})

const port = 3001
app.listen(port)
console.log('Server is running on port', port)