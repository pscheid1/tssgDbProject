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


let protocol; // not using any more, but we'll leave it in for now.

const port = process.env.BACKEND_BASE_PORT || 7010;
let host = (process.env.BACKEND_BASE_URL || 'http://backend').toLowerCase();

// strip any protocol off.  We're forcing to http down below.
if (host.includes('://')) {
  let n = host.indexOf('://');
  protocol = host.slice(0, n);
  host = host.slice(n + 3);
} else {
  protocol = 'http';
}

// global.backendVersion = process.env.BACKEND_VERSION || '1.4 ext';
// global.frontendVersion = process.env.FRONTEND_VERSION || '1.4 ext';

// get jwt validity time (in minutes).
// accessJwtExpiry limits are 1 >= accessJwtExpiry <= 240 (1 minute to 4 hours)
// accessJwtExpiry default is 15 minutes
const accessJwtExpiryDefault = 15;
global.accessJwtExpiry = process.env.BACKEND_ACCESS_JWT || accessJwtExpiryDefault;
// limit access token from 1 to 30 minutes
if (parseInt(global.accessJwtExpiry) < 1 || parseInt(global.accessJwtExpiry) > 30) {
  // accessJwtExpiry is out of bounds, force to accessJwtExpiryDefault
  global.accessJwtExpiry = accessJwtExpiryDefault;
  console.log(`Error: BACKEND_ACCESS_JWT out of bounds.  accessJwtExpiry forced to ${accessJwtExpiryDefault} minutes.`);
}

// get refresh jwt validity time (in minutes).
// refreshJwtExpiry limits are global.accessJwtExpiry  >= refreshJwtExpiry <= 240 (1 minute to 4 hours)
// refreshJwtExpiry default is 120 minutes
const refreshJwtExpiryDefault = 120; // (120 minutes or 2 hours )
global.refreshJwtExpiry = process.env.BACKEND_REFRESH_JWT || refreshJwtExpiryDefault;
// limit refresJwtExp to > global.accessJwtExpiry to <= 120 minutes ( < 2 hours)
if (parseInt(global.refreshJwtExpiry) <= parseInt(global.accessJwtExpiry) || parseInt(global.refreshJwtExpiry) > 240) {
  // refreshJwtExpiry is out of bounds, force to refreshJwtExpDefault
  global.refreshJwtExpiry = refreshJwtExpiryDefault;
  console.log(`Error: BACKEND_REFRESH_JWT out of bounds.  refreshJwtExpiry forced to ${refreshJwtExpiryDefault} minutes.`);
}

// console.log(`backend.server: global.accessJwtExpiry: ${global.accessJwtExpiry}`);
// console.log(`backend.server: global.refreshJwtExpiry: ${global.refreshJwtExpiry}`);


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

let mongoDB = '';
const mongo_destination = process.env.BACKEND_DB_DEST || '';
// console.log(`server mongo_destination: ${mongo_destination}`);
if (mongo_destination === 'container') {
  // mongo is inside a container
  mongoDB = process.env.MONGO_WIN_CONTAINER_URL;
  // backend is outside of a container
  host = 'localhost';
} else if (mongo_destination === 'native') {
  mongoDB = process.env.MONGO_WIN_NATIVE_URL;
} else {
  mongoDB = process.env.MONGO_URL;
}

// WARNING: Enabling the following console.log statement may display username and password
// console.log(`DbApi.server.js mongoDB: ${mongoDB}`);

mongoose.connect(mongoDB, mongoOptions);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'DbApi.server.js MongoDB connection error:'));
db.once('open', function () {
  console.log("DbApi.server.js MongoDB, we're connected!");
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

// create an http server
http.createServer(app).listen(port, host, function () {
  console.log(`HTTP Server is up and running on http://${host}:${port}`);
});
