function totalItems() {
 let jsonProducts = JSON.parse(localStorage.getItem("newProducts"));
 let totalProducts = localStorage.getItem("saveProducts");
 let totalCounter = document.getElementById('counterItems');
   totalCounter.innerHTML = totalProducts;

 console.log(totalProducts);
 console.log(jsonProducts);

}

totalItems();
