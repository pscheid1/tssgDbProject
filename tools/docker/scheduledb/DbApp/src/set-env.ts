/*
  The following links provide some development information:
    https://www.jvandemo.com/how-to-use-environment-variables-to-configure-your-angular-application-without-a-rebuild/

    https://medium.com/@ferie/how-to-pass-environment-variables-at-building-time-in-an-angular-application-using-env-files-4ae1a80383c

    https://medium.com/@natchiketa/angular-cli-and-os-environment-variables-4cfa3b849659
*/

// import { writeFile } from 'fs';
const { writeFile } = require('fs');
// import { argv } from 'yargs';
const { argv } = require('yargs');

// This is good for local dev environments, when it's better to
// store a projects environment variables in a .gitignore'd file
require('dotenv').config();

// Would be passed to script like this:
// `ts-node set-env.ts --environment=dev`
// we get it from yargs's argv object
const environment = argv.environment;
const isProd = environment === 'prod'; // 'true' or 'false'

/*
  The following code replaces the original code.  Instead of
  creating an environment.dev.ts file, This code
  will produce the env.js file that will be injected into
  the frontend angular project.  The env.js file can be
  created at any time even during frontend run time.  env.js
  will be injected whenever the frontend is loaded into
  the browser.  If changed during run time, simply force a page
  reload and the new env.js file will be injected into the code.

  This code will use environment variables defined in the .env
  file (these can be considered default values) and the host system.
  Host system environment variables win out over duplicate definitions.
*/

// create file in project/src folder
const dir = 'src/env.js';
// get the desired environmet variables
const var1 = process.env.FRONTEND_DEBUG || 'true';
const var2 = process.env.TSSGAPIURL || process.env.BACKEND_BASE_URL;
const var3 = process.env.TSSGAPIPORT || process.env.BACKEND_BASE_PORT;
const var4 = process.env.BACKEND_VERSION || ' ';
const var5 = process.env.FRONTEND_VERSION || ' ';
const var6 = process.env.WEBSITE_URL;
const var7 = process.env.WEBSITE_PORT;
// const var3 = process.env.TSSGAPIPORT;

// build the first constant section
const str1 = '\n\
(function (window) {\n\
  window.__env = window.__env || {};\n\
\n\
  // Whether or not env.js is loaded\n\
  // If false, variables are default values from env.service.ts\n\
  // If true, variables are values from env.js\n\
  window.__env.envJsLoaded = "true";\n\
\n\
  // Whether or not to enable debug mode\n\
  // Currently not in use\n\
  window.__env.enableDebug = "';
const str2 = '";\n\n\
  // environment variables\n\
  window.__env.TSSGAPIURL = "';
// build the remaining constant sections
const str3 = '";\n  window.__env.TSSGAPIPORT = "';
const str4 = '";\n  window.__env.BACKEND_VERSION = "';
const str5 = '";\n  window.__env.FRONTEND_VERSION = "';
const str6 = '";\n  window.__env.WEBSITE_URL = "';
const str7 = '";\n  window.__env.WEBSITE_PORT = "';
const end = '";\n}(this));\n';
// concatenate everything into one string
const buf = str1.concat(var1, str2, var2, str3, var3, str4, var4, str5, var5, str6, var6, str7, var7, end);

// create a new env.js file
writeFile(dir, buf, (err) => {
  if (err) {
    console.log(`set-env.ts writeFile error: ${err.message}`);
  }
});


/*
  code below is the original code. It would create the
  src/environments/environment.dev.ts file.  This is
  a typescript file that is used in the angular transpile
  to javascript during the angular compilation.
*/
/*
const targetPath = `./src/environments/environment.${environment}.ts`;
const envConfigFile = `
export const environment = {
  production: ${isProd},
  superSecretKey: "${process.env.SUPER_SECRET_CRED1}",
  superDoubleSecret: "${process.env.SUPER_SECRET_CRED2}",
  backendURL: "${process.env.BACKEND_BASE_URL}",
  backendPORT:  "${process.env.BACKEND_BASE_PORT}",
  mongoDB: "${process.env.MONGO_WIN_CONTAINER_URL}",
  TSSGAPPURL: "${process.env.TSSGAPPURL}"
};
`
writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.log(err);
  }

  console.log(`Output generated at ${targetPath}`);
});

*/
