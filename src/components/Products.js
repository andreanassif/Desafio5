class Products {
    constructor(){
        this.products = [
            {
                id: 1,
                name: "Velador Espiraldo Mod7",
                price: 2500,
                img: "https://res.cloudinary.com/dhndpus6m/image/upload/v1659131863/Locosen3D/velador-blanco-modelo7_vo5kef.jpg"
              },
              {
                id: 2,
                name: "Velador Espiraldo Mod33",
                price: 2700,
                img: "https://res.cloudinary.com/dhndpus6m/image/upload/v1659131863/Locosen3D/velador-naranja-modelo33_vtknpl.jpg"
              },
              {
                id: 3,
                name: "Velador Espiraldo Mod3",
                price: 2300,
                img: "https://res.cloudinary.com/dhndpus6m/image/upload/v1659131863/Locosen3D/velador-on-fucsia-modelo3_gb9xaq.jpg"
              },
        ]
        
        this.numberOfProducts = this.products.length
    }

    add = (product) => {
      const lastItem = this.products[this.numberOfProducts - 1]
      const lastId = lastItem.id 
      const nextId = lastId +1
      product.id = nextId
      this.products.push(product)
      this.numberOfProducts++
    }

    getById = (id) => {
      let lookPos = this.#getProductPos(id)

      if(!lookPos) return null

      return this.products[lookPos]
    }

    delete = (id)=> {
      const actualProducts = [...this.products]
      const filteredProducts = actualProducts.filter((product) => product.id !== parseInt(id))
      this.products = [...filteredProducts]
      this.numberOfProducts = this.products.length
    }

    getAll = () => {
      return this.products
    }
    
    update = (id, product) => { 
    let lookPos = this.#getProductPos(id)
    if (!lookPos) return null 
    product.id = id
    this.products[lookPos] = product
    return true  
    }

    #getProductPos = (id) => {
      let pos = null

      for (let i=0; i < this.numberOfProducts; i++) {
        if (this.products[i].id === parseInt(id)) {
          pos = i
          break;
        }
      }

      return pos;
    }

 }

export {Products} 