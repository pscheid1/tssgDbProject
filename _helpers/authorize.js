
/*
The authorize middleware can be added to any route to restrict access to authenticated users within specified roles.
If the roles parameter is left blank then the route will be restricted to any authenticated user regardless of role.
It's used in the users controller to restrict access to the "get all users" and "get user by id" routes.

The authorize function actually returns 2 middleware functions, the first (expressJwt({ secret })) authenticates the
request by validating the JWT token in the Authorization http request header. On successful authentication a user object
is attached to the req object that contains the data from the JWT token, which in this case includes the user id (req.user.sub)
and user role (req.user.role). The sub property is short for subject and is the standard JWT property for storing the id of the
item in the token.

The second middleware function checks that the authenticated user is authorized to access the requested route based on
their role. If either authentication or authorization fails then a 401 Unauthorized response is returned.
 */


const expressJwt = require('express-jwt');
const { secret } = require('../config.json');
const Role = require('../_helpers/role');

module.exports = authorize;

function authorize(roles = []) {
    // roles param can be a single role string (e.g. Role.User or 'User')
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }
    return [
        // authenticate JWT token and attach user to request object (req.user)
        expressJwt({ secret }),

        // authorize based on user role
        // user.role is stored in token by user.controller.authenticate
        (req, res, next) => {
            if (roles.length && !roles.includes(req.user.role)) {
                // user's role is not authorized
                // console.log('authorize: role failure.');
                return res.status(401).json({ message: 'Unauthorized' });
            }
            // authentication and authorization successful
            // console.log('authorize: No role required or role passes');
            next();
        }
    ];
}
