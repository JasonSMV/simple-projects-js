// Selecting all elements.

const form = document.querySelector("#form");
const errorList = document.querySelector(".errors-list");
const errorContatiner = document.querySelector(".errors");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const passwordConfirmationInput = document.querySelector(
  "#password-confirmation"
);
const termsCheck = document.querySelector("#terms");

// Checking that values are correct before submitting.

form.addEventListener("submit", (e) => {
  clearErrors();

  const errors = [];

  if (usernameInput.value.length < 7)
    errors.push("The username must be at least 6 characters long");

  if (passwordInput.value.length < 11)
    errors.push("The password must be at least 10 characters long");

  if (passwordConfirmationInput.value !== passwordInput.value)
    errors.push("The passwords must match.");

  if (!termsCheck.checked) errors.push("Must accept terms.");

  if (errors.length) {
    e.preventDefault();
    showErrors(errors);
  }
});

function clearErrors() {
  console.log("Clear errors", errorList.hasChildNodes());
  while (errorList.hasChildNodes()) {
    errorList.firstElementChild.remove();
  }
  errorContatiner.classList.remove("show");
}

function showErrors(errorMessages) {
  errorContatiner.classList.add("show");
  errorMessages.forEach((error) => {
    const li = document.createElement("li");
    li.textContent = error;
    errorList.appendChild(li);
  });
}
