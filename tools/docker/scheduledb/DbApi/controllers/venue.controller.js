/**
 * A module for the 'Meetings' collection
 * @module meeting.controller.js
 */
const Venue = require("../models/venue.model");

/** 
* Function toarray returns an array of venue ids from an array of Venue objects
* @param {string} venues - list of venues
* @return {string[]} venue*ds - array of venue ids.
*/
function toarray(venues) {
  let venueIds = [];
  var tempStr;
  var i1;
  var i2;

  for (i = 0; i < venues.length; i++) {
    tempStr = venues[i].toString();
    i1 = tempStr.indexOf("'");
    i2 = tempStr.lastIndexOf("'");
    if (i1 === -1 || i2 === -1) continue;
    venueIds.push(tempStr.substring(++i1, i2));
  }
  // array of strings (venueIds)
  return venueIds;
}

module.exports = {

  /** 
  * Function create adds a new venue to the venue collection
  * @param {object} req.body - Venue object to add
  * @return {object} success - status 200 and a json Venue object
  * @return {object} failure - status 404 and json Meeting message
  */
  create: async function (req, res, next) {
    await Venue.create(req.body)
      .then(newVenue => res.json(newVenue))
      .catch(err => {
        res.status(409).json({ message: err.message });
      });
  },

  /** 
  * Function update modifies an existing venue.
  * It calls findByIdAndUpdate (one operation) and receives an updated venue.
  * @param {object} req.body - All prameters are in a Venue object in the request body
  * @return {object} success - status 200 and the updated Venue object
  * @return {object} failure - status 404 and json error message
  */
  update: async function (req, res, next) {
    await Venue.findByIdAndUpdate(req.body._id, req.body, { new: true })
      .then(venue => {
        // a bad or nonexistent key is not considered an error?
        if (venue === null) {
          throw new Error('Venue ' + req.body._id + ' not found.');
        } else {
          res.json(venue);
        }
      })
      .catch(err => {
        res.status(404).json({ message: err.message });
      });
  },

  /** 
  * Function findAll returns a list of all venue entries
  * @return {object} success - status 200 and a list of venues.
  * @return {object} failure - status 404 and json error message
  */
  findAll: async function (req, res) {
    await Venue.find({}, {}, function (err, venue) {
    })
      .then(venues => res.json(venues))
      .catch(err => {
        console.log(`404 - err.name: ${err.name}, err.message: ${err.message}`);
        res.status(404).json({ message: err.message });
      });
  },

  /** 
  * Function listVenues produces a sorted list of venue id's only 
  * @summary because _id is unique we don't have to worry about duplicates
  *          returns a list of venue id's
  * @return {object} success - status 200 and a list of venue Ids
  * @return {object} failure - status 404 and json error message
  */
  listVenues: async function (req, res, next) {
    await Venue.find({}, { _id: 1 }, function (err, venue) { })
      .sort({ _id: 1 })
      // toarray() returns a sorted list of venue _id's
      .then(venues => res.json(toarray(venues)))
      .catch(err => res.status(404).json(err.message));
  },

  /** 
  * Function findOne returns a specific venue.
  * @param {object} req.params._id - contains the venue id (string) to access
  * @return {object} success - status 200 and venue
  * @return {object} failure - status 404 and json error message
  */
  findOne: function (req, res) {
    // req.params._id = '5ceeeb11b23b1e4a40d5bdff';  // force a bad _id
    Venue.findById(req.params._id, function (err, venue) {
    })
      .then(venue => {
        // a bad or nonexistent key is not considered an error?
        if (venue === null) {
          throw new Error('Venue "' + req.params._id + '" not found.');
        } else {
          res.json(venue);
        }
      })
      .catch(err => {
        res.status(404).json({ message: err.message });
      });
  },

  /** 
  * Function delete removes a specific venue.
  * @param {object} req.params._id - contains the id {string} of venue to delete
  * @return {object} success - status 200 and venue deleted message
  * @return {object} failure - status 404 and json error message
  */
  delete: async function (req, res) {
    // req.params._id = '5d449dac8b7d7853fcc086ff';  // force a bad _id
    await Venue.findByIdAndDelete(req.params._id)
      .then(venue => {
        // if removed, then removed venue is returned
        res.status(200).json('' + venue._id + ': deleted.');
      })
      .catch(err => {
        res.status(404).json({ message: err.message });
      });
  },

  /** 
  * Function test is a simple test,  returning data without validation or authentication
  * @return {string} Message returning a few system variables
  */
  test: function (req, res) {
    res.send(
      `collection: venues - globalRoot: ${global.Root} - folders: ${global.Folders} - packageName: ${global.PackageName} - __dirname: ${__dirname}`
    );
  }
};
