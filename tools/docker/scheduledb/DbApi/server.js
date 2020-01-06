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

const path = require('path');
global.Root = __dirname;
global.Folders = Root.split(path.sep);
global.PackageName = Folders[Folders.length - 1];

global.md = (process.env.tssgApiMtgDebug === 'true') ? Boolean(true)  : Boolean(null);

// default port setting
let port = process.env.tssgApiPort || 7010;
let host = process.env.tssgApiURL || 'localhost';

// const port = process.env.NODE_ENV === 'production' ? 80 : process.env.tssgApiPort;

/*
process any command line parameters.
case is significant.
  valid parameters:
    -p | --port   <port number>
    -h | --host   <host name or ip>
         --mtgDbg  true otherwise false
To use these, either add them to your package.json scripts or
run node or nodemon manually and add them to the command line.
*/
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

// express wants only the host, not protocol:host
let pos = host.indexOf('://');
if (pos !== -1) {
  host = host.slice(pos + 3);
}
 // set true for additional collection index debug info
// mongoose.set('debug', true);

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // globally disable autoIndex
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
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
mongoose.connect(mongoDB, options);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log("we're connected!");
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

const server = app.listen(port, host, () => {
  console.log('Server is up and running on ' + host + ':' + port);
});
