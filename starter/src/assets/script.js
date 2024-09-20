/* Create an array named products which you will use to add all of your product object literals that you create in the next step. */

/* Create 3 or more product objects using object literal notation 
   Each product should include five properties
   - name: name of product (string)
   - price: price of product (number)
   - quantity: quantity in cart should start at zero (number)
   - productId: unique id for the product (number)
   - image: picture of product (url string)
*/

/* Images provided in /images folder. All images from Unsplash.com
   - cherry.jpg by Mae Mu
   - orange.jpg by Mae Mu
   - strawberry.jpg by Allec Gomes
*/

let products = [
  {
    name: "cherry",
    price: 1.99,
    quantity: 0,
    productId: 1,
    image: "../images/cherry.jpg",
  },
  {
    name: "orange",
    price: 2.99,
    quantity: 0,
    productId: 2,
    image: "../images/orange.jpg",
  },
  {
    name: "strawberry",
    price: 3.99,
    quantity: 0,
    productId: 3,
    image: "../images/strawberry.jpg",
  },
];


let cart = [];

/* Create a function named addProductToCart that takes in the product productId as an argument
  - addProductToCart should get the correct product based on the productId
  - addProductToCart should then increase the product's quantity
  - if the product is not already in the cart, add it to the cart
*/
function addProductToCart(productId) {
  let product;
  for (let i = 0; i < products.length; i++) {
    if (products[i].productId === productId) {
      product = products[i];
      break;
    }
  }

  let cartIndex = -1;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cartIndex = i;
      break;
    }
  }

  if (cartIndex !== -1) {
    cart[cartIndex].quantity += 1;
  } else {
    const cartItem = {
      productId: product.productId,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    };
    cart.push(cartItem);
  }

  product.quantity = (cart[cartIndex] || cart[cart.length - 1]).quantity;
}

/* Create a function named increaseQuantity that takes in the productId as an argument
  - increaseQuantity should get the correct product based on the productId
  - increaseQuantity should then increase the product's quantity
*/
function increaseQuantity(productId) {
  let cartItemFound = false;
  let productFound = false;

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity += 1;
      cartItemFound = true;
      break;
    }
  }

  for (let j = 0; j < products.length; j++) {
    if (products[j].productId === productId) {
      products[j].quantity += 1;
      productFound = true;
      break;
    }
  }
}

/* Create a function named decreaseQuantity that takes in the productId as an argument
  - decreaseQuantity should get the correct product based on the productId
  - decreaseQuantity should decrease the quantity of the product
  - if the function decreases the quantity to 0, the product is removed from the cart
*/
function decreaseQuantity(productId) {
  const cartItem = cart.find((item) => item.productId === productId);
  const product = products.find((item) => item.productId === productId);

  if (cartItem) {
    cartItem.quantity -= 1;
    if (cartItem.quantity <= 0) {
      removeProductFromCart(productId);
    } else {
      product.quantity = cartItem.quantity;
    }
  }
}

/* Create a function named removeProductFromCart that takes in the productId as an argument
  - removeProductFromCart should get the correct product based on the productId
  - removeProductFromCart should update the product quantity to 0
  - removeProductFromCart should remove the product from the cart
*/
function removeProductFromCart(productId) {
  const index = cart.findIndex((item) => item.productId === productId);

  if (index !== -1) {
    const product = products.find((item) => item.productId === productId);
    if (product) {
      product.quantity = 0;
    }

    cart.splice(index, 1);
  }
}

/* Create a function named cartTotal that has no parameters
  - cartTotal should iterate through the cart to get the total cost of all products
  - cartTotal should return the total cost of the products in the cart
  Hint: price and quantity can be used to determine total cost
*/
function cartTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}
function emptyCart() {
  cart.length = 0;
}

/* Create a function named pay that takes in an amount as an argument
  - amount is the money paid by customer
  - pay will return a negative number if there is a remaining balance
  - pay will return a positive number if money should be returned to customer
  Hint: cartTotal function gives us cost of all the products in the cart  
*/
let totalPaid = 0;

function pay(amount) {
  const totalCost = cartTotal();
  totalPaid += amount;
  const remainingBalance = totalPaid - totalCost;

  if (totalPaid >= totalCost) {
    totalPaid = 0;
  }

  return remainingBalance;
}


/* Place stand out suggestions here (stand out suggestions can be found at the bottom of the project rubric.)*/


/* The following is for running unit tests. 
   To fully complete this project, it is expected that all tests pass.
   Run the following command in terminal to run tests
   npm run test
*/

module.exports = {
   products,
   cart,
   addProductToCart,
   increaseQuantity,
   decreaseQuantity,
   removeProductFromCart,
   cartTotal,
   pay, 
   emptyCart,
   /* Uncomment the following line if completing the currency converter bonus */
   // currency
}
