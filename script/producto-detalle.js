// obtener el producto seleccionado a través de local storage
var producto = JSON.parse(localStorage.getItem("selected-product"))

// DOM
// variables para mostrar el detalle del producto seleccionado
var img = document.getElementById("product-img")
var title = document.getElementById("title")
var price = document.getElementById("price")
var description = document.getElementById("description")
// ****************************************************************
// variables para dejar comentarios sobre los productos
var comentarioInput = document.getElementById("comment")
var btnReseña = document.getElementById("btn-reseña")
var raiting = document.getElementById("rating")
var reviewContainer = document.getElementById("reviews-container")
var usuario = document.getElementById("usuario")

var selectedStar = 0
// *****************************************************************

// mostramos la descripoción del producto por pantalla
img.src = producto.image
title.textContent = producto.name
price.textContent = producto.price
description.textContent = producto.description
// ******************************************************************

raiting.addEventListener("change", function(event){
    selectedStar = event.target.selectedIndex
})

btnReseña.addEventListener("click", function(event){
    event.preventDefault()

    // obtener la fecha de la reseña
    var today = new Date()
    var day = today.getDate()
    var month = today.getMonth() + 1
    var year = today.getFullYear()
    // *********************************************************
    reviewContainer.innerHTML += `
    <div class="user-review">
    <p class="review-comment">
      ${comentarioInput.value}
    </p>
    <div class="review-rating">
     ${addStars()}
    </div>
    <p class="review-date">Fecha de la reseña: ${day}/${month}/${year}</p>
    <p class="review-user">Usuario: ${usuario.value}</p>
  </div>
    `
})


function addStars(){
    var str = ""
    for(var i=0;i<=selectedStar;i++){
        str+='<span class="star">&#9733;</span>'
    }
    return str
} 