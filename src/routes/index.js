import {Router} from 'express'
import { Products } from '../components/Products.js'

const products = new Products()
const routerProducts = Router()

//verif rol

const rol = "admin";

const verificarRol = (req,res,next)=>{
    if(rol === "admin"){
        next();
    } else{
        res.send("no tienes acceso a esta ruta"
        )
    }
}

routerProducts.get('/', async (req,res)=>{
    const list = await data.getAll()
    res.render('products', {products:list})
})


routerProducts.get('/:id', async (req,res)=>{
    const {id} =req.params
    const prod = await data.getById(id)

    if(prod){
        res.render('prod',{producto:prod})
    }else{
        return res.json({
            message:"el producto no existe"
        })
    }
})


routerProducts.post('/', verificarRol, async (req,res)=>{
    const newProduct = products.add(req.body)
    await data.save(newProduct)

    if(rol === "admin"){
        res.send(data)
    }else{
        return res.json({
            message: "no tienes acceso a esta ruta"
        })
    }
})

routerProducts.put('/:id', verificarRol, async (req,res)=>{
    const {id} =req.params
    const modificacion = req.body

    if(rol === "admin"){
        const prod = await data.getById(id, modificacion)
        res.send(prod)
    }else{
        return res.json({
            message: "no tienes acceso  esta ruta"
        })
    }
})

routerProducts.delete('/:id', verificarRol, async (req,res)=>{
    const {id} = req.params

    if(rol === "admin"){
        const prod = await data.delete(id)
        res.send(prod)
    }else{
        return res.json({
            message: "no tienes acceso  esta ruta"
        })
    }
})


export {routerProducts}