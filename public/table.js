//fetch("/partials/table")

console.log("archivo enlazado")

const socketClient = io()

// variables de los productos

const name = document.getElementById("name")
const price = document.getElementById("price")
const img = document.getElementById("img")

const cargarProd = document.getElementById("cargarProd")
const productDetail = document.getElementById("productDetail")

if(cargarProd){
    cargarProd.addEventListener("click",()=>{
        socketCliente.emit("newProduct", {
            name: name.value,
            price: price.value,
            img: img.value,
        })
    })
}

socketCliente.on("tableData", (data) =>{
    let prods = ""
    statusbar.forEach(elem => {
        prods +=`<tr>
        <td>${elem.name}</td>
        <td>${elem.price}</td>
        <td><img src="${elem.img}" alt="${elem.name}"></td>
        </tr>`
    })
    productDetail.innerHTML = prods
})
