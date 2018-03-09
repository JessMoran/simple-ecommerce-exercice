
function totalItems (){
  let jsonProducts = JSON.parse(localStorage.getItem("newProducts"));
  let totalProducts = localStorage.getItem("saveProducts");
  let totalCounter = document.getElementById("counterItems");
  totalCounter.innerHTML = totalProducts;
  //console.log(totalProducts,totalProducts);
  addPriceNtitle(jsonProducts);
}

function addPriceNtitle (jsonProducts){
    let template = '';
    let newProducts = [];

    jsonProducts.forEach(element =>{
      template += `
      <tr>
      <th scope ="row">${element.title}</th>
      <td> $ ${element.price}</td>
      </tr>`
      newProducts.push(element.price);
    });
    const contentProducts = document.getElementById("table-cont");
    contentProducts.innerHTML = template;
    let sum = newProducts.reduce(function(acumulator,currentValue){
      return acumulator + currentValue;
    },0);

    console.log(sum);

    let templ2 =
    `<td></td>
    <td id="total">Total: ${sum}</td>`

    contentProducts.insertAdjacentHTML('beforeEnd',templ2);

    getPayPal(sum)
}

function getPayPal (totalPrice){
  paypal.Button.render({
            env: 'sandbox', // sandbox | production
            // PayPal Client IDs - replace with your own
            // Create a PayPal app: https://developer.paypal.com/developer/applications/create
            client: {
                sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
                production: 'AYJHNSoajYEnjiKBF_nkDDkLXxZMrN9oUPHcFQf4kG85EiFumQnhDZIoEyORo529ffiVWnYOTP-Cb_Fz'
            },
            // Show the buyer a 'Pay Now' button in the checkout flow
            commit: true,
            // payment() is called when the button is clicked
            payment: function(data, actions) {
                // Make a call to the REST api to create the payment
                return actions.payment.create({
                    payment: {
                        transactions: [
                            {
                                amount: { total: `${totalPrice}`, currency: 'MXN' }
                            }
                        ]
                    }
                });
            },
            // onAuthorize() is called when the buyer approves the payment
            onAuthorize: function(data, actions) {
                // Make a call to the REST api to execute the payment
                return actions.payment.execute().then(function() {
                    window.alert('Payment Complete!');
                });
            }
        }, '#paypal-button-container');
    }
totalItems();
