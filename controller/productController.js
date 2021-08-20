const Product = require('../model/productsModel')
const { getPostData } =  require('../util')


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

//  desc: post a products
// route: POST /api/products/
async function createProduct(req, res) {
    try {
        const body = await getPostData(req)
        const { name, description, price } = JSON.parse(body)
        let product = {
            name,
            description,
            price,
        }
        let newProduct = await Product.create(product)
        res.writeHead(201, { 'Content-Type': 'application/json'})
        return res.end(JSON.stringify(newProduct))
    } 
    catch (error) {
        console.log(error);
    }
}

//  desc: update a products
// route: PUT /api/products/:id
async function updateProduct(req, res, id) {
    try {
        const product = await Product.findById(id)

        if(product){
            const body = await getPostData(req)
            const { name, description, price } = JSON.parse(body)
            let productData = {
                name: name || product.name,
                description: description || product.description,
                price: price || product.price,
            }
            const updatedProduct = await Product.update(id, productData)
            res.writeHead(200, { 'Content-Type': 'application/json'})
            return res.end(JSON.stringify(updatedProduct))
        }
        else {
            res.writeHead(404, {'Content-Type': 'text/html'})
            res.end('Page not found!')
        }
        
    } 
    catch (error) {
        console.log(error);
    }
}

//  desc: delete a products
// route: DELETE /api/products/:id
async function deleteProduct(req, res, id) {
    try {
        const product = await Product.findById(id)
        if(product){
            await Product.remove(product)
            res.writeHead(200, { 'Content-Type': 'application/json'})
            res.end(JSON.stringify({ message: `Product ${id} removed!`}))
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
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}