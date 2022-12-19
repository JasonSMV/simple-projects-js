/*
  TODO: 2. Select the elements with the following IDs
    * modal
    * open-modal-btn
    * close-modal-btn
    * BONUS: overlay
*/
const btn = document.querySelector("#open-modal-btn");
const overlay = document.querySelector("#overlay");
const modal = document.querySelector("#modal");
const closeModalBtn = document.querySelector("#close-modal-btn");

// TODO: 3. Create a click event listener for the open-modal-btn that adds the class "open" to the modal

btn.addEventListener("click", (e) => {
  modal.classList.add("open");
  // BONUS: Also add the class "open" to the overlay
  overlay.classList.add("open");
});

// TODO: 4. Create a click event listener for the close-modal-btn that removes the class "open" from the modal

closeModalBtn.addEventListener("click", (e) => {
  modal.classList.remove("open");
  // BONUS: Also remove the class "open" from the overlay
  overlay.classList.remove("open");
});

// BONUS: Add a click event listener to the overlay that removes the class "open" from the modal and the overlay

overlay.addEventListener("click", (e) => {
  modal.classList.remove("open");
  overlay.classList.remove("open");
});
