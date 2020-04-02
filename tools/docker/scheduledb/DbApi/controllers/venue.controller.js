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

  create: async function (req, res, next) {
    await Venue.create(req.body)
      .then(newVenue => res.json(newVenue))
      .catch(err => {
        res.status(409).json({ name: 'Error', message: err.message });
      });
  },

  update: async function (req, res, next) {
    await Venue.findByIdAndUpdate(req.body._id, req.body, { new: true })
      .then(venue => {
        // a bad or nonexistent key is not considered an error?
        if (venue === null) {
          throw new Error('Venue ' + req.body._id + ' not found.');
        } else {
          res.json(venue);
        }
      })
      .catch(err => {
        res.status(404).json({ name: 'Error', message: err.message });
      });
  },

  // return a list of all venue entries
  findAll: async function (req, res) {
    await Venue.find({}, {}, function (err, venue) {
    })
      .then(venues => res.json(venues))
      .catch(err => res.status(404).json(err.message));
  },

  // returns a list of venue id's only
  listVenues: async function (req, res, next) {
    await Venue.find({}, { _id: 1 }, function (err, venue) { })
      .sort({ _id: 1 })
      // toarray() returns a sorted list of venue _id's
      .then(venues => res.json(toarray(venues)))
      .catch(err => res.status(404).json(err.message));
  },

  // return a specific venue entry (currently by _id)
  findOne: function (req, res) {
    Venue.findById(req.params._id, function (err, venue) {
    })
    .then(venue => {
      // a bad or nonexistent key is not considered an error?
      if (venue === null) {
        throw new Error('Venue ' + req.body._id + ' not found.');
      } else {
        res.json(venue);
      }
    })
    .catch(err => {
      res.status(404).json({ name: 'Error', message: "Venue id: '" + req.params._id + "' Not Found" + ' - ' + err.message });
    });
},

  // delete a specific entry by _id
  delete: async function (req, res) {
    await Venue.findByIdAndDelete(req.params._id)
      .then(venue => {
        // if removed, then removed venue is returned
        res.status(200).json('' + venue._id + ': deleted.');
      })
      .catch(err => {
        res.status(404).json({ name: 'Error', message: "Venue id: '" + req.params._id + "' Not Found" + ' - ' + err.message });
      });
  },

  //Simple version, without validation or sanitation
  test: function (req, res) {
    res.send(
      `collection: venues - globalRoot: ${global.Root} - folders: ${global.Folders} - packageName: ${global.PackageName} - __dirname: ${__dirname}`
    );
  }
};
