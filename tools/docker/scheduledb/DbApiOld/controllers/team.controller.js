const Team = require("../models/team.model");

function toarray(s) {
    let teamIds = new Array();
    var tempStr;
    var i1;
    var i2;

    for (i = 0; i < s.length; i++) {
        tempStr = s[i].toString();
        i1 = tempStr.indexOf("'");
        i2 = tempStr.lastIndexOf("'");
        if (i1 === -1 || i2 === -1) continue;
        teamIds.push(tempStr.substring(++i1, i2));
    }

    return teamIds;
};

module.exports = {

    create: async function (req, res, next) {
        await Team.create(req.body)
            .then(newTeam => res.json(newTeam))
            .catch(err => {
                res.status(409).json({ name: 'Error', message: err.message });
            });
    },

    update: async function (req, res, next) {
        await Team.findByIdAndUpdate(req.body._id, req.body, { new: true })
            .then(team => {
                // a bad or nonexistent key is not considered an error?
                if (team === null) {
                    throw new Error('Team ' + req.body._id + ' not found.');
                } else {
                    res.json(team);
                }
            })
            .catch(err => {
                res.status(404).json({ name: 'Error', message: err.message });
            });
    },

    // return a list of all team entries
    findAll: async function (req, res) {
        await Team.find({}, {}, function (err, team) {
        })
            .then(teams => res.json(teams))
            .catch(err => {
                res.status(404).json({ name: 'Error', message: err.message });
            })
    },

    // return a specific team entry (currently by _id)
    findOne: async function (req, res) {
        await Team.findById(req.params._id, function (err, team) {
        })
            .then(team => {
                // a bad or nonexistent key is not considered an error?
                if (team === null) {
                    throw new Error('Team ' + req.params._id + ' not found.');
                } else {
                    res.json(team);
                }
            })
            .catch(err => {
                res.status(404).json({ name: 'Error', message: err.message });
            });
    },

    // because _id is unique we don't have to worry about duplicates
    // returns a list of team id's only
    listTeams: async function (req, res, next) {
        await Team.find({}, { _id: 1 }, function (err, team) { })
            .sort({ _id: 1 })
            // toarray() returns a sorted list of team _id's
            .then(teams => res.json(toarray(teams)))
            .catch(err => res.status(404).json(err.message));
    },

    // delete a specific entry by _id
    delete: async function (req, res) {
        await Team.findByIdAndDelete(req.params._id)
            .then(team => {
                // if removed, then removed team is returned
                res.status(200).json('' + team._id + ': deleted.');
            })
            .catch(err => {
                res.status(404).json({ name: 'Error', message: "Meeting id: '" + req.params._id + "' Not Found" + ' - ' + err.message });
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
            __dirname
        );
    }
};
