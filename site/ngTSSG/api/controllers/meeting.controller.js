const Meeting = require("../models/meeting.model");

function updateDate(newDate, newTime) {
  // console.log('meeting.controller.updateDate - date: ' + newDate);
  // console.log('meeting.controller.updateDate - time: ' + newTime);
  let newDateTime = new Date(newDate);
  let nt = new Date(newTime);
  newDateTime.setHours(nt.getHours());
  newDateTime.setMinutes(nt.getMinutes());
  return newDateTime;
}

module.exports = {

  create: async function (req, res, next) {
    // update date component of startTime (timepicker will create it with today's date)
    req.body.startTime = updateDate(req.body.meetingDate, req.body.startTime);
    // update date component of endTime http://chelmsfordlibrary.evanced.info/signup/Calendar
    req.body.endTime = updateDate(req.body.meetingDate, req.body.endTime);
    await Meeting.create(req.body)
      .then(newMeeting => res.json(newMeeting))
      .catch(err => {
        next(err);
      });
  },

  update: async function (req, res, next) {
    // if meetingDate was changed, we need to update startTime and endTime
    // if startTime and/or endTime were changed, the timepicker will create the new
    // time with today's date
    // ensure startTime date component agrees with meetingDate
    req.body.startTime = updateDate(req.body.meetingDate, req.body.startTime);
    // ensure endTime date component agrees with meetingDate
    req.body.endTime = updateDate(req.body.meetingDate, req.body.endTime);

    await Meeting.findByIdAndUpdate(req.body._id, req.body, { new: true })
      .then(meeting => {
        res.json(meeting);
      })
      .catch(err => {
        console.error('meeting.controller.update: err = ' + err);
        next(err);
      });
  },

  // return a list of all meeting entries
  findAll: function (req, res) {
    Meeting.find({}, function (err, meeting) { })
      .sort({ meetingDate: 1, startTime: 1 })
      .then(meetings => res.json(meetings))
      .catch(err => res.status(422).json(err.message));
  },

  // return a specific meeting entry (currently by _id)
  findOne: function (req, res) {
    Meeting.findById(req.params._id, function (err, meeting) {
    })
      .then(meeting => res.json(meeting))
      .catch(err => res.status(422).json("Error: " + err));
  },

  // delete a specific entry by _id
  delete: function (req, res, next) {
    Meeting.findByIdAndDelete(req.params._id)
      .then(meeting => res.json(meeting + ": deleted"))
      .catch(err => res.status(422).json(err));
  },

  // we compare aginst endTime becuase it has the meeting date and endTime.
  // meetingDate has no time component.  Using endTime is a less complicated
  // way to compare witn new Date() and get an entry for the current day
  // as long as the endTime is greater than the current time.
  schedule: function (req, res, next) {
    Meeting.find({ endTime: { $gt: new Date() } })
      .sort({ startTime: 1 })
      .limit(3)
      .then(meetings => res.json(meetings))
      .catch(err => res.status(422).json(err.message));
  },

  // webSchedule is identical to schedule (above) except
  // it populates the venue field with data from
  // the venue collection
  webSchedule: function (req, res, next) {
    Meeting.find({ endTime: { $gt: new Date() } })
      .sort({ startTime: 1 })
      .limit(3)
      .populate('venue')
      .then(meetings => res.json(meetings))
      .catch(err => res.status(422).json(err.message));
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
      __dirname
    );
  }
};

