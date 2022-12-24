"use strict";

// Selecting elements needed.

const form = document.querySelector("#new-todo-form");
const toDoInput = document.querySelector("#todo-input");
const listItemTemplate = document.querySelector("#list-item-template");
const toDoListElement = document.querySelector("#list");

const PREFIX = "TODO-ADVANCED";
const STORAGE_KEY = `${PREFIX}-STORAGE-KEY`;
let toDoList = loadToDos();

toDoList.forEach(renderToDo);

// When form is submitted, check the input is not empty and add the input value to toDoList

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const toDoName = toDoInput.value;
  // return if input is empty

  if (!toDoName) return;

  // Create new toDo item object.
  const newtoDo = {
    id: new Date().valueOf().toString(), // This create an always unique id.
    name: toDoName,
    done: false,
  };

  // Clearing input value.
  toDoInput.value = "";

  // Render toDo
  renderToDo(newtoDo);

  // save toDo;
  toDoList.push(newtoDo);
  saveToDos();
});

// Adding event listener to toDo list.

toDoListElement.addEventListener("click", (e) => {
  console.log(e.target);
  const listItem = e.target.closest(".list-item");
  const id = listItem.dataset.id;

  // When delete button is pressed, delete toDo.
  if (e.target.matches("[data-button-delete]")) {
    deleteToDo(id);
  }

  // When checkbock is pressed, mark toDo as complete.
  if (e.target.matches("[data-list-item-checkbox]")) {
    completeToDo(id);
  }
});

function deleteToDo(id) {
  toDoList = toDoList.filter((toDo) => {
    return toDo.id !== id;
  });
  const toDoElement = toDoListElement.querySelector(`[data-id="${id}"]`);
  toDoElement.remove();
  saveToDos();
}

function completeToDo(id) {
  const toDo = toDoList.find((toDo) => toDo.id == id);
  toDo.done = !toDo.done;
  saveToDos();
}
function saveToDos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(toDoList));
}

function loadToDos() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function renderToDo(toDo) {
  // cloning template
  const template = listItemTemplate.content.cloneNode(true);
  const toDoText = template.querySelector("[data-list-item-text]");
  toDoText.textContent = toDo.name;
  const toDoCheckBox = template.querySelector("[data-list-item-checkbox]");
  toDoCheckBox.checked = toDo.done;
  const toDoId = template.querySelector("[data-id]");
  toDoId.dataset.id = toDo.id;

  toDoListElement.appendChild(template);
}
