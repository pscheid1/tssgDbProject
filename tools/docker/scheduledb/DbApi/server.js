const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const meeting = require('./routes/meeting.route');
const venue = require('./routes/venue.route');
const user = require('./routes/user.route');
const team = require('./routes/team.route');
const errorHandler = require('./_helpers/error-handler');
const http = require('http');
const https = require('https');
const fs = require('fs');

const path = require('path');
global.Root = __dirname;
global.Folders = Root.split(path.sep);
global.PackageName = Folders[Folders.length - 1];

// get the certificate file names
const serverKeyFile = process.env.tssgServerKey || 'tssg-server-key.pem';
const serverCrtFile = process.env.tssgServerCrt || 'tssg-server-crt.pem';

const caCrtFile = process.env.tssgCaCrt || 'tssg-ca-crt.pem';
const caCrlFile = process.env.tssgCaCrl || 'tssg-ca-crl.pem';

let protocol = '';

const port = process.env.BACKEND_BASE_PORT || 7010;
let host = process.env.BACKEND_BASE_URL || 'http://backend';

if (host.includes('://')) {
  let n = host.indexOf('://');
  protocol = host.slice(0, n);
  host = host.slice(n + 3);
} else {
  protocol = 'http';
}


// set certDir equal to the certificates folder
const certDir = global.Root + '/certificates';

global.backendVersion = process.env.BACKEND_VERSION;
global.frontendVersion = process.env.FRONTEND_VERSION;

// set httpsOptions variables
const httpsOptions = {
  key: fs.readFileSync(`${certDir}/${serverKeyFile}`),
  cert: fs.readFileSync(`${certDir}/${serverCrtFile}`),
  ca: fs.readFileSync(`${certDir}/${caCrtFile}`),
  crl: fs.readFileSync(`${certDir}/${caCrlFile}`),
  passphrase: 'tssgpw',
  requestCert: false,         // true for client ssl
  rejectUnauthorized: true,
  // hostname: 'localhost', container name if in docker container i.e. backend
  hostname: host,
  port: port
};

global.md = (process.env.tssgApiMtgDebug === 'true') ? Boolean(true) : Boolean(null);
// get jwt validity time (in minutes).
// jwtExp limits are 1 >= jwtExp <= 240 (1 minute to 4 hours)
// jwtExp default is 30 minutes
const jwtExpDefault = 30;
global.jwtExp = process.env.tssgJwtExp || jwtExpDefault;
if (global.jwtExp < 1 || global.jwtExp > 240) {
  // jwtExp is out of bounds, force jwtExpDefault
  global.jwtExp = jwtExpDefault;
  console.log(`Error: jwtExp out of bounds.  jwtExp forced to ${jwtExpDefault} minutes.`);
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
/* This code needs to be reworked since https was added

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

// set true for additional collection index debug info
// mongoose.set('debug', true);

const mongoOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // globally disable autoIndex
  // reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect  -- http://bit.ly/2D8WfT6
  // reconnectInterval: 500, // Reconnect every 500ms                     -- http://bit.ly/2D8WfT6
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};

let dev_db_url = 'mongodb://localhost:27017/tssg-tech';
let mongoDB = process.env.tssgMongoDB_URL || dev_db_url;
// console.log('mongoDB: ' + mongoDB); // connection string may contain a username/password
mongoose.connect(mongoDB, mongoOptions);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log("MongoDB, we're connected!");
  console.log();
});

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// api routes (maps inbound url to a controller)
app.use('/meetings', meeting);
app.use('/venues', venue);
app.use('/users', user);
app.use('/teams', team);

// global error handler
app.use(errorHandler);

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

app.use(express.static(__dirname + '/public'));

// multiple ports (both http & https) can similtaneously be in 'listen' mode
// In order to allow similtaneous http & https we will need to add a second port variable
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

