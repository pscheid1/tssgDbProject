const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

global.Root = __dirname;
global.Folders = Root.split(path.sep);
global.PackageName = Folders[Folders.length - 1];

let protocol; // not using any more, but we'll leave it in for now.

let port = process.env.WEBSITE_PORT || 8088;
let host = (process.env.WEBSITE_URL || 'http://0.0.0.0').toLowerCase();

// strip any protocol off.  We're forcing to http down below.
if (host.includes('://')) {
  let n = host.indexOf('://');
  protocol = host.slice(0, n);
  host = host.slice(n + 3);
} else {
  protocol = 'http';
}

/*  This needs to be reworked <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
process any command line parameters.
case is significant.
  valid parameters:
    -p | --port   <port number>
    -h | --host   <host name or ip>
         --mtgDbg  true otherwise false
To use these, either add them to your package.json scripts or
run node or nodemon manually and add them to the command line.
*/

/* This code needs to be reworked since https was added */
/* This code only works for node, not nodemon ?????  */
/* 
var argvs = require('optimist').argv;
var index,
  value;
for (index in argvs) {
  if (argvs.hasOwnProperty(index)) {
    value = argvs[index];
    if (index === "p" || index === "port") {
      port = value;
    }
    if (index === "h" || index === "host") {
      host = value;
    }
    if (index === "mtgDbg") {
      global.md = (value === "true") ? Boolean(true) : Boolean(false);
    }
  }
}
*/

/* 
   This code will create a javascript file in the Site/Scripts directory named tssgBackendURL.js.
   The code in this file is one javascript const (tssgBackendURL) initialized to the DbApi backend url and port.
   The resulting javascript file will contain a value equal or similar to: const tssgBackendURL = http://backend:7010
   The values are obtaned from BACKEND_URL and BACKEND_PORT environment variables.
   This file will be loaded in by the Site/schedule.html file and used to access the tssgTech meetings schedule from
   the DbApi backend container.
 */

const mongo_destination = process.env.BACKEND_DB_DEST || '';
// console.log(`server mongo_destination: ${mongo_destination}`);
let buf;
if (mongo_destination === 'container') {
  // if we see this, backend, frontend and website are not running in containers
  buf = Buffer.from(`const tssgBackendURL = 'http://localhost:7010';\n`);
} else {
  // everything is running in it's own container
  buf = Buffer.from(`const tssgBackendURL = '${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}';\n`);
}
// console.log(`tssgTech.server.js buf: ${buf}`);

const dir = 'Site/Scripts/tssgBackendURL.js';
fs.writeFile(dir, buf, (err) => {
  if (err) {
    console.log(`backend_base_url.js writeFile error: ${err.message}`);
  }
});

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

/*
  The router will look in the supplied folder for any asked page.
  Express looks up the files relative to the static directory, so
  the name of the static directory is not part of the URL.
  In the below case, the folder would be <root>/public so the
  request would be '/' or '/<file>' or '/<path/<file>.
  If not found, it will default to index.html.

  See https://expressjs.com/en/starter/static-files.html
  for more information.
*/

// console.log(`__dirname: ${__dirname}`);
app.use(express.static(__dirname + '/Site'));

// multiple ports (both http & https) can similtaneously be in 'listen' mode.
// In order to allow similtaneous http & https we will need to add a second port variable.
// For now, we are only allowing one protocol

// create an http server
http.createServer(app).listen(port, host, function () {
  console.log(`HTTP Server is up and running on http://${host}:${port}`);
});


