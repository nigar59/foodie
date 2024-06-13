document.addEventListener("DOMContentLoaded", function () {
  const showMoreButton = document.querySelector(".see-more-button");
  const allProductCards = document.querySelectorAll(".product-card");
  const shoppingCartBadge = document.querySelector(".cart-badge");

  allProductCards.forEach((card, idx) => {
    if (idx >= 6) {
      card.classList.add("hidden");
    }
  });

  showMoreButton.addEventListener("click", () => {
    const hiddenProductCards = document.querySelectorAll(
      ".product-card.hidden"
    );

    if (hiddenProductCards.length > 0) {
      hiddenProductCards.forEach((card) => card.classList.remove("hidden"));
      showMoreButton.innerHTML =
        'See Less <img src="./assets/images/arrow-right-circle.png" alt="">';
    } else {
      allProductCards.forEach((card, idx) => {
        if (idx >= 6) {
          card.classList.add("hidden");
        }
      });
      showMoreButton.innerHTML =
        'See More Products <img src="./assets/images/arrow-right-circle.png" alt="">';
    }
  });

  refreshCartBadge();

  const cartButtons = document.querySelectorAll(".product-bottom button");
  cartButtons.forEach((button, idx) => {
    button.addEventListener("click", () => {
      addItemToCart(idx);
    });
  });

  function addItemToCart(idx) {
    const selectedProductCard = allProductCards[idx];
    const productTitle =
      selectedProductCard.querySelector(".product-name").innerText;
    const productCost =
      selectedProductCard.querySelector(".product-bottom p").innerText;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const productDetails = {
      name: productTitle,
      price: productCost,
      quantity: 1,
    };

    const existingProductIndex = cart.findIndex(
      (item) => item.name === productTitle
    );

    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push(productDetails);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    refreshCartBadge();
  }

  function refreshCartBadge() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQuantity = cart.reduce(
      (sum, product) => sum + product.quantity,
      0
    );
    shoppingCartBadge.innerText = totalQuantity;
  }
});
