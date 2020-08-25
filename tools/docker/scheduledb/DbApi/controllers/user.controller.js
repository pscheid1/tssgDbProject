const User = require("../models/user.model");
const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Role = require('../_helpers/role');
const randtoken = require('rand-token');
const secret = config.secret;

// local storage for refresh tokens
let refreshTokens = [];

module.exports = {
  // Add user
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

  authenticate: function (req, res) {
    // console.log('user.controller.authenticate: username = ' + req.body.username);
    userAuth(req.body)
      .then(user => {
        let expandedUser = { ...user, 'backendVersion': global.backendVersion, 'frontendVersion': global.frontendVersion };
        res.status(200).json(expandedUser);
      })
      .catch(err => {
        // console.log(`404 - err.name: ${err.name}, err.message: ${err.message}`);
        res.status(404).json({ message: err.message });
      });
  },

  // remove refreshToken from refreshTokens array
  logout: async function (req, res) {
    // console.log(`user.controller.logout.tokenId: ${req.params._id}`);
    // refreshToken will be deleted from refreshTokens array or did not exist
    await manage_refreshTokens('d', req.params._id, '');
    res.status(200).json({ message: 'user logged out' });
  },

  // request a new refresh token
  refresh: async function (req, res) {
    // req.params._id = '5ceeeb11b23b1e4a40d5bdff';  // force a bad _id
    // console.log(`user.controller.refresh _id: ${req.params._id}`);
    await refreshToken(req.params._id)
      .then(user => {
        if (user === null) {
          // console.log(`user.controller.refresh user === null`);
          throw new Error('User ' + req.params._id + ' not found.');
        } else {
          let expandedUser = { ...user, 'backendVersion': global.backendVersion, 'frontendVersion': global.frontendVersion };
          res.status(200).json(expandedUser);
        }
      })
      .catch(err => {
        // console.log(`user.controller.refresh bad return from refreshToken: ${err}`);
        res.status(404).json({ message: err.message });
      });
  },

  update: async function (req, res) {
    // req.body._id = '5ceeeb11b23b1e4a40d5bdff';  // force a bad _id
    await User.findByIdAndUpdate(req.body._id, req.body, { new: true })
      .then(user => {
        if (user === null) {
          // In mongoDB a nonexistent key is not considered an error?
          throw new Error('User ' + req.body._id + ' not found.');
        } else {
          if (req.body.password) {
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

  findAll: async function (req, res) {
    // await User.find({ '_id': '5ceeeb11b23b1e4a40d5bdff' }).select('-hash')    //  to force a bad _id (replace following line)
    await User.find().select('-hash')
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        // console.log(`404 - err.name: ${err.name}, err.message: ${err.message}`);
        res.status(404).json({ message: err.message });
      });
  },

  // because _id is unique we don't have to worry about duplicates
  // returns a list of user id's, fistname and lastname only, sorted on lastname
  // role = Contact is excluded
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

  // because _id is unique we don't have to worry about duplicates
  // returns a list of user id's, fistname and lastname only, sorted on lastname
  // role === Contact only
  listContacts: async function (req, res) {
    await User.find({ role: { $eq: 'Contact' } })
      .sort({ lastname: 1 })
      .select({ firstname: 1, lastname: 1, role: 1 })
      .then(users => res.json(users))
      .catch(err => {
        res.status(404).json({ message: `${err.name} ${err.message}` });
      });
  },

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

  // delete a specific entry by _id
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
  //Simple version, without validation or sanitation
  test: function (req, res) {
    res.send(
      `collection: users - globalRoot: ${global.Root} - folders: ${global.Folders} - packageName: ${global.PackageName} - __dirname: ${__dirname}`
    );
  }
};

// User services
// These functions are not exported

// verify username/password & create token
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
        exp: Math.floor(Date.now() / 1000) + (60), //(global.jwtExp * 60),
      }, config.secret);
    // create refresh token
    // const rToken = jwt.sign({ sub: user.id, role: user.role, jti: refreshTokenId, exp: Math.floor(Date.now() / 1000) + (global.refreshJwtExp * 60) }, config.refreshSecret); 
    const rToken = jwt.sign({ sub: user.id, role: user.role, jti: refreshTokenId, exp: Math.floor(Date.now() / 1000) + 120 }, config.refreshSecret);
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

// If we are here, a request has been made to the backend.
// The request requires a valid  access JWT, therefore the access JWT has not expipred.
//Ssince the JWT has not expired, we will refresh (create a new) access token.
// However, the access token will not be refreshed unless the refreshToken has not expired.
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
      exp: Math.floor(Date.now() / 1000) + (60), // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>(global.jwtExp * 60),
    }, config.secret);
  // refresh token does not maintain a backpointer to the access token, so no need to update and resign it
  // console.log(`user.controller.refreshToken - newToken: ${JSON.stringify(token)}`);
  return {
    ...userWithoutHash,
    token
  };

}


function manage_refreshTokens(op, id, token) {
  // console.log(`user.controller.manage_refreshTokens: op = ${op}, id = ${id}, token = ${token}`);
  // console.log(`user.controller.manage_refreshTokens: op = ${op}, id = ${id}`);
  let validTokens = [];
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
          validTokens[key] = token;
        } else {
          // token not added to validTokens and therefore will be deleted
          // console.log(`user.conroller.manage_refreshTokens.d: token deleted - ${id}: ${token}`);
          // console.log(`user.conroller.manage_refreshTokens.d token deleted - id: ${id}`);
        }
      }
      // this keeps all tokens except any with key === id
      // velidy of kept tokens is not verified
      refreshTokens = validTokens;
      break;
    case 't':
      // trim refreshTokens array
      for (key in refreshTokens) {
        token = refreshTokens[key];
        // console.log(`user.conroller.manage_refreshTokens.t jwt id: ${key} tokeh: ${token}`);
        // console.log(`user.conroller.manage_refreshTokens.t jwt id: ${key}`);
        try {
          jwt.verify(token, config.refreshSecret);
          // add valid token to validTokens array
          validTokens[key] = token;
          // console.log(`user.conroller.manage_refreshTokens.t jwt id: ${key} kept`);
        } catch (err) {
          // invalid tokens are not added to the validTokens array and are therefore dropped from the refreshTokens array
          // this gets rid of any expired refreshTokens
          // console.log(`user.conroller.manage_refreshTokens.t ${err}`);
          // console.log(`user.conroller.manage_refreshTokens.t: invalid token deleted - ${key}: ${token} `);
          // console.log(`user.conroller.manage_refreshTokens.t token deleted - id: ${key}`);
        }
      }
      // replace refreshTokens array with array of validTokens
      refreshTokens = validTokens;
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


