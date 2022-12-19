"use strict";
// 1. Select all elements.
// 2. When I submit form, I want to add an element to list

const form = document.querySelector("#new-item-form");
const input = document.querySelector("#item-input");
const list = document.querySelector("#list");
const listItem = document.querySelectorAll(".list-item");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // 1. create a new item
  const itemElement = document.createElement("div");
  itemElement.classList.add("list-item");
  itemElement.textContent = input.value;
  // 2. Add that item to the list.
  list.appendChild(itemElement);
  // 3. Clear input.
  input.value = "";
  // 4. Setup event listener to delete item when clicked.

  itemElement.addEventListener("click", (e) => {
    //first way.
    // e.target.remove();

    //Second way
    // itemElement.remove();

    // Third way.

    list.removeChild(itemElement);
  });
});
