// USING API https://jsonplaceholder.typicode.com/

"use strict";

// Fetch is a function of our windows browser. windows.fetch and it is asynchronous code.

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => {
    // We need another promise to read the object.
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });

// *** With ASYNC - AWAIT Version.

async function fetchData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  console.log(data);
}

fetchData();

// ******* ERRORS ********

// The way fetch works is that it only throws an erros if there is an actual error connecting to the server or getting data from the server.

// Errors such as 404, 403 will not stop the execution of our code.

// To handle errors 404 and such. We check our responseo.

async function fetchDataErrorCheck() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/22");
  // This return is our response is ok or not.
  if (response.ok) {
    const data = await response.json();
    console.log(data);
  } else {
    console.log("Failure");
  }
}

fetchDataErrorCheck();

// ****** SENDING DATA TO THE SERVER *****

// In order to that we need to pass a second parameter and setting the method to post. and in order to send data to our request, we send it through the body and the body object needs to be a string.

async function sendData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "New post",
    }),
  });
  const post = await response.json();
  console.log(post);
}

sendData();
