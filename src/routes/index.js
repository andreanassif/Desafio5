import {Router} from 'express'
import { Products } from '../components/Products.js'

const products = new Products()
const router = Router()

router.get('/', (req,res)=>{
    res.render('home')
})

router.post('/api/products', (req,res)=>{
    products.add(req.body)
    console.log(products.getAll())
    res.redirect('/')
})

router.get('/products', (req, res) => {
    res.render('products', { products: products.getAll() })
  })

export {router}