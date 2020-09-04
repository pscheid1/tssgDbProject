/**
 * A module for the 'Meetings' collection
 * @module meeting.controller.js
 */
const Meeting = require("../models/meeting.model");

/** 
* Function updateDate creates a Date object with a given date & time
* @param {string} newDate - Meeting object to add
* @param {string} newTime - Meeting object to add
* @return {object} newDateTime - Date object with a given date & time.
*/
function updateDate(newDate, newTime) {
  // string to date
  let newDateTime = new Date(newDate);
  // string to date
  let nt = new Date(newTime);
  // console.log('meeting.controller.updateDate - nt: ' + nt);
  newDateTime.setHours(nt.getHours());
  // console.log('meeting.controller.updateDate - nt.hours: ' + nt.getHours());
  newDateTime.setMinutes(nt.getMinutes());
  newDateTime.setSeconds(0);
  newDateTime.setMilliseconds(0);
  return newDateTime;
}

module.exports = {

  /** 
  * Function create adds a new meeting to the meetings collection
  * @param {object} req.body - Meeting object to add
  * @return {object} success - status 200 and a json Meeting object
  * @return {object} failure - status 404 and json Meeting message
  */
  create: async function (req, res) {
    // update date component of startTime (timepicker will create it with today's date)
    // console.log('meeting.controller.create - startTime: ' + req.body.startTime);
    req.body.startTime = updateDate(req.body.meetingDate, req.body.startTime);
    // update date component of endTime (timepicker will create it with today's date)
    // console.log('meeting.controller.create - endTime: ' + req.body.endTime);
    req.body.endTime = updateDate(req.body.meetingDate, req.body.endTime);
    await Meeting.create(req.body)
      .then(newMeeting => res.json(newMeeting))
      .catch(err => {
        res.status(409).json({ message: err.message });
      });
  },

  /** 
  * Function update modifies an existing meeting.
  * It calls findByIdAndUpdate (one operation) and receives an updated team.
  * @param {object} req.body - All prameters are in a Meeting object in the request body
  * @return {object} success - status 200 and the updated Meeting object
  * @return {object} failure - status 404 and json error message
  */
  update: async function (req, res) {
    // if meetingDate was changed, we need to update startTime and endTime
    // if startTime and/or endTime were changed, the timepicker will create the new
    // time with today's date
    // ensure startTime date component agrees with meetingDate
    req.body.startTime = updateDate(req.body.meetingDate, req.body.startTime);
    // ensure endTime date component agrees with meetingDate
    req.body.endTime = updateDate(req.body.meetingDate, req.body.endTime);
    // req.body._id = '5d449dac8b7d7853fcc086ff';  // force a bad _id
    await Meeting.findByIdAndUpdate(req.body._id, req.body, { new: true })
      .then(meeting => {
        // a bad or nonexistent key is not considered an error?
        if (meeting === null) {
          throw new Error('Meeting "' + req.body._id + '" not found.');
        } else {
          res.json(meeting);
        }
      })
      .catch(err => {
        res.status(404).json({ message: err.message });
      });
  },

  /** 
  * Function findAll returns a list of all meeting entries
  * @return {object} success - status 200 and a list of meetings.
  * @return {object} failure - status 404 and json error message
  */
  findAll: async function (req, res) {
    await Meeting.find({}, function (err, meeting) { })
      .sort({ team: 1, meetingDate: 1, startTime: 1 })
      .then(meetings => {
        // throw new Error('Server blew up!.'); })  // To force an error, replace following line wiht this line
        res.json(meetings)
      })
      .catch(err => {
        // console.log(`404 - err.name: ${err.name}, err.message: ${err.message}`);
        res.status(404).json({ message: err.message });
      });
  },

  /** 
  * Function findOne returns a specific meeting. (currently by _id)
  * @param {object} req.params._id - contains the meeting id (string) to access
  * @return {object} success - status 200 and meeting
  * @return {object} failure - status 404 and json error message
  */
  findOne: async function (req, res) {
    // req.params._id = '5d449dac8b7d7853fcc086ff';  // force a bad _id
    await Meeting.findById(req.params._id, function (err, meeting) {
    })
      .then(meeting => {
        // a bad or nonexistent key is not considered an error?
        if (meeting === null) {
          throw new Error('Meeting ' + req.params._id + ' not found.');
        } else {
          res.json(meeting);
        }
      })
      .catch(err => {
        // console.log(`404 - err.name: ${err.name}, err.message: ${err.message}`);
        res.status(404).json({ name: 'Error', message: err.message });
      });
  },

  /** 
  * Function delete removes a specific meeting by _id
  * @param {object} req.params._id - contains the id {string} of meeting to delete
  * @return {object} success - status 200 and meeting deleted message
  * @return {object} failure - status 404 and json error message
  */
  delete: async function (req, res) {
    // req.params._id = '5d449dac8b7d7853fcc086ff';  // force a bad _id
    await Meeting.findByIdAndDelete(req.params._id)
      .then(meeting => {
        // if removed, then removed meeting is returned
        res.status(200).json('' + meeting._id + ': deleted.');
      })
      .catch(err => {
        // console.log(`404 - err.name: ${err.name}, err.message: ${err.message}`);
        res.status(404).json({ message: err.message });
      });
  },

  /** 
  * Function schedule returns a sorted list of meetings
  @summary: schedule filters meetings by team and endTime with a limit of 3.
    we compare aginst endTime becuase it has the meeting date and endTime.
    meetingDate has no time component.  Using endTime is a less complicated
    way to compare witn new Date() and get an entry for the current day
    as long as the endTime is greater than the current time.
  * @param {object} req.params._id - contains the meeting id (string) to access
  * @return {object} success - status 200 and meeting
  * @return {object} failure - status 404 and json error message
  */
  schedule: async function (req, res) {
    await Meeting.find({ team: req.params.team, endTime: { $gt: new Date() } })
      .sort({ startTime: 1 })
      .limit(3)
      // don't need to populate venue and team. we are only interested in the 
      // link itself, not the contents they point to.
      // .populate(['venue', 'team'])
      .then(meetings => res.json(meetings))
      .catch(err => res.status(404).json(err.message));
  },

  /** 
 * Function webSchedule returns a sorted list of meetings for a specific team
 @summary: webSchedule is unrestricted (public access)
   webSchedule is identical to schedule (above) except it populates the team
   and venue fields with data from their respective collection. If a team is 
   not passed in, it will default to BACKEND_DEFAULT_TEAM and then to 'WedGenMtg'.
 * @param {object} req.params._id - contains the meeting id (string) to access
 * @return {object} success - status 200 and meeting
 * @return {object} failure - status 404 and json error message
 */
  webSchedule: async function (req, res) {
    if (req.params.team === 'default' || typeof req.params.team === 'undefined') {
      req.params.team = process.env.BACKEND_DEFAULT_TEAM || 'WedGenMtg';
    }
      // console.log('meeting.controller.webSchedule: team = ' + req.params.team);
      await Meeting.find({ team: req.params.team, endTime: { $gt: new Date() } })
        .sort({ startTime: 1 })
        .limit(3)
        .populate(['team', 'venue'])
        .then(meetings => {
          //  display meetings for debugging
          // console.log(JSON.stringify({meetings}));
          res.json(meetings);
        })
        .catch(err => {
          // display error message for debugging
          // console.log(`meeting.controller.webSchedule Error: ${err.message}`);
          res.status(404).json(err.message);
        });
    },

  /** 
  * Function test is a simple test,  returning data without validation or authentication
  * @return {string} Message returning a few system variables
  */
  test: function (req, res) {
    res.send(
      `collection: meetings - globalRoot: ${global.Root} - folders: ${global.Folders} - packageName: ${global.PackageName} - __dirname: ${__dirname}`
    );
  }
}
