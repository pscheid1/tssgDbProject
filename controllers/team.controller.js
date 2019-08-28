const Team = require("../models/team.model");

module.exports = {

    create: async function (req, res, next) {
        // console.log('team.contorller.create: ' + req.body._id);
        await Team.create(req.body)
            .then(newTeam => res.json(newTeam))
            .catch(err => {
                next(err);
            });
    },

    update: async function (req, res, next) {
        // console.log('team.controller.update._id: ' + req.body._id);
        await Team.findByIdAndUpdate(req.body._id, req.body, { new: true }, function (err, team) {
            if (err || !team) {
                if (!err) {
                    err = "Error: Unknown error (possible bad _id = " + req.body._id + ")";
                }
                // console.log('team.controller.update1 : err = ' + err);
                next(err);
            } else {
                // console.log('team.controller.update2 : success');
                res.json(team);
            }
        });
    },

    // return a list of all team entries
    findAll: function (req, res) {
        Team.find({}, {}, function (err, team) {
        })
            .then(teams => res.json(teams))
            .catch(err => res.status(422).json(err.message));
    },

    // return a specific team entry (currently by _id)
    findOne: function (req, res) {
        Team.findById(req.params._id, function (err, team) {

        })
            .then(team => {
                res.json(team);
            })
            .catch(err => res.status(422).json("Error: "));
    },

    // delete a specific entry by _id
    delete: function (req, res) {
        req.params._id = 'abc123ABC456';
        console.log('team *********************: ' + req.params._id);
        Team.findByIdAndDelete(req.params._id)
            .then(team => {
                console.log('team.controller.delete: ' + team._id + ' deleted.');
                res.json(team + ": deleted");
            })
            .catch(err => {
                // console.log(err instanceof TypeError);
                // console.log(err.message);
                // console.log(err.name);
                // console.log(err.fileName);
                // console.log(err.lineNumber);
                // console.log(err.columnNumber);
                // console.log(err.stack);
                // This is dog shit.  Doesn't matter what is in err
                // The returned message is meaningless.
                // I don't know where I found the .code suffix but 
                // it forces a message to be displayed.  Other wise, 
                // it just displays a short expression for status code.
                // Actually .code is meaningless.  You can put anything
                // there.  .bullshit works just as well.
                res.status(404).json(err.code);
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
