const mongoose = require('mongoose');
const Schema = mongoose.Schema;    // see not below.

let MeetingSchema = new Schema({

    _id: { type: String, required: true, trim: true },      // unique id for his meeting
    venue: {                                                // _id of venue item
        type: Schema.Types.String,
        ref: 'venue', 
        required: true,
        trim: true                                          // links meeting to a venue
    },
    meetingDate: { type: Date, required: true },            // Date of the meeting. Time component is always 0.
    startTime: { type: Date, required: true },              // Meeting start date and time
    endTime: { type: Date, required: true },                // Meeting end date and time                     
    comments: {type: String, required: true, trim: true}    // Free format text

}, { autoIndex: true });

// if autoIndex is true, mongoose will call sequentially each defined index
// to create the indexes manually invoke createIndexes which will call this function.  (see createIndex call in meeting.controller)
MeetingSchema.index({ venue: 1, meetingDate: 1, startTime: 1, endTime: 1 }, { unique: true, name: "dupMeeting" });

MeetingSchema.on('index', function (error) {
});

// Export the model

module.exports = mongoose.model('Meeting', MeetingSchema);
