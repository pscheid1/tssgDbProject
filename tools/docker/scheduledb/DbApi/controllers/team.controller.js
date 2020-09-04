/**
 * A module for the 'team' collection
 * @module team.controller.js
 */
const Team = require("../models/team.model");

/** 
* Function toarray returns an array of team ids from an array of Team objects
* @param {string} teams - list of teams
* @return {string[]} teamIds - array of team ids.
*/
function toarray(teams) {
    let teamIds = [];
    var tempStr;
    var i1;
    var i2;

    for (i = 0; i < teams.length; i++) {
        tempStr = teams[i].toString();
        i1 = tempStr.indexOf("'");
        i2 = tempStr.lastIndexOf("'");
        if (i1 === -1 || i2 === -1) continue;
        teamIds.push(tempStr.substring(++i1, i2));
    }
    // array of strings (teamIds)
    return teamIds;
}

module.exports = {

    /** 
    * Function create adds a new team to the team collection
    * @param {object} req.body - Team object to add
    * @return {object} success - status 200 and a json Team object
    * @return {object} failure - status 404 and json Meeting message
    */
    create: async function (req, res, next) {
        await Team.create(req.body)
            .then(newTeam => res.json(newTeam))
            .catch(err => {
                res.status(409).json({ name: 'Error', message: err.message });
            });
    },

    /** 
    * Function update modifies an existing team.
    * It calls findByIdAndUpdate (one operation) and receives an updated team.
    * @param {object} req.body - All prameters are in a Team object in the request body
    * @return {object} success - status 200 and the updated Team object
    * @return {object} failure - status 404 and json error message
    */
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

    /** 
    * Function findAll returns a list of all team entries
    * @return {object} success - status 200 and a list of teams.
    * @return {object} failure - status 404 and json error message
    */
    findAll: async function (req, res) {
        await Team.find({}, {}, function (err, team) {
        })
            .then(teams => res.json(teams))
            .catch(err => {
                res.status(404).json({ name: 'Error', message: err.message });
            })
    },

    /** 
    * Function findOne returns a specific team. (currently by _id)
    * @param {object} req.params._id - contains the team id (string) to access
    * @return {object} success - status 200 and team
    * @return {object} failure - status 404 and json error message
    */
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

    /** 
    * Function listUsers produces a sorted list of specific users 
    * @summary because _id is unique we don't have to worry about duplicates
    *          returns a list of team id's only.
    * @return {object} success - status 200 and a list of teams
    * @return {object} failure - status 404 and json error message
    */
    listTeams: async function (req, res, next) {
        await Team.find({}, { _id: 1 }, function (err, team) { })
            .sort({ _id: 1 })
            // toarray() returns a sorted list of team _id's
            .then(teams => res.json(toarray(teams)))
            .catch(err => res.status(404).json(err.message));
    },

    /** 
    * Function delete removes a specific team by _id
    * @param {object} req.params._id - contains the id {string} of team to delete
    * @return {object} success - status 200 and team deleted message
    * @return {object} failure - status 404 and json error message
    */
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

    /** 
    * Function test is a simple test,  returning data without validation or authentication
    * @return {string} Message returning a few system variables
    */
    test: function (req, res) {
        res.send(
            `collection: teams - globalRoot: ${global.Root} - folders: ${global.Folders} - packageName: ${global.PackageName} - __dirname: ${__dirname}`
        );
    }
};
