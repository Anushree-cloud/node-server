const http = require('http')
// const products =  require('./data/products.json')
const { getProducts, getProduct } = require('./controller/productController')

const server = http.createServer((req, res) => {
    if(req.url === '/api/products' && req.method === 'GET') {
        getProducts(req, res)
        // res.statusCode = 200 //successful
        // res.setHeader('Content-Type', 'text/html') //👈🏼 we can use setHeader.writeHead() instead of statusCode and setHeader
        // res.writeHead(200, { 'Content-Type': 'application/json'}) //we are passing json data from our products.json
        // res.write('<h1>Hello World</h1>')
        // res.write(JSON.stringify(products)) // we even dont need to do this, we can directly pass this value into end()
        // res.end() // end of response
        // res.end(JSON.stringify(products))
    }
    else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3] //url will return /api/products/someId, split will return an array splitted by '/' i.e. [api, products, someId], we need that id which is in the third index of splitted array.
        getProduct(req, res, id)
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/html'})
        res.end('Page not found!')
    }
})

const PORT = process.env.PORT || 5000  //couldn't understand process.env.PORT

server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))