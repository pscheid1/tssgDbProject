const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TeamSchema = new Schema({

    _id: { type: String, required: true },              // unique id for this team
    description: { type: String, required: true },
    teamLead: {                                         // username of team leader
        type: Schema.Types.String,
        ref: 'user',                                    // links team to a user
        required: false
    },
    members: [{
        type: Schema.Types.String,
        ref: 'user',                                    // array of usernames
        required: false
    }],
    zoomLink: { type: String, required: false },
    comments: {type: String, required: false}           // Free format text

}, { autoIndex: false });

// Export the model

module.exports = mongoose.model('Team', TeamSchema);
