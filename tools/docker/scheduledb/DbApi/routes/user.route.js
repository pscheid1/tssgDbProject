const express = require('express');
const userRouter = express.Router();
const authorize = require('../_helpers/authorize');
// const config = require('../config.json');
const Role = require('../_helpers/role');

// Require the controllers
const user_controller = require('../controllers/user.controller');

userRouter
// authenticate and register are public routes
.post('/authenticate', user_controller.authenticate)
.post('/register', user_controller.register)
.post('/update', authorize([Role.Admin, Role.User]), user_controller.update)
// findAll limited to roll Admin
.get('/', authorize([Role.Admin]), user_controller.findAll)
// list returns all users excluding role = Contact
.get('/list', authorize([Role.Admin]), user_controller.listUsers)
// contacts returns all users with role = Contact
.get('/contacts', authorize([Role.Admin]), user_controller.listContacts)
// getCurrent retrieves the user imbeded in the token regardless of role
.get('/current', authorize([]), user_controller.getCurrent)
// getById - Read/Update for user's account
//         - All operations for Admin on all accounts
.get('/edit/:_id', authorize(), user_controller.findOne)
// .put('/:id', authorize([Role.Admin]), user_controller.update)
// delete user limited to roll Admin
.get('/delete/:_id', authorize([Role.Admin]), user_controller.delete);

module.exports = userRouter;

