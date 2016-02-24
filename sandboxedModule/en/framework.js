'use strict';
// Example showing us how the framework creates an environment (sandbox) for
// appication runtime, load an application code and passes a sandbox into app
// as a global context and receives exported application interface

// The framework can require core libraries
var fs = require('fs'),
    vm = require('vm'),
    util = require('util');

var passedArg = process.argv.length > 2? process.argv.pop() : './application.js';
var appName = passedArg;  //TODO change
var fileName = passedArg; //TODO change
if (!fileName.endsWith('.js')) {
  fileName = fileName + '.js';
}

// Create a hash and turn it into the sandboxed context which will be
// the global context of an application
var context = { 
  module: {}, 
  console: console, 
  setTimeout: (callback, timeout) => { 
    console.log('Set timeout called!'); 
    setTimeout(callback, timeout); 
  }, 
  setInterval: setInterval,
  util: util
};
context.console.log = function (data) {
  var curDate = new Date().toISOString().
    replace(/T/, ' ').       // replace T with a space
    replace(/\..+/, '');     // delete the dot and everything after

  console.log(fileName + curDate + data, arguments.slice(1));
};
context.global = context;
var sandbox = vm.createContext(context);


// Read an application source code from the file

fs.readFile(fileName, function(err, src) {
  // We need to handle errors here
  
  // Run an application in sandboxed context
  var script = vm.createScript(src, fileName);
  script.runInNewContext(sandbox);
  
  // We can access a link to exported interface from sandbox.module.exports
  // to execute, save to the cache, print to console, etc.
});
