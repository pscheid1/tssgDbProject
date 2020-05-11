const User = require("../models/user.model");
const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Role = require('../_helpers/role');

const secret = config.secret;

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
        // res.status(404).json({ message: `${err.name} ${err.message}` });
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
        console.log(`404 - err.name: ${err.name}, err.message: ${err.message}`);
        res.status(404).json({ message: err.message });
        // res.status(400).json({ message: err.name + ' ' + err.message });
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
        // console.log(`404 - err.name: ${err.name}, err.message: ${err.message}`);
        res.status(404).json({ message: err.message });
      });
  },

  // delete a specific entry by _id
  delete: async function (req, res) {
    // req.params._id = '5d449dac8b7d7853fcc086ff';  // force a bad _id
    await User.findByIdAndDelete(req.params._id)
      .then(user => {
        // In mongoDB a nonexistent key is not considered an error?
        if (user === null) {
          throw new Error('User ' + req.params._id + ' not found.');
        } else {
          // if removed, then removed user is returned
          res.status(200).json('' + user._id + ': deleted.');

        }
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

// verify username/password & create token
async function userAuth({ username, password }) {
  const user = await User.findOne({ username });
  if (!user) {
    // we know username is bad, but inform user it could be either
    throw new Error('Incorrect username/password.');
  }
  if (user && bcrypt.compareSync(password, user.hash)) {
    const { hash, ...userWithoutHash } = user.toObject();
    // create token
    const token = jwt.sign(
      {
        sub: user.id,
        role: user.role,
        // iat: is automatically set by default to seconds since 01/01/1970
        // set expiration time to time now in seconds since 01/01/1970 + global.jwtExp * 60
        exp: Math.floor(Date.now() / 1000) + (global.jwtExp * 60),
      }, config.secret);
    return {
      ...userWithoutHash,
      token
    };
  }
  // we know password is bad, but inform user it could be either
  throw new Error('Incorrect username/password.');
}
