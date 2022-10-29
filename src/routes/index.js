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

routerProducts.get('/', (req,res)=>{
    const list = products.getAll()
    res.render('products', {products:list})
})


routerProducts.get('/:id', (req,res)=>{
    const {id} =req.params
    const prod = products.getById(id)

    if(prod){
        res.render('prod',{producto:prod})
    }else{
        return res.json({
            message:"el producto no existe"
        })
    }
})


routerProducts.post('/', verificarRol, (req,res)=>{
    const newProduct = products.add(req.body)
    products.save(newProduct)
        res.send(products)
    
})

routerProducts.put('/:id', verificarRol,  (req,res)=>{
    const {id} =req.params
    const modificacion = req.body
   
    const prod = products.getById(id, modificacion)
    res.send(prod)
    
})

routerProducts.delete('/:id', verificarRol, (req,res)=>{
    const {id} = req.params
        const prod = products.delete(id)
        res.send(prod) 
})


export {routerProducts}