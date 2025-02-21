/*
    1. Create a Promise that resolves with the number 10 after
       3 seconds
    2. Create another Promise that resolves with the number
       20 after 5 seconds

    How can we log out the sum (30) of these two resolved values
    once, after BOTH promises successfully fulfill?

    HINT: Use Google/Documentation to help find an answer
    HINT2: You can Google for something like:
           "resolve 2 promises at the same time javascript"
*/

let promise1 = new Promise(function (resolve) {
  setTimeout(function () {
    resolve(10);
  }, 3 * 1000);
});

let promise2 = new Promise(function (resolve) {
  setTimeout(function () {
    resolve(20);
  }, 5 * 1000);
});

Promise.all([promise1, promise2]).then(function (array) {
  let total = array.reduce((sum, num) => sum + num, 0);
  console.log(total);
});
