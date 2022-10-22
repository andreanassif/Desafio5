import express from 'express'
import {router} from './src/routes/index.js'
import {engine} from 'express-handlebars'
import { Server } from 'socket.io'
import path from 'path'
import { fileURLToPath } from 'url'

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
const server = app.listen(PORT, ()=>console.log(`Server ready on port ${8080}`))

const io = new Server(server)

let log = []
//levantar socket del servidor
io.on ("connection", (socket) =>{
    console.log("nuevo cliente socket conectado", socket.id)

    socket.emit("messageFromServer", "conexion exitosa")

    socket.on("letras", (dataDelCliente)=>{
        console.log(dataDelCliente)
    })
})


