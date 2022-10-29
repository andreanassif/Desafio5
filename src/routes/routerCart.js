import {Router} from 'express'
import { Products } from '../components/Products.js'

const products = new Products()
const routerCart = Router()

//Lista todos los productos del carrito
routerCart.get('/:id/products',async (req,res)=>{
    const {id} = req.params
    const cart = await data.getById(id)
    res.send(cart)
})

//Crea nuevo carrito
routerCart.post('/', async(req,res)=>{
    const newId = await data.newId()
    res.send(newId)
})

//Elimina un carrito
routerCart.delete('/:id', async(req,res)=>{
    const {id}= req.params
    const cart = await data.delete(id)
    res.send(cart)
})

//Agrega un producto al carrito
routerCart.post('/:id/productos', async(req,res)=>{
    const {id} = req.params
    const modificacion = req.body
    const cart = await data.addCart(id, modificacion)
    res.send(cart)
})

//Elimina un producto del carrito
routerCart.delete('/:id/productos/:id_prod', async(req,res)=>{
    const {id, id_prod} = req.params
    const cart = await data.deleteCart(id, id_prod)
    res.send(cart)
})

export {routerCart}