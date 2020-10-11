/**
 * A module for the 'Users' collection
 * @module user.controller.js
 */
const User = require("../models/user.model");
const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Role = require('../_helpers/role');
const randtoken = require('rand-token');
const secret = config.secret;

/**
@property  refreshTokens - Array, local storage for refresh tokens
*/
let refreshTokens = [];

module.exports = {

  /** 
  * Function register adds a new user to the users collection
  * @param {object} req.body - User object to add
  * @return {object} success - status 200 and a json User object
  * @return {object} failure - status 404 and json error message
  */
  register: async function (req, res) {
    await User.findOne(({ username: { $eq: req.body.username } }), function (err, usr) {
      if (usr) {
        return res.status(409).json({ message: 'username "' + req.body.username + '" already exists.' });
      }

      const user = new User(req.body);

      // hash password
      if (req.body.password) {
        user.hash = bcrypt.hashSync(req.body.password, 10);
      }

      // save user
      user.save();
      return res.json({ user });
    });
  },

  /** 
 * Function authenticate verifies and logs on User
 * @summary Calls userAuth(req.body).  userAuth verifies username/password and returns User object & access jwt.
 * @param {object} req - User object to add
 * @return {object} success - status 200 access jwt and User object without hash. BackendVersion and FrontendVersion are added in for frontend.home page display.
 * @return {object} failure - status 404 and json error message
 */
  authenticate: function (req, res) {
    // console.log('user.controller.authenticate: username = ' + req.body.username);
    userAuth(req.body)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        // console.log(`404 - err.name: ${err.name}, err.message: ${err.message}`);
        res.status(404).json({ message: err.message });
      });
  },

  /** 
  * Function logout removes the  refresh jwt from the refreshTokens array
  * @param {string} req.params._id - contains the refresh jwt id
  * @return {object} success - status(200) message
  * @return failure - there is no failure returned.  Refresh jwt was either removed or it did not exist.
  */
  logout: async function (req, res) {
    // console.log(`user.controller.logout.tokenId: ${req.params._id}`);
    // refreshToken will be deleted from refreshTokens array or did not exist
    await manage_refreshTokens('d', req.params._id, '');
    res.status(200).json({ message: 'user logged out' });
  },

  /** 
  * Function refresh requests a refreshed (new) access jwt.
  * @param {string} req.params._id - contains the refresh jwt id
  * @return {object} success - status 200 access jwt and User object without hash. BackendVersion and FrontendVersion are added in for frontend.home page display.
  * @return {object} failure - status 404 and json error message
  */
  refresh: async function (req, res) {
    // req.params._id = '5ceeeb11b23b1e4a40d5bdff';  // force a bad _id
    // console.log(`user.controller.refresh _id: ${req.params._id}`);
    await refreshToken(req.params._id)
      .then(user => {
        if (user === null) {
          // console.log(`user.controller.refresh user === null`);
          throw new Error('User ' + req.params._id + ' not found.');
        } else {
          // let expandedUser = { ...user, 'BACKEND_VERSION': global.BACKEND_VERSION, 'FRONTEND_VERSION': global.FRONTEND_VERSION };
          // res.status(200).json(expandedUser);
          res.status(200).json(user);
        }
      })
      .catch(err => {
        // console.log(`user.controller.refresh bad return from refreshToken: ${err}`);
        res.status(404).json({ message: err.message });
      });
  },

  /** 
  * Function update modifies an existing user.
  * It calls findByIdAndUpdate (one operation) and receives an updated user.
  * @param {object} req.body - All prameters are in a User object in the request body
  * @return {object} success - status 200 and the updated User object
  * @return {object} failure - status 404 and json error message
  */
  update: async function (req, res) {
    // req.body._id = '5ceeeb11b23b1e4a40d5bdff';  // force a bad _id
    await User.findByIdAndUpdate(req.body._id, req.body, { new: true })
      .then(user => {
        if (user === null) {
          // In mongoDB a nonexistent key is not considered an error?
          throw new Error('User ' + req.body._id + ' not found.');
        } else {
          if (req.body.password) {
            // 10 is for the number of saltRounds
            user.hash = bcrypt.hashSync(req.body.password, 10);
            // save user - only need this save if we are updating the password
            user.save();
          }
          res.json(user);
        }
      })
      .catch(err => {
        // console.log(`404 - err.name: ${err.name}, err.message: ${err.message}`);
        res.status(404).json({ message: err.message });
      });
  },

  /** 
  Function findAll returns all users
  * @return {object} success - status 200 and a list of users with hash removed
  * @return {object} failure - status 404 and json error message
  */
  findAll: async function (req, res) {
    //  to force a bad _id (replace code line with following line).  This will change find all to find one non existent user
    // await User.find({ '_id': '5ceeeb11b23b1e4a40d5bdff' }).select('-hash')
    await User.find().select('-hash')
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        // console.log(`404 - err.name: ${err.name}, err.message: ${err.message}`);
        res.status(404).json({ message: err.message });
      });
  },

  /** 
  * Function listUsers produces a sorted list of specific users 
  * @summary because _id is unique we don't have to worry about duplicates
  *          returns a list of user id's, fistname and lastname only, sorted on lastname
  *          role = Contact is excluded
  * @return {object} success - status 200 and a list of users
  * @return {object} failure - status 404 and json error message
  */
  listUsers: async function (req, res) {
    await User.find({ role: { $ne: 'Contact' } })
      .sort({ lastname: 1 })
      .select({ firstname: 1, lastname: 1, role: 1 })
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        res.status(404).json({ message: `${err.name} ${err.message}` });
      });
  },

  /** 
  * Function listContacts produces a sorted list of contacts 
  * @summary because _id is unique we don't have to worry about duplicates
  *          returns a list of user id's, fistname and lastname only, sorted on lastname
  *          role = Contact only
  * @return {object} success - status 200 and a list of users
  * @return {object} failure - status 404 and json error message
  */
  listContacts: async function (req, res) {
    await User.find({ role: { $eq: 'Contact' } })
      .sort({ lastname: 1 })
      .select({ firstname: 1, lastname: 1, role: 1 })
      .then(users => res.json(users))
      .catch(err => {
        res.status(404).json({ message: `${err.name} ${err.message}` });
      });
  },

  /** 
* Function getCurrent returns the logged on user.
* @summary user role === Admin, user account is returned -hash
*          user role === User or Contact, user account is returned -hash, - role
* @param {object} req.user.sub - contains the user id to access
* @return {object} success - status 200 and user (-hash && [-role])
* @return {object} failure - status 404 and json error message
*/
  getCurrent: async function (req, res) {
    // req.user.sub = '5ceeeb11b23b1e4a40d5bdff';  // force a bad _id
    const eliminate = req.user.role === 'Admin' ? '-hash' : '-hash -role';
    await User.findById(req.user.sub).select(eliminate)
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        // console.log(`404 - err.name: ${err.name}, err.message: ${err.message}`);
        res.status(404).json({ message: err.message });
      });
  },

  /** 
  * Function findOne returns a specific user.
  * @param {object} req.params._id - contains the user id (string) to access
  * @return {object} success - status 200 and user
  * @return {object} failure - status 404 and json error message
  */
  findOne: async function (req, res) {
    // req.params._id = '5ceeeb11b23b1e4a40d5bdff';  // force a bad _id
    await User.findById(req.params._id)
      .then(user => {
        // In mongoDB a nonexistent key is not considered an error?
        if (user === null) {
          throw new Error('User ' + req.params._id + ' not found.');
        } else {
          res.json(user);
        }
      })
      .catch(err => {
        // console.log(`user.controller.findOne: ${err}`);
        res.status(404).json({ message: err.message });
      });
  },

  /** 
  * Function delete removes a specific user
  * @param {object} req.params._id - contains the id {string} of user to delete
  * @return {object} success - status 200 and user deleted message
  * @return {object} failure - status 404 and json error message
  */
  delete: async function (req, res) {
    // req.params._id = '5d449dac8b7d7853fcc086ff';  // force a bad _id
    await User.findByIdAndDelete(req.params._id)
      .then(user => {
        // if removed, then removed user is returned
        res.status(200).json('' + user._id + ': deleted.');
      })
      .catch(err => {
        // console.log(`404 - err.name: ${err.name}, err.message: ${err.message}`);
        res.status(404).json({ message: err.message });
      });
  },


  /** 
  * Function test is a simple test,  returning data without validation or authentication
  * @return {string} Message returning a few system variables
  */
  test: function (req, res) {
    res.send(
      `collection: users - globalRoot: ${global.Root} - folders: ${global.Folders} - packageName: ${global.PackageName} - __dirname: ${__dirname}`
    );
  }
};

// User services
// These functions are not exported

/** 
* Function userAuth verifies username/password & creates the access jwt and refresh jwt tokens.
* @summary Called from user.controller authenticate
* @param {string} username - User.username 
* @param {string} password - User.password
* @return success - User userWithoutHash, access token. Refresh token stored in refreshTokn Array.
* @return failure - Throws new Error('error message') 
*/
async function userAuth({ username, password }) {
  const user = await User.findOne({ username });
  if (!user) {
    // we know username is bad, but inform user it could be either
    throw new Error('Incorrect username/password.');
  }
  if (user && bcrypt.compareSync(password, user.hash)) {
    const { hash, ...userWithoutHash } = user.toObject();
    // create access token & refresh token ids
    accessTokenId = randtoken.uid(32);
    refreshTokenId = randtoken.uid(32);
    // create access token
    const token = jwt.sign(
      {
        sub: user.id,
        role: user.role,
        jti: accessTokenId,
        alt_jti: refreshTokenId,
        // iat: is automatically set by default to seconds since 01/01/1970
        // set expiration time to time now in seconds since 01/01/1970 + global.jwtExp * 60
        exp: Math.floor(Date.now() / 1000) + (global.accessJwtExpiry * 60)
      }, config.secret);
    // create refresh token
    const rToken = jwt.sign(
      {
        sub: user.id,
        role: user.role,
        jti: refreshTokenId, exp: Math.floor(Date.now() / 1000) + (global.refreshJwtExpiry * 60)
      }, config.refreshSecret);
    // add Id and rToken to refreshTokens array
    manage_refreshTokens('a', refreshTokenId, rToken);
    // for now, use this to list refreshTokens array
    // manage_refreshTokens('t', '', '');
    return {
      ...userWithoutHash,
      token
    };
  }
  // we know password is bad, but inform user it could be either
  throw new Error('Incorrect username/password.');
}


//
// request is made.
//  access token has expired.
//    user must re-login.
//  access token is valid.
//    request for new access token is made.
//      refresh token has expired.
//        user must re-login.
//      resresh token is valid.
//        issue a new access token.
// process repeates until access or refresh token expires.
// access token validity period is typically 5 to 15 minutes.
// refresh token validity period is typically 2 to 4 hours.


/** 
* Function refreshToken created a new access tokon.
* @summary:
*   If we are here, a request has been made to the backend. (User.refresh() above.)
*   The request requires a valid  access JWT, therefore the access JWT has not expipred.
*   Since the JWT has not expired and if the refreshToken has not expired,  we will refresh (create a new) access token.
* @param {string} tokenId - Id of refresh token.
* @return success - User userWithoutHash, access token.
* @return failure - Throws new Error('error message') 
*/
async function refreshToken(tokenId) {
  // console.log(`user.controller.refreshToken tokenId: ${tokenId}`);
  // if (1) return;
  const refreshToken = await manage_refreshTokens('v', tokenId, '');
  if (refreshToken === null) {
    throw new Error('Invalid refresh token ID.');
  }
  let rawRefreshToken;
  try {
    rawRefreshToken = jwt.decode(refreshToken);
  } catch (err) {
    throw new Error(`Could not decode refresh token. Error: ${err}`);
  }
  // console.log(`user.controller.refreshToken raw refresh token: ${JSON.stringify(rawRefreshToken)}`);
  const currentTime = new Date().getTime() / 1000;
  // console.log(`\nuser.controller.refreshToken currentTime: ${currentTime}`);
  // console.log(`user.controller.refershToken token expiring time: ${rawRefreshToken.exp}\n`)
  if (currentTime > rawRefreshToken.exp) {
    throw new Error(`user.controller.refreshToken Error: Refresh Token Expired.`);
  }
  // we could get the needed token fields from the refreshToken, but 
  // we need all the user account fields as we return them both.
  const user = await User.findOne({ '_id': rawRefreshToken.sub });
  if (!user) {
    throw new Error('Could not locate refresh token user in database');
  }
  // console.log(`user.controller.refreshToken user: ${JSON.stringify(user)}`);
  const { hash, ...userWithoutHash } = user.toObject();
  // create access token
  const token = jwt.sign(
    {
      sub: user.id,
      role: user.role,
      jti: randtoken.uid(32),
      alt_jti: refreshTokenId,
      // iat: is automatically set by default to seconds since 01/01/1970
      // set expiration time to time now in seconds since 01/01/1970 + global.jwtExp * 60
      exp: Math.floor(Date.now() / 1000) + (global.accessJwtExpiry * 60)
    }, config.secret);
  // refresh token does not maintain a backpointer to the access token, so no need to update and resign it
  // console.log(`user.controller.refreshToken - newToken: ${JSON.stringify(token)}`);
  return {
    ...userWithoutHash,
    token
  };

}

/** 
* Function manage_refreshTokens perfoms various operations on the refreshTokens array;
* @summary:
*   Add will add a refresh jwt to the refreshToken arrary.
*   Delete will remove a refresh jwt from the refreshToken array.
*   Trim will loop through the refreshToken array and delete any expired tokens.
*   Verify will return a refresh jwt if it has not expired, otherwise it returns null
* @param {string} op - 'a', 'd', 't', 'v'.
* @param {string} id - refresh jwt id for a, d, and v. Empty for t.
* @param {string} token - encoded jwt for a.  Empty for d, t and v.
* @return success - No return for a, d and t.  
* @return success - encoded jwt for v.
* @return failure - a, Throws new Error('error message').
* @return failure - d, No return
* @return failure - t, No return
* @return failure - v, Null
*/
function manage_refreshTokens(op, id, token) {
  // console.log(`user.controller.manage_refreshTokens: op = ${op}, id = ${id}, token = ${token}`);
  // console.log(`user.controller.manage_refreshTokens: op = ${op}, id = ${id}`);
  let tempTokens = [];
  var key;
  // let token;
  switch (op) {
    case 'a':
      // add token to refreshTokens array
      try {
        jwt.verify(token, config.refreshSecret);
      } catch (err) {
        // token is not valid
        // console.log(`user.conroller.manage_refreshTokens.a: token not valid, not added - ${id}`);
        throw err;
      }
      refreshTokens[id] = token;
      // console.log(`user.conroller.manage_refreshTokens.a: token added - ${id}: ${token}`);
      // console.log(`user.conroller.manage_refreshTokens.a token added - id: ${id}`);
      break;
    case 'd':
      // delete token from refreshTokens array
      for (key in refreshTokens) {
        token = refreshTokens[key];
        if (key !== id) {
          // keep this token
          tempTokens[key] = token;
        } else {
          // token not added to tempTokens and therefore will be deleted
          // console.log(`user.conroller.manage_refreshTokens.d: token deleted - ${id}: ${token}`);
          // console.log(`user.conroller.manage_refreshTokens.d token deleted - id: ${id}`);
        }
      }
      // this keeps all tokens except any with key === id
      // velidy of kept tokens is not verified
      refreshTokens = tempTokens;
      break;
    case 't':
      // trim refreshTokens array
      for (key in refreshTokens) {
        token = refreshTokens[key];
        // console.log(`user.conroller.manage_refreshTokens.t jwt id: ${key} tokeh: ${token}`);
        // console.log(`user.conroller.manage_refreshTokens.t jwt id: ${key}`);
        try {
          jwt.verify(token, config.refreshSecret);
          // add valid token to tempTokens array
          tempTokens[key] = token;
          // console.log(`user.conroller.manage_refreshTokens.t jwt id: ${key} kept`);
        } catch (err) {
          // invalid tokens are not added to the tempTokens array and are therefore dropped from the refreshTokens array
          // this gets rid of any expired refreshTokens
          // console.log(`user.conroller.manage_refreshTokens.t ${err}`);
          // console.log(`user.conroller.manage_refreshTokens.t: invalid token deleted - ${key}: ${token} `);
          // console.log(`user.conroller.manage_refreshTokens.t token deleted - id: ${key}`);
        }
      }
      // replace refreshTokens array with array of tempTokens
      refreshTokens = tempTokens;
      break;
    case 'v':
      // verify & return token
      token = refreshTokens[id];
      try {
        jwt.verify(token, config.refreshSecret);
        // console.log(`user.conroller.manage_refreshTokens.v: token verified - ${id}: ${token}`);
        // console.log(`user.conroller.manage_refreshTokens.v: token verified - id: ${id}`);
        return token;
      } catch (err) {
        // console.log(`user.conroller.manage_refreshTokens.v: token not valid - id: ${id}`);
        return null;
      }
  }

}
