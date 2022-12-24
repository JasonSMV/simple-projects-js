"use strict";

// Selecting elements needed.

const form = document.querySelector("#new-todo-form");
const toDoInput = document.querySelector("#todo-input");
const listItemTemplate = document.querySelector("#list-item-template");
const toDoListElement = document.querySelector("#list");

const PREFIX = "TODO-ADVANCED";
const STORAGE_KEY = `${PREFIX}-STORAGE-KEY`;
const toDoList = loadToDos() || [];

toDoList.forEach((toDo) => {
  renderToDo(toDo);
});

// When form is submitted, check the input is not empty and add the input value to toDoList

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // return if input is empty

  if (toDoInput.value === "") return;

  // Create new toDo item object.
  const newtoDo = {
    id: new Date().valueOf(), // This create an always unique id.
    text: toDoInput.value,
    done: false,
  };

  // Clearing input value.
  toDoInput.value = "";

  // Render toDo
  renderToDo(newtoDo);

  // save toDo;
  toDoList.push(newtoDo);
  saveToDos(toDoList);
});

toDoListElement.addEventListener("click", (e) => {
  const listItem = e.target.closest(".list-item");
  // When delete button is pressed, delete toDo.
  if (e.target.matches("[data-button-delete]")) {
    deleteToDo(listItem);
  }

  // When checkbock is pressed, mark toDo as complete.
  if (e.target.matches("[data-list-item-checkbox]")) {
    const id = listItem.dataset.id;
    const toDo = toDoList.find((toDo) => toDo.id == id);
    toDo.done = !toDo.done;
    saveToDos(toDoList);
  }
});

function deleteToDo(listItem) {
  const id = listItem.dataset.id;
  const newToDoList = toDoList.filter((toDo) => {
    return toDo.id != id;
  });
  listItem.remove();
  saveToDos(newToDoList);
}

function saveToDos(toDoList) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(toDoList));
}

function loadToDos() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

function renderToDo(toDo) {
  // cloning template
  const template = listItemTemplate.content.cloneNode(true);
  const toDoText = template.querySelector("[data-list-item-text]");
  toDoText.textContent = toDo.text;
  const toDoCheckBox = template.querySelector("[data-list-item-checkbox]");
  toDoCheckBox.checked = toDo.done;
  const toDoId = template.querySelector("[data-id]");
  toDoId.dataset.id = toDo.id;

  toDoListElement.appendChild(template);
}
