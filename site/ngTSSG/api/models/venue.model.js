const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let VenueSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  // website url
  website: {
    type: String,
    required: false
  },
  // venue event calendar url
  calendar: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  town: {
    type: String,
    required: false
  },
  // location is a link to google or other maps  i.e. https://goo.gl/maps/6wmSZBydHVU2
  location: {
    type: String,
    required: false
  },
  // path and file name of html schedule image
  iconimage: {
    type: String,
    required: false
  }


}, { autoIndex: false });

// Export the model

module.exports = mongoose.model('venue', VenueSchema);
