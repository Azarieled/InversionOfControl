'use strict';
// File contains a small piece of the source to demonstrate main module
// of a sample application to be executed in the sandboxed context by
// another pice of code from `framework.js`. Read README.md for tasks.

// Print from the global context of application module
console.log('From application global context');
setTimeout(() => {console.log('Timeout')}, 0);
console.log(util.isRegExp(/hello/i));

module.exports = function() {
  // Print from the exported function context
  console.log('From application exported function');
};
