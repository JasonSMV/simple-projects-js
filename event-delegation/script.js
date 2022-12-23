"use strict";

// Using event delegation so that button that are created dinamically have an event listener.

const buttons = document.querySelectorAll("button");

const newButton = document.createElement("button");
newButton.textContent = "Button 5";
document.body.appendChild(newButton);

document.addEventListener("click", (e) => {
  // matches functions will receive an CSS query just like querySelector. If found returns true.

  // Setting so that the event is only  triggered when a button is clicked.
  if (e.target.matches("button")) {
    console.log("click button");
  }
});
