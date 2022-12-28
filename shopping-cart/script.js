import items from "./items.json";
import { renderItemsInContainer } from "./store";
import formatPrice from "./util/formatPrice";

// Getting elements needed.

/*
 ******************************REMEMBER THAT YOU NEED TO ADD EACH HTML FILE TO PARCEL.
 *
 *
 *
 *
 *
 */

const itemsContainer = document.querySelector("[data-items-container]");
const itemCartTemplate = document.querySelector(".template-item-cart");
const itemCartContainer = document.querySelector("[data-cart-item-container]");
const cartButton = document.querySelector("[data-cart-button]");
const cartContainer = document.querySelector("[data-cart-container]");
const total = document.querySelector("[data-cart-total]");
const cartQuantityBadge = document.querySelector("[data-cart-quantity]");
const cartContainerAndBadge = document.querySelector(".item-cart");

const PREFIX_KEY = `SHOPPING-CART`;
const SESSION_STORAGE_KEY = `${PREFIX_KEY}-STORAGE`;

let itemsInCart = loadCart();

showCart();

renderItemsInContainer();

itemsContainer?.addEventListener("click", addToCart);

cartButton.addEventListener("click", () => {
  cartContainer.classList.toggle("invisible");
});

itemCartContainer.addEventListener("click", removeFromCart);

function addToCart(event) {
  cartButton.classList.remove("invisible");
  if (!event.target.matches("[data-add-cart-btn]")) return;
  const id = event.target.closest("[data-item-id]").dataset.itemId;
  // Getting item by the by in data-item-id
  const item = items.find((item) => Number(id) === item.id);
  // Checking if item is already in cart.
  const itemInCart = itemsInCart.find((item) => {
    return Number(item.id) === Number(id);
  });
  // Increasing quantity by 1 if item is already in cart.
  if (itemInCart) {
    itemInCart.quantity = itemInCart.quantity + 1;
  } else {
    itemsInCart.push({
      ...item,
      quantity: 1,
    });
  }

  showCart();

  saveCart(itemsInCart);
}

function setUpItemInCart(item) {
  const template = itemCartTemplate.content.cloneNode(true);
  const id = template.querySelector("[data-item-id]");
  id.dataset.itemId = item.id;
  const img = template.querySelector("[data-item-img]");
  img.src = `https://dummyimage.com/420x260/${item.imageColor}/${item.imageColor}`;
  const itemName = template.querySelector("[data-item-name]");
  itemName.textContent = item.name;
  const itemQuantity = template.querySelector("[data-item-quantity]");
  itemQuantity.textContent = item.quantity === 1 ? "" : `x${item.quantity}`;
  const itemPrice = template.querySelector("[data-item-price]");
  itemPrice.textContent = formatPrice(item.priceCents * item.quantity);

  itemCartContainer.appendChild(template);
}

function showCart() {
  itemCartContainer.innerHTML = "";
  if (itemsInCart.length) {
    cartButton.classList.remove("invisible");
    cartContainerAndBadge.classList.remove("invisible");

    cartQuantityBadge.textContent = itemsInCart.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);

    itemsInCart.forEach(setUpItemInCart);

    total.textContent = formatPrice(
      itemsInCart.reduce((total, item) => {
        return total + item.priceCents * item.quantity;
      }, 0)
    );

    const cartQuantity = itemsInCart.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);

    cartQuantityBadge.textContent = itemsInCart.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);

    if (cartQuantity == 0) {
      cartContainerAndBadge.classList.add("invisible");
    }
  } else {
    cartContainerAndBadge.classList.add("invisible");
  }
}

function saveCart(items) {
  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(items));
}

function loadCart() {
  return JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY)) || [];
}

function removeFromCart(e) {
  if (!e.target.matches("[data-remove-from-cart-button]")) return;
  const itemElement = e.target.closest("[data-item-id]");
  const itemId = itemElement.dataset.itemId;
  const item = itemsInCart.find((item) => item.id == itemId);
  if (item.quantity >= 2) {
    item.quantity = Number(item.quantity) - 1;
  } else {
    itemsInCart = itemsInCart.filter((item) => {
      return item.id != itemId;
    });
  }

  showCart();
  saveCart(itemsInCart);
}
