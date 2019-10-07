const express = require('express');
const venueRouter = express.Router();
const authorize = require('../_helpers/authorize');
const Role = require('../_helpers/role');

// Require the controllers
const venue_controller = require('../controllers/venue.controller');

venueRouter
    .get('/', authorize([Role.Admin]), venue_controller.findAll)
    .get('/venues', authorize([Role.Admin]), venue_controller.listVenues)
    .get('/edit/:_id', authorize([Role.Admin]), venue_controller.findOne)
    .post('/update', authorize([Role.Admin]), venue_controller.update)
    .post('/add', authorize([Role.Admin]), venue_controller.create)
    .get('/delete/:_id', authorize([Role.Admin]), venue_controller.delete)
    .get('/test', venue_controller.test);

module.exports = venueRouter;


