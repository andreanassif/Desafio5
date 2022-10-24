import express from 'express'
import {router} from './src/routes/index.js'
import {engine} from 'express-handlebars'
import { Server } from 'socket.io'
import path from 'path'
import { fileURLToPath } from 'url'
import { Products } from './src/components/Products.js'
import fs from 'fs'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine('hbs', engine({extname: 'hbs'}))
app.set('view engine', 'hbs')
app.set('views', './src/views')


app.use('/', router)



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname+'/public'))

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, ()=>console.log(`Server ready on port ${PORT}`))

const io = new Server(server)


//levantar socket del servidor
const historicoMensajes = [];

io.on("connection",(socket)=>{
    console.log("nuevo usuario conectado", socket.id);
    socket.broadcast.emit("newUser");
    socket.emit("historico",historicoMensajes)
    socket.on("message",data=>{
        console.log(data);
        historicoMensajes.push(data);
        fs.writeFileSync('./messages.txt', JSON.stringify(historicoMensajes))
        io.sockets.emit("historico",historicoMensajes);
    })
    socket.on("newProduct", newProduct=>{
        Products.push(newProduct)
        fs.writeFileSync('/products.txt', JSON.stringify(Products))
        io.sockets.emit("tableData", Products)
    })
})

