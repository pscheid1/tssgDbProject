const express = require('express');
const userRouter = express.Router();
const authorize = require('../_helpers/authorize');
// const config = require('../config.json');
const Role = require('../_helpers/role');

// Require the controllers
const user_controller = require('../controllers/user.controller');

userRouter
// authenticate is a public route.  Login not required and callable by any role
.post('/authenticate', user_controller.authenticate)
// user logout is called to delete the refresh token specified in _id
.get('/logout/:_id', user_controller.logout)
// The frontend will not allow a request to the backend if the access jwt has expired.  It
// will force a user login.
// If the access token has not expired, the frontend will make the fllowing call to user/refresh, passing
// in the id of the refresh token.
// If the refresh token has not expired, it will issue a new access token to the frontend.  This resets the
// jwt validity period.
// The expired refresh token state will be returned to the frontend forcing a user login.
.get('/refresh/:_id', user_controller.refresh)

.post('/register', authorize([Role.Admin]), user_controller.register)
// user update will post updated user data
.post('/update', authorize([Role.Admin, Role.User]), user_controller.update)
// .put('/:id', authorize([Role.Admin]), user_controller.update)
// findAll limited to roll Admin
.get('/', authorize([Role.Admin]), user_controller.findAll)
// list returns all users excluding role = Contact
.get('/list', authorize([Role.Admin]), user_controller.listUsers)
// contacts returns all users with role = Contact
.get('/contacts', authorize([Role.Admin]), user_controller.listContacts)
// getCurrent retrieves the user embeded in the token regardless of role
.get('/current', authorize([]), user_controller.getCurrent)
// user/edit will return the user data for update
.get('/edit/:_id', authorize(), user_controller.findOne)
// delete user limited to roll Admin
.get('/delete/:_id', authorize([Role.Admin]), user_controller.delete)
// test is a public route.  Login not required and callable by any role
.get('/test', user_controller.test);

module.exports = userRouter;

