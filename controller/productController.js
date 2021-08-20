const Product = require('../model/productsModel')

//  desc: get all products
// route: GET /api/products
async function getProducts(req, res) {
    try {
        const products = await Product.findAll()
        res.writeHead(200, { 'Content-Type': 'application/json'})
        res.end(JSON.stringify(products))
    } catch (error) {
        console.log(error);
    }
}

//  desc: get single products
// route: GET /api/product/:id
async function getProduct(req, res, id) {
    try {
        const product = await Product.findById(id)
        if(product){
            res.writeHead(200, { 'Content-Type': 'application/json'})
            res.end(JSON.stringify(product))
        }
        else{
            res.writeHead(404, {'Content-Type': 'text/html'})
            res.end('Page not found!')
        }
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getProducts,
    getProduct
}