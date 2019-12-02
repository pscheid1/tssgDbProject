const express = require('express');
const meetingRouter = express.Router();
const authorize = require('../_helpers/authorize');
const Role = require('../_helpers/role');

// Require the controllers
const meeting_controller = require('../controllers/meeting.controller');

meetingRouter

.get('/', authorize([Role.Admin]), meeting_controller.findAll)
.get('/edit/:_id', authorize([Role.Admin]), meeting_controller.findOne)
.post('/update', authorize([Role.Admin]), meeting_controller.update)
.post('/add', authorize([Role.Admin]), meeting_controller.create)
.get('/delete/:_id', authorize([Role.Admin]), meeting_controller.delete)
.get('/schedule', authorize([Role.Admin]),meeting_controller.schedule)
.get('/schedule/:team', authorize([Role.Admin]),meeting_controller.schedule)
.get('/webSchedule/:team', meeting_controller.webSchedule)
.get('/test', meeting_controller.test);

module.exports = meetingRouter;
