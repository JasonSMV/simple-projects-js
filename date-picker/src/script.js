"use strict";
// Importing library for dealing with dates. dates fns.

import {
  format,
  startOfWeek,
  endOfMonth,
  startOfMonth,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  getUnixTime,
  fromUnixTime,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";

// Geting elements neeed.

const datePickerBtn = document.querySelector(".date-picker-button");
const datePickerContainer = document.querySelector(".date-picker");
const datePickerGrid = document.querySelector(".date-picker-grid-dates");
const previousMonthBtn = document.querySelector(".prev-month-button");
const nextMonthBtn = document.querySelector(".next-month-button");

// Current date represents the current date at the time of running the application.
let currentDate = new Date();

let selectedDate = new Date();

datePickerBtn.textContent = format(currentDate, "MMMM do, yyyy");

// Populate date picker that will create dynamically dates elements.
setUpDatePicker(currentDate);

// When button is click, show date picker.
datePickerBtn.addEventListener("click", (e) => {
  datePickerContainer.classList.toggle("show");
  setUpDatePicker(selectedDate);
});

// When a date is selected, add class selected.
datePickerGrid.addEventListener("click", (e) => {
  if (!e.target.matches(".date")) return;
  const date = e.target;

  datePickerContainer.classList.toggle("show");

  selectedDate = fromUnixTime(date.dataset.dateUnix);
  datePickerBtn.textContent = format(selectedDate, "MMMM do, yyyy");
  setUpDatePicker(selectedDate);
});

// Render next month.
previousMonthBtn.addEventListener("click", (e) => {
  console.log("here");
  currentDate = subMonths(currentDate, 1);
  setUpDatePicker(currentDate);
});

// Render previous month.
nextMonthBtn.addEventListener("click", (e) => {
  console.log("here next");

  currentDate = addMonths(currentDate, 1);
  setUpDatePicker(currentDate);
});

function setUpDatePicker(date) {
  // Clearing grid.
  datePickerGrid.innerHTML = "";
  const currentMonthText = datePickerContainer.querySelector(".current-month");
  currentMonthText.textContent = format(date, "MMMM - yyyy");

  // Get start of month of current day.
  const startMonth = startOfMonth(date);

  // Get start of week of start of month.
  const startWeek = startOfWeek(startMonth);

  // Get end of month of current month
  const endMonth = endOfMonth(startMonth);

  // Get end of week of current end of month.
  const endWeek = endOfWeek(endMonth);

  // Get interval between start of week and end of week.
  const eachDayList = eachDayOfInterval({ start: startWeek, end: endWeek });

  // Populating dates in dates elements.

  eachDayList.forEach((date) => {
    const button = document.createElement("button");
    button.classList.add("date");
    button.textContent = date.getDate();

    button.dataset.dateUnix = getUnixTime(date).toString();

    if (!isSameMonth(date, startMonth)) {
      button.classList.add("date-picker-other-month-date");
    } else {
      button.classList.remove("date-picker-other-month-date");
    }

    if (isSameDay(selectedDate, date)) {
      button.classList.add("selected");
    }

    datePickerGrid.appendChild(button);
  });
}
