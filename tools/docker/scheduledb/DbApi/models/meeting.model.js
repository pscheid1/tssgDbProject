const mongoose = require('mongoose');
const Team = require('../models/team.model');
const Venue = require('../models/venue.model');

const Schema = mongoose.Schema;    // see not below.

let MeetingSchema = new Schema({

    _id: { type: String, required: true, trim: true },      // unique id for his meeting
    team: {                                                 // _id of team
        type: Schema.Types.String,
        ref: Team,                                        // links meeting to a team 
        required: true,
        trim: true
    },
    venue: {                                                // _id of venue
        type: Schema.Types.String,
        ref: Venue,                                       // links meeting to a venue
        required: true,
        trim: true
    },
    meetingDate: { type: Date, required: true },            // Date of the meeting. Time component is always 0.
    startTime: { type: Date, required: true },              // Meeting start date and time
    endTime: { type: Date, required: true },                // Meeting end date and time                     
    comments: { type: String, required: false, trim: true } // Free format text

}, { autoIndex: false });



// if autoIndex is true, mongoose will call sequentially each defined index
// to create the indexes manually invoke createIndexes which will call this function.
// MeetingSchema.index({ team: 1, meetingDate: 1, startTime: 1, endTime: 1 }, { unique: true, name: "duplicateXXXMeeting" });
// or 
// declare the model and use mongoose calls below . . .

var Meeting = mongoose.model('Meeting', MeetingSchema);

// Hook the 'index' event on the model to see if any errors are occurring 
// when asynchronously creating the index:
Meeting.on('index', function (err) {
    if (err) {
        console.error('Meeting index error: %s', err);
    } else {
        console.info('Meeting indexing complete');
    }
});

// Drop all meeting indexes
Meeting.collection.dropIndexes('*', function (err, result) {
    if (err) {
        console.log('Meeting.model: Error in dropping index!', err);
    }
});

// declare new meeting indexes here . . .
Meeting.collection.createIndex({ team: 1, meetingDate: 1, startTime: 1, endTime: 1 }, { unique: true, name: "duplicate_meeting" });



// Export the model

module.exports = Meeting;
