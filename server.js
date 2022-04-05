const http = require('http')
let users = require('./users.json')
const { writeDataToFile } = require('./utils')

// {
//     "name": "New4" - POST or PUT
// }

// PORT - http://localhost:5000/

const server = http.createServer((req, res) => {
    if(req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(users))
    } else if(req.method === 'POST') {
        res.writeHead(201, { 'Content-Type': 'application/json' })
        try {
            let body = ''
            req.on('data', (chunk) => {
                body += chunk.toString()
            })

            req.on('end', () => {
                const { name } = JSON.parse(body)
                const user = {
                    name
                }
                users.push(user)
                writeDataToFile('./users.json', users)
                res.writeHead(201, { 'Content-Type': 'application/json' })
                return res.end(JSON.stringify(user))
            })
        } catch (error) {
            console.error(err)
        }
    } else if(req.method === 'PUT') {
        res.writeHead(201, { 'Content-Type': 'application/json' })
        try {
            let body = ''
            req.on('data', (chunk) => {
                body += chunk.toString()
            })

            req.on('end', () => {
                const { name } = JSON.parse(body)
                const user = {
                    name
                }
                //writeDataToFile('./users.json', [])
                writeDataToFile('./users.json', [user])
                res.writeHead(201, { 'Content-Type': 'application/json' })
                return res.end(JSON.stringify(user))
            })
        } catch (error) {
            console.error(err)
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'an error occurred while executing the request' }))
    }
})


const PORT =  process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

module.exports = server;