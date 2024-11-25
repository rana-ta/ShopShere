document.addEventListener("DOMContentLoaded", () => {
  const products = JSON.parse(localStorage.getItem("products")) || [];

  const productListContainer = document.getElementById("productsList");
  
if(products.length == 0){
    productListContainer.innerHTML = " <p>No Products Available, <br><br> Kindly Add a Product from the button below. </p>"
}else{
  products.forEach(product => {

  let categoryName;
  switch (product.category){
    case "category1":
      categoryName = "Perfume";
      break;

      case "category2":
        categoryName = "MakeUp";
      break;

      case "category3":
        categoryName = "Electronics";
      break;
      default: categoryName = "UnDefined";
  }
const prodDiv = document.createElement("div");
prodDiv.classList.add("single-product");

      prodDiv.innerHTML = `
      <div class="product-item">
        <h3>${product.name}</h3>
        <img class="productimg" src="${product.image}" alt="${product.name}" width="100" height="100">
        <p>Price: ${product.price} SR</p>
        <p>Category: ${categoryName}</p>
        <p>Quantity: ${product.quantity}</p>
        <p>Description: ${product.description}</p>
        </div>
        `;
        productListContainer.appendChild(prodDiv);
});
}
});