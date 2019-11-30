const Meeting = require("../models/meeting.model");

function updateDate(newDate, newTime) {
  if (md) console.log('meeting.controller.updateDate ^^^^^^^^^^^^^^^^^^^^^^^^^^');
  if (md) console.log('meeting.controller.updateDate - newDate: ' + newDate);
  if (md) console.log('meeting.controller.updateDate - newTime: ' + newTime);
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
  if (md) console.log('leaving updateDate newDateTime: ' + newDateTime);
  return newDateTime;
}

module.exports = {

  create: async function (req, res) {
    if (md) console.log('meeting.controller.create **************************');
    if (md) console.log(req.body.meetingDate);
    // update date component of startTime (timepicker will create it with today's date)
    // console.log('meeting.controller.create - startTime: ' + req.body.startTime);
    req.body.startTime = updateDate(req.body.meetingDate, req.body.startTime);
    if (md) console.log('meeting.controller.create - startTime: ' + req.body.startTime);
    // update date component of endTime (timepicker will create it with today's date)
    // console.log('meeting.controller.create - endTime: ' + req.body.endTime);
    req.body.endTime = updateDate(req.body.meetingDate, req.body.endTime);
    if (md) console.log('meeting.controller.create - endTime: ' + req.body.endTime);
    if (md) console.log('meeting.controller.create: ' + JSON.stringify(req.body));
    await Meeting.create(req.body)
      .then(newMeeting => res.json(newMeeting))
      .catch(err => {
        if (md) console.log('meeting.controller.create error:' + err.message);
        res.status(409).json({ name: 'Error', message: err.message });
      });
  },

  update: async function (req, res) {
    if (md) console.log('meeting.controller.update ##########################');
    if (md) console.log(req.body.meetingDate);
    // if meetingDate was changed, we need to update startTime and endTime
    // if startTime and/or endTime were changed, the timepicker will create the new
    // time with today's date
    // ensure startTime date component agrees with meetingDate
    req.body.startTime = updateDate(req.body.meetingDate, req.body.startTime);
    if (md) console.log('meeting.controller.update startTime: ' + req.body.startTime);
    // ensure endTime date component agrees with meetingDate
    req.body.endTime = updateDate(req.body.meetingDate, req.body.endTime);
    if (md) console.log('meeting.controller.update endTime: ' + req.body.endTime);
    if (md) console.log('meeting.controller.update: ' + JSON.stringify(req.body));
    await Meeting.findByIdAndUpdate(req.body._id, req.body, { new: true })
      .then(meeting => {
        // a bad or nonexistent key is not considered an error?
        if (meeting === null) {
          throw new Error('Meeting ' + req.body._id + ' not found.');
        } else {
          res.json(meeting);
        }
      })
      .catch(err => {
        if (md) console.log('meeting.controller.update error:' + err.message);
        res.status(404).json({ name: 'Error', message: err.message });
      });
  },

  // return a list of all meeting entries
  findAll: async function (req, res) {
    await Meeting.find({}, function (err, meeting) { })
      .sort({ team: 1, meetingDate: 1, startTime: 1 })
      .then(meetings => res.json(meetings))
      .catch(err => {
        res.status(404).json({ name: 'Error', message: err.message });
      });
  },

  // return a specific meeting entry (currently by _id)
  findOne: async function (req, res) {
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
        res.status(404).json({ name: 'Error', message: err.message });
      });
  },

  // delete a specific entry by _id
  delete: async function (req, res) {
    await Meeting.findByIdAndDelete(req.params._id)
      .then(meeting => {
        // if removed, then removed meeting is returned
        res.status(200).json('' + meeting._id + ': deleted.');
      })
      .catch(err => {
        res.status(404).json({ name: 'Error', message: "Meeting id: '" + req.params._id + "' Not Found" + ' - ' + err.message });
      });
  },

  // schedule filters meetings by team and endTime with a limit of 3.
  // we compare aginst endTime becuase it has the meeting date and endTime.
  // meetingDate has no time component.  Using endTime is a less complicated
  // way to compare witn new Date() and get an entry for the current day
  // as long as the endTime is greater than the current time.
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

  // webSchedule is unrestricted (public access)
  // webSchedule is identical to schedule (above) except
  // it populates the team and venue fields with data from
  // the their respective collection
  webSchedule: async function (req, res) {
    if (req.params.team === 'default') {
      req.params.team = process.env.tssgApiDefaultTeam || 'WedGenMtg';
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
        // console.log(err.message);
        res.status(404).json(err.message);
      });
  },


  //Simple version, without validation or sanitation
  test: function (req, res) {
    res.send(
      "globalRoot: " +
      global.Root +
      " - folders: " +
      global.Folders +
      " - packageName: " +
      global.PackageName +
      " - __dirname: " +
      __dirname +
      " - tssgApiMtgDebug: " +
      global.md
    );
  }
};

