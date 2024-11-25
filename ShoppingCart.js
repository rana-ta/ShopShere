class ShoppingCart {
    constructor() {
        this.cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        this.totalPriceElement = document.querySelector('.total-price');
        this.cartContainer = document.querySelector('.container');
        this.initializeCart();
    }

initializeCart() {
    this.updateCartDisplay();
    this.addEventListeners();
    this.toggleCheckoutButton(); عر
}


   addEventListeners() {
    document.querySelector('.empty-cart').addEventListener('click', () => this.clearCart());
    
    this.cartContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('quantity-btn')) {
            this.updateQuantity(event);
        } else if (event.target.classList.contains('delete-btn')) {
            this.deleteItem(event);
        }
    });

    document.querySelector('.checkout-btn').addEventListener('click', () => this.checkout());
}

   


 deleteItem(event) {
    const cartItem = event.target.closest('.cart-item');
    const itemIndex = cartItem.getAttribute('data-index'); 

    if (itemIndex !== null) {
        this.cartItems.splice(itemIndex, 1); 
        this.saveToLocalStorage(); 
        this.updateCartDisplay(); 
    }
}


    clearCart() {
        this.cartItems = [];
        this.saveToLocalStorage();
        this.updateCartDisplay();
    }

calculateTotalPrice() {
    return this.cartItems.reduce((total, item) => {
        const itemPrice = parseFloat(item.price) || 0; // تأكد من أن السعر عدد صالح
        const itemQuantity = parseInt(item.quantity) || 0; // تأكد من أن الكمية عدد صالح
        return total + itemPrice * itemQuantity;
    }, 0);
}
updateQuantity(event) {
    const isIncrease = event.target.textContent === '+';
    const cartItem = event.target.closest('.cart-item');
    const itemIndex = cartItem.getAttribute('data-index');

    if (itemIndex !== null) {
        let item = this.cartItems[itemIndex];

        item.quantity += isIncrease ? 1 : -1;
        if (item.quantity < 1) item.quantity = 1;

        this.saveToLocalStorage();
        this.updateCartDisplay();
        this.toggleCheckoutButton(); // تحديث حالة الزر
    }
}


   updateCartDisplay() {
    const cartItemsContainer = this.cartContainer.querySelectorAll('.cart-item');
    cartItemsContainer.forEach(item => item.remove());

    this.cartItems.forEach((item, index) => {
        const cartItemHTML = 
            `<div class="cart-item" data-index="${index}">
                <img src="${item.image}" alt="${item.name}" class="product-img">  
                <div class="product-info">
                    <div class="product-name">${item.name}</div>
                    <div class="product-price">${item.price} SR</div>
                    <div class="product-desc">${item.description}</div>
                </div>
                <div class="product-quantity">
                    <button class="quantity-btn">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn">+</button>
                    <button class="delete-btn">🗑️</button>
                </div>
            </div>`;
        this.cartContainer.insertAdjacentHTML('beforeend', cartItemHTML);
this.toggleCheckoutButton()
    });

    this.totalPriceElement.textContent = `Total Price = ${this.calculateTotalPrice()} SR`;
}

checkout() {
    const totalCost = this.calculateTotalPrice();

    // Display the alert message
    alert(`Your order has been placed! The total cost is ${totalCost.toFixed(2)} SR. Thank you for your purchase. We are processing your order and will notify you soon.`);

    // Redirect the user to the evaluation page after clicking OK
    window.location.href = 'eval.html';

    // Clear the cart
    this.cartItems = [];
    this.saveToLocalStorage(); // Save the changes to LocalStorage
    this.updateCartDisplay(); // Update the cart display
}
toggleCheckoutButton() {
    const checkoutButton = document.querySelector('.checkout-btn');
    const totalPrice = this.calculateTotalPrice();
    
    if (totalPrice === 0) {
        checkoutButton.disabled = true;
    } else {
        checkoutButton.disabled = false;
           }
}


    saveToLocalStorage() {
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
}

// Initialize the cart when the page loads
window.addEventListener('DOMContentLoaded', () => new ShoppingCart());
