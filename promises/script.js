"use strict";

// Creating a promise, first create a varible, create a new promise and pass it a function.
// That fumction is the code that you want to run that some part of the code is gonna take a bit of time.
// E.g. setTimeout, fetching data from database.

// It takes 2 parameters, resolve that runs in case the code is successfully and reject if a error occurs.

const promise = new Promise((resolve, reject) => {
  // This code is not asyc, but pretend it is like database fetch.
  const sum = 1 + 1;
  if (sum === 2) {
    // you can pass it whatever you want, one parameter, only one.
    resolve("Success");
  } else {
    reject("Error");
  }
});

//Accessing the promise variable. Then is the result of running resolve

// This of it as

// .then() === resolve() result
// .catch() === reject() result

// .catch is essencially  the catchall everytime you have an error inside of your promise.

promise
  .then((message) => {
    console.log(message); // This prints out "Success";
  })
  .catch((message) => {
    console.error(message); // This prints out "Error."
  });

/// Generally, if you create a promise that's because you are converting code that uses callbacks into code that uses promises instead.

setTimeout(() => {
  console.log("here callback");
}, 250);

// promisifying

// Creating a function that returns a promise
function setTimeoutPromise(duration) {
  return new Promise((resolve, reject) => {
    // setTimeout is async code, and we pass resolve instead of a callback
    setTimeout(resolve, duration);
  });
}

setTimeoutPromise(250).then(() => {
  console.log("here in promise resolved");
});

// Another example.

//Here we have multple callback stacked. (callback hell)
setTimeout(() => {
  console.log("1");
  setTimeout(() => {
    console.log("2");
    setTimeout(() => {
      console.log("3");
    }, 250);
  }, 250);
}, 250);

// We can chain promises together.

setTimeoutPromise(250)
  .then(() => {
    console.log("1 promise");
    return setTimeoutPromise(250);
  })
  .then(() => {
    console.log("2 promise");
    return setTimeoutPromise(250);
  })
  .then(() => {
    console.log("3 promise");
  });

// Converting addEventListener to promise

const btn = document.querySelector("button");

function addEventListenerPromise(element, method) {
  return new Promise((resolve, reject) => {
    element.addEventListener(method, resolve);
  });
}

addEventListenerPromise(btn, "click").then((event) => {
  console.log("button clicked", event);
});

function setTimeoutPromiseWithResult(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`You waited ${delay} milliseconds.`);
    }, delay);
  });
}

/// ****** USING ASYNC - AWAIT *************

//In order to use async await, you need to create a function and tell it is async

async function doStuff() {
  // wait till this promise finishes executing and resolves and then continue executing the rest of the code.

  // Catching a error use try - catch block.

  try {
    const resutl = await setTimeoutPromiseWithResult(250);
    console.log(resutl);
  } catch (error) {
    console.log(error);
  } finally {
    // This runs always whether there's a error or not.
    console.log("finally");
  }
}

doStuff();

// To run promises at the same time with then(); Only possible with .then (); USE .THEN() WHEN DOING LOOPING
setTimeoutPromiseWithResult(250).then((message) => {
  console.log(message);
});

setTimeoutPromiseWithResult(250).then((message) => {
  console.log(message);
});

setTimeoutPromiseWithResult(250).then((message) => {
  console.log(message);
});
