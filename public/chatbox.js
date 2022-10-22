
//inicializamos socket del lado del front
console.log("javascript funcionando");

const socketClient = io();

let user;

Swal.fire({
    title:"Bienvenido/a",
    text:"bienvenido, ingresa tu email",
    input:"email",
    allowOutsideClick:false
}).then(respuesta=>{
    // console.log(respuesta)
    user = respuesta.value;
});

const campo = document.getElementById("messageField")

campo.addEventListener("keydown",(evt)=>{
    console.log(evt.key)
    if(evt.key === "Enter"){
        socketClient.emit("message",{
            userEmail:user,
            message:campo.value,
            hora: new Date()
        })
        campo.value=""
    }
})


const messageContainer = document.getElementById("messageContainer");

socketClient.on("historico",(data)=>{
    let elementos="";
    data.forEach(item=>{
    elementos = elementos + `<p><strong class="text-primary">${item.userEmail}</strong> <strong class="text-danger">${item.hora}</strong>: ${item.message}</p>`;
    });
    messageContainer.innerHTML = elementos;
})

//socketClient.on("newUser",()=>{
//    Swal.fire({
//        text:"nuevo usuario conectado",
//        toast:true
//    })
//})

//este archivo tiene que estar siempre en la carpeta public porque es para html (front)