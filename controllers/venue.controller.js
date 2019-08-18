const Venue = require("../models/venue.model");

function toarray(s) {
  let venueIds = new Array();
  var tempStr;
  var i1;
  var i2;

  for (i = 0; i < s.length; i++) {
    tempStr = s[i].toString();
    i1 = tempStr.indexOf("'");
    i2 = tempStr.lastIndexOf("'");
    if (i1 === -1 || i2 === -1) continue;
    venueIds.push(tempStr.substring(++i1, i2));
  }

  return venueIds;
};

module.exports = {

  create: async function(req, res, next) {
    await Venue.create(req.body)
    .then(newVenue => res.json(newVenue))
    .catch(err => {
      next(err);
    });
  },

  update: async function (req, res, next) {
    // console.log('venue.controller.update._id: ' + req.body._id);
    await Venue.findByIdAndUpdate(req.body._id, req.body, { new: true }, function (err, venue) {
      if (err || !venue) {
        if (!err) {
          err = "Error: Unknown error (possible bad _id = " + req.body._id + ")";
        }
        // console.log('venue.controller.update1 : err = ' + err);
        next(err);
      } else {
        // console.log('venue.controller.update2 : success');
        res.json(venue);
      }
    });
  },

  // return a list of all venue entries
  findAll: function (req, res) {
    Venue.find({}, {}, function (err, venue) {
    })
      .then(venues => res.json(venues))
      .catch(err => res.status(422).json(err.message));
  },

  // because _id is unique we don't have to worry about duplicates
  // returns a list of venue id's only
  listVenues: function (req, res, next) {
    Venue.find({}, { _id: 1 }, function (err, venue) { })
      .sort({ _id: 1 })
      // toarray() returns a sorted list of venue _id's
      .then(venues => res.json(toarray(venues)))
      .catch(err => res.status(422).json(err.message));
  },

  // return a specific venue entry (currently by _id)
  findOne: function (req, res) {
    Venue.findById(req.params._id, function (err, venue) {

    })
      .then(venue => {
        res.json(venue);
      })
      .catch(err => res.status(422).json("Error: "));
  },

  // delete a specific entry by _id
  delete: function (req, res) {
    Venue.findByIdAndDelete(req.params._id)
      .then(venue => res.json(venue + ": deleted"))
      .catch(err => res.status(422).json(err));
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
