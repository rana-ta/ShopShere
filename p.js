document.addEventListener("DOMContentLoaded", function () {
    const sortSelect = document.getElementById("sort");
    const productContainer = document.querySelector(".container");
    let products = Array.from(productContainer.children);

    sortSelect.addEventListener("change", function () {
        const value = sortSelect.value;

        if (value === "a-z") {
            products.sort((a, b) =>
                a.querySelector(".product-name").innerText.localeCompare(b.querySelector(".product-name").innerText)
            );
        } else if (value === "z-a") {
            products.sort((a, b) =>
                b.querySelector(".product-name").innerText.localeCompare(a.querySelector(".product-name").innerText)
            );
        } else if (value === "low-to-high") {
            products.sort((a, b) =>
                parseFloat(a.querySelector(".product-price").innerText.replace(" SR", "")) - parseFloat(b.querySelector(".product-price").innerText.replace(" SR", ""))
            );
        } else if (value === "high-to-low") {
            products.sort((a, b) =>
                parseFloat(b.querySelector(".product-price").innerText.replace(" SR", "")) - parseFloat(a.querySelector(".product-price").innerText.replace(" SR", ""))
            );
        } else if (value === "Highest-rate") {
            products.sort((a, b) => {
                const ratingA = a.querySelectorAll(".star-filled").length;
                const ratingB = b.querySelectorAll(".star-filled").length;
                return ratingB - ratingA;  
            });
        } else if (value === "Lowest-rate") {
            products.sort((a, b) => {
                const ratingA = a.querySelectorAll(".star-filled").length;
                const ratingB = b.querySelectorAll(".star-filled").length;
                return ratingA - ratingB;  
            });
        }


        // Clear and repopulate the product container
        productContainer.innerHTML = "";
        products.forEach((product) => productContainer.appendChild(product));
    });
    
  
    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach((card) => {
        const addToCartButton = card.querySelector(".button");
        const increase = card.querySelector(".increase");
        const decrease = card.querySelector(".decrease");
        const quantityInput = card.querySelector(".quantity");

       
        if (addToCartButton && increase && decrease && quantityInput) {
           
            const quantityControl = card.querySelector(".quantity-controls");
            if (quantityControl) {
                quantityControl.style.display = "block";
            }

           
            increase.addEventListener("click", () => {
                quantityInput.value = parseInt(quantityInput.value) + 1;
            });

           
            decrease.addEventListener("click", () => {
                if (parseInt(quantityInput.value) > 1) {
                    quantityInput.value = parseInt(quantityInput.value) - 1;
                }
            });

            // إضافة المنتج إلى السلة عند الضغط على زر "أضف إلى السلة"
            addToCartButton.addEventListener("click", () => {
                const productName = card.querySelector(".product-name").innerText;
                const productPrice = card.querySelector(".product-price").innerText;
                const productDescription = card.querySelector(".product-description").innerText;
                const productImage = card.querySelector("img").getAttribute("src").split('/').pop();  
                const quantity = parseInt(quantityInput.value);

                let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

                const existingProduct = cartItems.find(item => item.name === productName);

                if (existingProduct) {
                    existingProduct.quantity += quantity;
                } else {
                    cartItems.push({
                        name: productName,
                        price: productPrice,
                        description: productDescription,
                        quantity: quantity,
                        image: `img/${productImage}`
                    });
                }

                localStorage.setItem("cartItems", JSON.stringify(cartItems));
                
               
            });
            
        } else {
            console.error("One or more required elements are missing in a product card.");
        }
    });
    
    // Handle cart icon click to navigate to cart.html
    document.querySelector(".cart").addEventListener("click", () => {
    window.location.href = "cart.html";
});

});
