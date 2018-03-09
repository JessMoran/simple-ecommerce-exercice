function drawProducts(data) {
  let products = data.products;
  let productsContainer = document.getElementById("products-container");
  products.forEach((product, index) => {
    let productHTML = createProductHTML(product);
    productsContainer.appendChild(productHTML);
  });
}

function createProductHTML(product) {
  let template = `
    <h3 class="plantsName">${product.title}</h3>
    <img class="plants" src='${product.imageUrl}' alt='${product.description}'/>
    <p class="price"> Price: ${product.price} MXN</p>
    <button data-product-id=${product.id}
      onclick="addToCart(this,${product.id})"
      class='btn btn-primary'>
        Agregar a carrito
      </button>
    <hr/>
  `;
  let productContainer = document.createElement("div");
  productContainer.className = "col text-center";
  productContainer.innerHTML = template;
  return productContainer;

}

drawProducts(data);

  let cartProducts = [];

function addToCart(btnEvent,productId) {

  if (btnEvent.classList.contains('clicked') == false ) {
    increaseCounter();
    changeButtonStatus(btnEvent,false);

    let newArray = data.products.filter(function(element){
      if (productId == element.id) {
          cartProducts.push(element);
      }
    })
   console.log(cartProducts);

   localStorage.setItem("newProducts",JSON.stringify(cartProducts));



  }else if (btnEvent.classList.contains('clicked') == true ){
    decreaseCounter()
    changeButtonStatus(btnEvent,true);
    removeFromCart(productId)
    console.log(cartProducts);
  }

}

function removeFromCart(productId) {
  cartProducts = cartProducts.filter(function(element){
    return  element.id !== productId
    console.log(newArray);
  });
}

function increaseCounter() {
  let counter = parseInt(document.getElementById("counterItems").textContent);
  let counter2 = document.getElementById("counterItems");
  counter += 1
  counter2.innerHTML = counter;
  saveItemsContent(counter)
}

function decreaseCounter() {
  let counter = parseInt(document.getElementById("counterItems").textContent);
  let counter2 = document.getElementById("counterItems");
  counter -= 1
  counter2.innerHTML = counter;
  saveItemsContent(counter)
}

function changeButtonStatus(button,boolean) {
  if (boolean == false) {
    button.innerText = ("Quitar del carrito");
    button.classList.toggle("clicked");
  }else if (boolean == true) {
    button.innerText = ("Agregar al carrito");
    button.classList.toggle("clicked");
  }
}

function saveItemsContent (counter){
  localStorage.setItem("saveProducts",counter);
}
