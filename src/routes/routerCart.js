import {Router} from 'express'
import { Products } from '../components/Products.js'

const products = new Products()
const routerCart = Router()

//Lista todos los productos del carrito
routerCart.get('/:id/products', (req,res)=>{
    const {id} = req.params
    const cart = products.getById(id)
    res.send(cart)
})

//Crea nuevo carrito
routerCart.post('/', (req,res)=>{
    const newId = products.newId()
    res.send(newId)
})

//Elimina un carrito
routerCart.delete('/:id', (req,res)=>{
    const {id}= req.params
    const cart = products.delete(id)
    res.send(cart)
})

//Agrega un producto al carrito
routerCart.post('/:id/productos', (req,res)=>{
    const {id} = req.params
    const modificacion = req.body
    const cart = products.addCart(id, modificacion)
    res.send(cart)
})

//Elimina un producto del carrito
routerCart.delete('/:id/productos/:id_prod', (req,res)=>{
    const {id, id_prod} = req.params
    const cart = products.deleteCart(id, id_prod)
    res.send(cart)
})

export {routerCart}