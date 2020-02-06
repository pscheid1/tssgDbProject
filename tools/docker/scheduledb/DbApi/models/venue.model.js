const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let VenueSchema = new Schema({
  _id: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  // person at venue to contact regarding scheduling issues
  contact: {
    type: Schema.Types.String,
    ref: 'user',                // link to contact (database entry with role contact)
    required: false,
    trim: true
  },
  // website url
  website: {
    type: String,
    trim: true,
    required: false
  },
  // venue event calendar url
  calendar: {
    type: String,
    trim: true,
    required: false
  },
  address: {
    type: String,
    trim: true,
    required: false
  },
  town: {
    type: String,
    trim: true,
    required: false
  },
  // location is a link to google or other maps  i.e. https://goo.gl/maps/6wmSZBydHVU2
  location: {
    type: String,
    trim: true,
    required: false
  },
  // path and file name of html schedule icon image
  iconimage: {
    type: String,
    trim: true,
    required: false
  },
    // path and file name of html schedule photo image
    photoimage: {
      type: String,
      trim: true,
      required: false
    }
}, { autoIndex: false });

// Export the model

module.exports = mongoose.model('venue', VenueSchema);
