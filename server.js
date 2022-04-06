const http = require('http')
let users = require('./users.json')
const { writeDataToFile } = require('./utils')

// {
//     "name": "New4" - POST or PUT
// }

// PORT - http://localhost:5000/

const server = http.createServer((req, res) => {
    switch (req.method) {
        case 'GET':
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(users))
            break;
        case 'POST':
            res.writeHead(201, { 'Content-Type': 'application/json' })
            try {
                let body = ''
                req.on('data', (chunk) => {
                    body += chunk.toString()
                })

                req.on('end', () => {
                    const user = JSON.parse(body)
                    users.push(user)
                    writeDataToFile('./users.json', users)
                    res.writeHead(201, { 'Content-Type': 'application/json' })
                    return res.end(JSON.stringify(user))
                })
            } catch (error) {
                console.error(err)
            }
            break;
        case 'PUT':
            res.writeHead(201, { 'Content-Type': 'application/json' })
            try {
                let body = ''
                req.on('data', (chunk) => {
                    body += chunk.toString()
                })

                req.on('end', () => {
                    const users = JSON.parse(body)
                    writeDataToFile('./users.json', users)
                    res.writeHead(201, { 'Content-Type': 'application/json' })
                    return res.end(JSON.stringify(users))
                })
            } catch (error) {
                console.error(err)
            }
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'an error occurred while executing the request' }))
    }
})


const PORT =  process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

module.exports = server;