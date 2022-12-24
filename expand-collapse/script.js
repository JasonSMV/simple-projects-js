"use strict";

// Selecting elements needed.

const cardContainer = document.querySelector("[data-cards-container]");

// When button clicked -> Collapse or Expand.

cardContainer.addEventListener("click", (e) => {
  // Return if the button is not the one being clicked.
  if (!e.target.matches(".expand-button")) return;

  const card = e.target.closest(".card");
  const buttonExpand = card.querySelector(".expand-button");
  // Changing textContent to match the current state of the card.
  buttonExpand.textContent =
    buttonExpand.textContent === "Expand" ? "Collapse" : "Expand";
  const cardBody = card.querySelector(".card-body");

  cardBody.classList.toggle("show");
});
