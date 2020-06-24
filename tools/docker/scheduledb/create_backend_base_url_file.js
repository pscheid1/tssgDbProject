// fs.writeFile(file, data[, options, callback])
// fs.writeFileSync(file, data[, options])
//
// options= {
//  encoding,
//  flags,
//  mode
//}

/* 
    This code will create a javascript file in the site/scripts directory named tssgBackendURL.js.
    The code in this file is one javascript const (tssgBackendURL) initialized to the tssgTech backend url and port.
    The resulting javascript file will contain a value equal or similar to: const tssgBackendURL = http://backend:7010
    The values are obtaned from BACKEND_BASE_URL and BACKEND_BASE_PORT environment variables.
    This file will be loaded in by the schedule.html site file and used to access the tssgTech meetings schedule from
    the DbApi backend container.
  */

const fs = require('fs');
// const buf = Buffer.from(`const tssgBackendURL = '${process.env.tssgApiProtocol}//${process.env.tssgApiURL}:${process.env.tssgApiPort}';`);
const buf = Buffer.from(`const tssgBackendURL = '${process.env.BACKEND_BASE_URL}:${process.env.BACKEND_BASE_PORT}';`);
console.log(`buf: ${buf}`);
const path = '../../../site/scripts/tssgBackendURL.js';
fs.writeFile(path, buf, (err) => {
    if (err) {
        console.log(`backend_base_url.js writeFiel error: ${err.message}`);
    }
});