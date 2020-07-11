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

let protocol;
let host = (process.env.WEBSITE_URL || 'http://0.0.0.0').toLowerCase();

if (host.includes('://')) {
  let n = host.indexOf('://');
  protocol = host.slice(0, n);
  host = host.slice(n + 3);
} else {
  protocol = 'http';
}

const defaultPort = (protocol === 'https') ? 443 : 8088;
let port = process.env.WEBSITE_PORT || defautPort;

/*
// get the certificate file names
const serverKeyFile = process.env.tssgServerKey || 'tssg-server-key.pem';
const serverCrtFile = process.env.tssgServerCrt || 'tssg-server-crt.pem';
const caCrtFile = process.env.tssgCaCrt || 'tssg-ca-crt.pem';
const caCrlFile = process.env.tssgCaCrl || 'tssg-ca-crl.pem';

// set certDir equal to the certificates folder
const certDir = global.Root + '/certificates';


// set httpsOptions variables
const httpsOptions = {
  key: fs.readFileSync(`${certDir}/${serverKeyFile}`),
  cert: fs.readFileSync(`${certDir}/${serverCrtFile}`),
  ca: fs.readFileSync(`${certDir}/${caCrtFile}`),
  crl: fs.readFileSync(`${certDir}/${caCrlFile}`),
  passphrase: 'tssgpw',
  requestCert: false,         // true for client ssl
  rejectUnauthorized: true,
  // hostname: 'localhost',      // container name if in container i.e. backend
  hostname: host,
  port: port
};
*/

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
    The code in this file is one javascript const (tssgBackendURL) initialized to the tssgTech backend url and port.
    The resulting javascript file will contain a value equal or similar to: const tssgBackendURL = http://backend:7010
    The values are obtaned from BACKEND_BASE_URL and BACKEND_BASE_PORT environment variables.
    This file will be loaded in by the Site/schedule.html file and used to access the tssgTech meetings schedule from
    the DbApi backend container.
  */
const buf = Buffer.from(`const tssgBackendURL = '${process.env.BACKEND_BASE_URL}:${process.env.BACKEND_BASE_PORT}';\n`);
// console.log(`buf: ${buf}`);
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

if (protocol === 'http') {
  http.createServer(app).listen(port, host, function () {
    console.log(`HTTP Server is up and running on http://${host}:${port}`);
  });
} else {
  // default to https
  https.createServer(httpsOptions, app).listen(httpsOptions.port, httpsOptions.hostname, function () {
    console.log(`HTTPS Server is up and running on https://${httpsOptions.hostname}:${httpsOptions.port}`);
  });
}

