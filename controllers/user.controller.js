const User = require("../models/user.model");
const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Role = require('../_helpers/role');

let secret = config.secret;

module.exports = {

  register: async function (req, res, next) {
    // console.log('user.controller.register: username = ' + req.body.username);
    await User.findOne(({ username: { $eq: req.body.username } }), function (err, usr) {
      if (usr) {
        // console.log('user.controller.register: username: ' + req.body.username + ' found.');
        return res.status(400).json({ message: 'username ' + req.body.username + ' already exists.' });
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

  authenticate: function (req, res, next) {
    // console.log('user.controller.authenticate: username = ' + req.body.username);
    userAuth(req.body)
      .then(user => user ? res.status(200).json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
      .catch(err => next(err));
  },

  update: async function (req, res, next) {
    // console.log('user.controller.update._Id: ' + req.body._id);
    // console.error('user.controller.update.username: ' + req.body.username);
    await User.findByIdAndUpdate(req.body._id, req.body, { new: true })
      .then(user => {
        if (req.body.password) {
          user.hash = bcrypt.hashSync(req.body.password, 10);
          // save user - only need this save if we are updating the password
          user.save();
        }
        res.json(user)
      })
      .catch(err => {
        // console.log('user.controller.update: err = ' + err);
        next(err);
      });
  },

  findAll: async function (req, res, next) {
    await User.find({}).select('-hash')
      .then(users => res.json(users))
      .catch(err => {
        // console.log('user.controller.update: err = ' + err);
        next(err);
      });
  },

  // because _id is unique we don't have to worry about duplicates
  // returns a list of user id's, fistname and lastname only, sorted on lastname
  listUsers: async function (req, res, next) {
    await User.find({role: { $ne: 'Contact' }})
      .sort({lastname:1})
      // .select({ hash: 0})
      .select({firstname: 1, lastname: 1, role: 1})
      .then(users => res.json(users))
      .catch(err => {
        // console.log('user.controller.update: err = ' + err);
        next(err);
      });

  },

  getCurrent: async function (req, res, next) {
    // console.log('user.controller.getCurrent: _id = ' + req.user._id);
    let eliminate = req.user.role === 'Admin' ? '-hash' : '-hash -role';
    await User.findById(req.user.sub).select(eliminate)
      .then(user => user ? res.json(user) : res.status(404).json(`Error: ${req.user.sub} Not Found`))
      .catch(err => next(err));
  },

  findOne: async function (req, res, next) {
    // console.log('user.controller.findOne: _id = ' + req.params._id);
    await User.findById(req.params._id).select('-hash')
      .then(user => user ? res.json(user) : res.status(404).json(`Error: ${req.params._id} Not Found`))
      .catch(err => next(err));
  },

  // delete: async function (req, res) {
  //   await User.findByIdAndDelete(req.params._id)
  //     .then(successResponse => {
  //       if (successResponse) {
  //         // console.log('user.controller.delete success');
  //         res.status(200).json('' + req.params._id + ' deleted.');
  //       } else {
  //         // console.log('user.controller.delete failed');
  //         res.status(404).json({ 'error': 'delete ' + req.params._id + ' failed.' });
  //       }
  //     });
  // }

    // delete a specific entry by _id
    delete: async function (req, res) {
      req.params._id = 'abc123ABC456';
      console.log('user *********************: ' + req.params._id);
      await User.findByIdAndDelete(req.params._id)
        .then(user => {
        console.log('user.controller.delete: ' + user._id + ' deleted.');
        res.json(user + ": deleted");
        })
        .catch(err => {
          console.log('user.controller.delete - err: ' + err.name + ':' + err.message);
          err.message = ' Not Found - ' + err.message;
          console.log('user.controller.delete - err: ' + err.name + ':' + err.message);
          res.status(404).json(err.code);
        });
      }  
};

// User services

// verify username/password & create token
async function userAuth({ username, password }) {
  const user = await User.findOne({ username });
  if (user && bcrypt.compareSync(password, user.hash)) {
    const { hash, ...userWithoutHash } = user.toObject();
    // create token
    const token = jwt.sign(
      {
        sub: user.id,
        role: user.role,
        // iat: is automatically set by default to seconds
        // set expiration time to 2 hours after creation time
        exp: Math.floor(Date.now() / 1000) + (2 * 60 * 60), // 2 hr * 60 min * 60 sec = 2 hr in seconds
        // for testing, swap line below with line above
        // exp: Math.floor(Date.now() / 1000) + (60), // test time of 1 minute
      }, config.secret);
    return {
      ...userWithoutHash,
      token
    };
  }
};
