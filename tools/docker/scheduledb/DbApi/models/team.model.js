const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TeamSchema = new Schema({

    _id: { type: String, required: true, trim: true},           // unique id for this team
    description: { type: String, required: true, trim: true },  
    teamLead: {                                                 // username of team leader
        type: Schema.Types.String,
        ref: 'user',                                            // link to team leader (user)
        required: false,
        trim: true
    },
    members: [{
        type: Schema.Types.String,
        ref: 'user',                                            // array of team members (users)
        required: false,
        trim: true
    }],
    zoomLink: { type: String, required: false, trim: true },    // zoom or other meeting uri
    comments: {type: String, required: false, trim: true }      // Free format text

}, { autoIndex: false });

// Export the model

module.exports = mongoose.model('Team', TeamSchema);
