"use strict";

// Selecting elements needed.
const alert = document.querySelector("#alert");
const quizForm = document.querySelector("#quiz-form");
const questions = document.querySelectorAll(".question-item");
const answers = document.querySelectorAll(".answer");

// Once the the form is submitted, check for correct answers.

quizForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // By default setting each question to incorresct.
  questions.forEach((question) => {
    question.classList.add("incorrect");
  });

  let correctAnswersCounter = 0;
  // Filtering correct answers.
  answers.forEach((answer) => {
    // Adding correct class if answer is correct.
    if (answer.value === "true" && answer.checked) {
      correctAnswersCounter++;
      const questionElement = answer.closest(".question-item");
      questionElement.classList.remove("incorrect");
      questionElement.classList.add("correct");
    }
  });

  // Checking if all questions are correct.

  if (correctAnswersCounter === questions.length) {
    alert.classList.add("active");
    setInterval(() => {
      alert.classList.remove("active");
    }, 1000);
  }
});
/*
  TODO: 2. Select all elements needed
    * The form element (has the id `quiz-form`)
    * The answer inputs (have the class `answer`)
    * BONUS: The questions (have the class `question-item`)
    * BONUS: The alert (has the id `alert`)
*/

// TODO: 3. Create a submit event listener for the form that does the following.
//    1. Prevent the default behaviour
//    2. Get all selected answers (use the `checked` property on the input to determine if it is selected or not)
//    3. Loop through the selected answer to see if they are correct or not (Check the value of the answer to see if it is the string "true")
//    4. For each correct answer add the class `correct` to the parent with the class `question-item` and remove the class `incorrect`.
//    5. For each incorrect answer add the class `incorrect` to the parent with the class `question-item` and remove the class `correct`.
//    6. BONUS: Make sure unanswered questions show up as incorrect. The easiest way to do this is to add the incorrect class and removing the correct class from all question items before checking the correct answers
//    7. BONUS: If all answers are correct show the element with the id `alert` and hide it after one second (look into setTimeout) (use the class active to show the alert and remove the class to hide it)
