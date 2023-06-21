var state = {
    allproducts:[],
    productsToRender:[],  // pagination
    man:[], 
    woman:[],
    children:[],
    index:0,
    cart:[]
}

  // DOM
     var contenedor = document.querySelector(".products")
     // variables para filtrar mayor y menor y viceversa
     var filterMayorMenor = document.getElementById("filter-mayor-menor")
     var filterMenorMayor = document.getElementById("filter-menor-mayor")
     // variables para buscar los productos
     var inputSearch = document.getElementById("input-search")
     var btnSearch = document.getElementById("btn-search")
     // variable para cambiar el título de la página
     var title = document.getElementById("title-page")
     // variable para filtrar de A-Z y Z-A
     var filter_A_Z = document.getElementById("A-Z")
     var filter_Z_A = document.getElementById("Z-A")
     // variable para filtrar categorias
     var categoryMan = document.getElementById("category-man")
     var categoryWoman = document.getElementById("category-woman")
     var categoryChild = document.getElementById("category-child")
     var todo = document.getElementById("all-products")
     // variable para guardar la cantidad de productos que van al carrito
     var cartCount = document.getElementById("cant-prod-carr")
  // ****************************************************************************

fetch("https://648795c6beba62972790d44d.mockapi.io/api/products/products")
.then(function(data){
    data.json().then(function(productos){
        // todo nuestro codigo va aca
          state.allproducts = productos
          
          // filtrar los productos por categorías
          state.man = productos.filter(function(product){
              return product.category === "Hombre"
          })
          state.woman = productos.filter(function(product){
              return product.category === "Mujer"
          })
          state.children = productos.filter(function(product){
              return product.category === "Niño"
          })

          // paginacion
          // Creamos la primera pagina
           state.productsToRender = createPagination(state.allproducts)
           // **********************************************************
                         
           // haciendo renders para actualizar la pagina
           renderProducts()    
           renderPagination()
           actualizarPagIndice()         

// **************************************************************************           
// Funciones
// Crear paginacion
function createPagination(products){
  var productsCopy = [...products]
  var allProducts = []
  for(var i=0;i<productsCopy.length;i++){
     var pagina = productsCopy.splice(0,6)
     allProducts.push(pagina)
    }  // fin del for
  return allProducts
}  // fin de createPagination
// **************************************************************************

// Imprimir los productos por pantalla
function renderProducts(){
  // limpiar contenedor de la pagina
  contenedor.innerHTML = ""   
  // creando los productos
  state.productsToRender[state.index].forEach(function(producto, index){
    contenedor.innerHTML += `
  <div class="card" style="width: 18rem;" id="card-producto-${index}">
  <img src="${producto.image}" class="card-img-top" alt="product">
  <div class="card-body">
    <h5 class="card-title">${producto.name}</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">$${producto.price}</h6>
    <p class="card-text">${producto.description}</p>
    <button class=" btn-cart">Añadir al carrito</button>
  </div>
</div> 
  `
 })  // Fin de allProducts[indice].forEach(function(producto)

 state.productsToRender[state.index].forEach(function(producto,index){
    var card = document.getElementById("card-producto-"+index)
    var img = card.querySelector("img")
    var button = card.querySelector("button")

    img.addEventListener("click", function(){
       localStorage.setItem("selected-product", JSON.stringify(producto))
       window.location.href = "producto-detalle.html"
    })  // fin de card.addEvenListener

    button.addEventListener("click", function(){
        if(button.textContent === "Añadir al carrito"){
            state.cart.push(producto)
            cartCount.textContent = state.cart.length
            button.textContent = "Sacar del Carrito"
            button.style.backgroundColor = "red"
        }else{
            state.cart = state.cart.filter(function(pr){
               return pr.name !== producto.name
            })

            cartCount.textContent = state.cart.length
            button.textContent = "Añadir al carrito"
            button.style.backgroundColor = "#007bff"

          }

          localStorage.setItem("cart", JSON.stringify(state.cart))
    })

 }) // fin products[indice].forEach
}  // fin de renderProducts
// **************************************************************************************

// Renderizar la pagina
function renderPagination(){
  var products = state.productsToRender
 
  // DOM
  var pagination = document.querySelector(".pagination")
  // ***********************************************************************************************************
  // acá creamos los botones para desplazar las paginas
  pagination.innerHTML = ""

  pagination.innerHTML += '<li class="page-item"><button class="page-link" id="btn-prev">Anterior</button></li>' 
  for(var i=0;i<products.length;i++){
   pagination.innerHTML += `<li class="page-item"><a class="page-link" href="#">${i+1}</a></li>`
  }           
  pagination.innerHTML += '<li class="page-item"><button class="page-link" id="btn-next">Siguiente</button></li>' 
  // ***********************************************************************************************************
  // variables para almacena los botones anterior y siguiente cuando se presionan
  var btnNext = document.getElementById("btn-next")
  var btnPrev = document.getElementById("btn-prev")

  // Eventos 
  btnNext.addEventListener("click", function(){
    nextPage(products)
  })
  btnPrev.addEventListener("click", function(){
    prevPage(products)
  })
}
// **************************************************************************

// actualizar la pagina
function actualizarPagIndice(){
  var indices =document.querySelectorAll(".page-link")

  indices.forEach(function(li){
    if(li.textContent == state.index + 1){
      li.classList.add("active")
    }else{
      li.classList.remove("active")
    }
  })
}

// **************************************************************************************

function nextPage(products){
  if(state.index < products.length-1){
    state.index++
    actualizarPagIndice()
    renderProducts(products)
  }
}

// *************************************************************************************

function prevPage(products){
  if (state.index > 0){
    state.index--
    actualizarPagIndice()
    renderProducts(products)
  }
}

// *************************************************************************************

// filtrar los productos según la opcion elegida
function filterProducts(filter){
    state.index = 0
    // var sortedPag;
    var products = state.productsToRender.flat()
    switch (filter) {
        case "mayor-menor":
           products.sort(function(a,b){
              return b.price - a.price
            })
           break;  
        case "menor-mayor":
            products.sort(function(a,b){
               return a.price - b.price
             })
            break;  
        case "A-Z":
            products.sort(function(a,b){
                if(a.name > b.name){
                    return 1;
                }else{
                    return -1;
                }
                return 0;
            }) 
            break;
        case "Z-A":
              products.sort(function(a,b){
                  if(a.name > b.name){
                      return -1;
                  }else{
                      return 1;
                  }
                  return 0;
              })
            break;                  
        default:
            break;    
    } // fin del switch

    state.productsToRender = createPagination(products)
    renderProducts()
    renderPagination()
    actualizarPagIndice()

} // fin de filterProducts
// ************************************************************************************

// Eventos
btnSearch.addEventListener("click", function(evento){
    // [{},{},{}]
    // [[{},{}],[{}]]
    evento.preventDefault()   /*  acá se puede ver la cantidad de click que se hacen sobre buscar */

    var filtered = state.allproducts.filter(function(producto){
      return producto.name.includes(inputSearch.value)
    })
    state.index = 0
    state.productsToRender = createPagination(filtered) 
    renderProducts()
    renderPagination()
    actualizarPagIndice()
    title.textContent = "Resultado de tu búsqueda"
}) // fin del btnSearch
// ****************************************************************************


filterMayorMenor.addEventListener("click",function(){
    filterProducts("mayor-menor")
})
// ****************************************************************************

filterMenorMayor.addEventListener("click",function(){
  filterProducts("menor-mayor")
})
// ****************************************************************************

filter_A_Z.addEventListener("click",function(){
  filterProducts("A-Z")
})
// ****************************************************************************

filter_Z_A.addEventListener("click",function(){
  filterProducts("Z-A")
})
// ****************************************************************************

categoryMan.addEventListener("click", function(){
  state.productsToRender = createPagination(state.man)
  state.index = 0
  renderProducts()
  renderPagination()
  actualizarPagIndice()
})

categoryWoman.addEventListener("click", function(){
  state.productsToRender = createPagination(state.woman)
  state.index = 0
  renderProducts()
  renderPagination()
  actualizarPagIndice()
})

categoryChild.addEventListener("click",function(){
  state.productsToRender = createPagination(state.children)
  state.index = 0
  renderProducts()
  renderPagination()
  actualizarPagIndice()
})

todo.addEventListener("click",function(){
  state.productsToRender = createPagination(state.allproducts)
  state.index = 0
  renderProducts()
  renderPagination()
  actualizarPagIndice()
})

    })  // Fin de data.json().then(function(productos))
  
})   // Fin de .then(function(data))