var cart = JSON.parse(localStorage.getItem("cart"))
// variable para guardar la cantidad de productos que van al carrito
var cartCount = document.getElementById("cant-prod-carr")
var cartContainer = document.querySelector(".cont-cart")

cartCount.textContent = cart.length
console.log(cartCount)

function renderCart(){
  cartContainer.innerHTML = ""  // se borraron los elementos y los eventos
  cart.forEach(function(producto){

    cartContainer.innerHTML += `
    <div class="cart-item">
    <div class="row">
      <div class="col-md-2">
        <img src="${producto.image}" alt="Imagen del producto" class="img-fluid">
      </div>
      <div class="col-md-8">
        <h3>${producto.name}</h3>
        <p>Precio: $${producto.price}</p>
        <p>Cantidad: 1</p>
      </div>
      <div class="col-md-2">
        <button class="btn btn-danger remove-btn" id="btn-delete-${producto.id}">Eliminar</button>
      </div>
    </div>
  </div>
  `
  
  }) // fin del cart.forEach
  
  addbtnDeleteEvents()
}

function addbtnDeleteEvents(){
  cart.forEach(function(producto){
    var btnDelete = document.getElementById("btn-delete-"+producto.id)
    btnDelete.addEventListener("click",function(){
        cart = cart.filter(function(pr){
           return pr.id !== producto.id
        })
        localStorage.setItem("cart", JSON.stringify(cart))
        cartCount.textContent = cart.length
        renderCart()  // se borran elos eventos
    })
 })

}


renderCart()
