const express = require('express');
const teamRouter = express.Router();
const authorize = require('../_helpers/authorize');
const Role = require('../_helpers/role');

// Require the controllers
const team_controller = require('../controllers/team.controller');

teamRouter

.get('/', authorize([Role.Admin]), team_controller.findAll)
.get('/teams', authorize([Role.Admin]), team_controller.listTeams)
.get('/edit/:_id', authorize([Role.Admin]), team_controller.findOne)
.post('/update', authorize([Role.Admin]), team_controller.update)
.post('/add', authorize([Role.Admin]), team_controller.create)
.get('/delete/:_id', authorize([Role.Admin]), team_controller.delete);

module.exports = teamRouter;
