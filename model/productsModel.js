let products = require('../data/products.json')
const { v4: uuidv4 } = require('uuid')
const { writeDataToFile } = require('../util')

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products)
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const product = products.find((product) => {
            return product.id === id
        })
        resolve(product)
    })
}

function create(product) {
    return new Promise((resolve, reject) => {
        const newProduct = {id: uuidv4(), ...product} //uuidv4() will generate unique id for each newly added products
        products.push(newProduct) // pushing the newProduct object as an element of products array.
        writeDataToFile('./data/products.json', products)
        resolve(newProduct)
    })
}

function update(id, productData) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((product) => {
            return product.id === id
        })
        products[index] = {id, ...productData}
        writeDataToFile('./data/products.json', products)
        resolve(products[index])
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        products = products.filter((product) => {
            product.id !== id
        })
        writeDataToFile('./data/products.json', products)
        resolve(products)
    })
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}