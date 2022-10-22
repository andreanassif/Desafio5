
//inicializamos socket del lado del front
console.log("hola")

const socketCliente = io()

socketCliente.on("messageFromServer", (data)=>{
    console.log(data)
})

const messageField = document.getElementById("messageField")

messageField.addEventListener("keydown",(evt)=>{
    console.log(evt.key)
    socketCliente.emit("letras",evt.key)
})