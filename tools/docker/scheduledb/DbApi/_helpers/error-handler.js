/*
The global error handler is used catch all errors and remove the need for redundant
error handler code throughout the application.
It's configured as middleware in the main server.js file.
*/

module.exports = errorHandler;

function errorHandler(err, req, res, next) {
//   console.log('error-handler.errorHandler: err = ' + err);
    if (typeof (err) === 'string') {
        // custom application error
        consol.error(`\nerrorHandlerCommon String Error: ${err}\n`);
        return res.status(400).json({ message: err });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        console.error(`\nerrorHandler Unauthorized Error: ${JSON.stringify(err)}\n`);
        return res.status(err.status).json({ message: err.message });
    }

    // default to 400 (Bad Request)
    console.error(`\nerrorHandler Bad Request Error: ${JSON.stringify(err)}\n`);
    return res.status(400).json({ message: err });
}
