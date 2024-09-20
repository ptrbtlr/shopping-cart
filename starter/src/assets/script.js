// create an array of products
let products = [
  {
    name: "cherry",
    price: 1.99,
    quantity: 0,
    productId: 1,
    image: "./images/cherry.jpg",
  },
  {
    name: "orange",
    price: 2.99,
    quantity: 0,
    productId: 2,
    image: "./images/orange.jpg",
  },
  {
    name: "strawberry",
    price: 3.99,
    quantity: 0,
    productId: 3,
    image: "./images/strawberry.jpg",
  },
];

// initialize the cart as an empty array
let cart = [];

// helper function to get a product by productId
function getProductById(productList, productId) {
  return productList.find((product) => product.productId === productId);
}

// function to add a product to the cart
function addProductToCart(productId) {
  const product = getProductById(products, productId);

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

// function to increase product quantity
function increaseQuantity(productId) {
  const cartItem = getProductById(cart, productId);
  const product = getProductById(products, productId);

  if (cartItem) {
    cartItem.quantity += 1;
  }

  if (product) {
    product.quantity += 1;
  }
}

// function to decrease product quantity
function decreaseQuantity(productId) {
  const cartItem = getProductById(cart, productId);
  const product = getProductById(products, productId);

  if (cartItem) {
    cartItem.quantity -= 1;
    if (cartItem.quantity <= 0) {
      removeProductFromCart(productId);
    } else {
      product.quantity = cartItem.quantity;
    }
  }
}

// function to remove product from cart
function removeProductFromCart(productId) {
  const index = cart.findIndex((item) => item.productId === productId);

  if (index !== -1) {
    const product = getProductById(products, productId);

    if (product) {
      product.quantity = 0;
    }

    cart.splice(index, 1);
  }
}

function cartTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function emptyCart() {
  cart.length = 0;
}

let totalPaid = 0;

function pay(amount) {
  const totalCost = cartTotal();
  totalPaid += amount;

  const remainingBalance = totalPaid - totalCost;

  if (totalPaid >= totalCost) {
    totalPaid = 0;
    emptyCart();
  }

  return remainingBalance;
}

module.exports = {
  products,
  cart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
  cartTotal,
  pay,
};
