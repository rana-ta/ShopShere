document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("addProductForm");


form.addEventListener("submit",function(event){
event.preventDefault();

const name = document.getElementById("name").value.trim();
const imageInput = document.getElementById("image");
const price = document.getElementById("price").value.trim();
const category = document.getElementById("Category").value;
const quantity = document.getElementById("Quantity").value.trim();
const description = document.getElementById("Description").value.trim();

if (!name || !imageInput.files[0] || !price || !category || !quantity || !description ){
    alert("Please fill in all required fields.");
    return;
}
if (/^\d/.test(name)){
    alert("Product name can not start with a number.");
    return;
}
if(isNaN(price) || isNaN(quantity)){
    alert("Price and Quantity must be numbers.");
    return;
}

const reader = new FileReader();
reader.onload = function(e){
    const image = e.target.result;
    const products = JSON.parse(localStorage.getItem("products")) || [];

    const newPRO = {
        name, 
        price: price ||"Price not available",
        category: category ||"category not available", 
        quantity: quantity ||"quantity not available",
        description: description ||"description not available",
        image : image ||"image not available"
    };


products.push(newPRO);
localStorage.setItem("products", JSON.stringify(products));

alert(`Product "${name}" is Added Successfully!`);

form.reset();
};
reader.readAsDataURL(imageInput.files[0]);
});
});