
(function (window) {
  window.__env = window.__env || {};

  // Whether or not env.js is loaded
  // If false, variables are default values from env.service.ts
  // If true, variables are values from env.js
  window.__env.envJsLoaded = "true";

  // Whether or not to enable debug mode
  // Currently not in use
  window.__env.enableDebug = "true";

  // environment variables
  window.__env.TSSGAPIURL = "http://localhost";
  window.__env.TSSGAPIPORT = "7010";
}(this));
