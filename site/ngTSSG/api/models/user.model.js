const mongoose = require('mongoose');
const Role = require('../_helpers/role');
const Schema = mongoose.Schema;

let roles = [Role.Admin, Role.User, Role.Contact];

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  hash: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  role: { type: String, enum: roles, required: true },
  email: { type: String, required: false },
  mobile: { type: String, requied: false },
  token: { required: false },
  inActive: { type: Boolean, default: false,  required: false },
  createdDate: { type: Date, default: Date.now }
}, { autoIndex: true });

// if autoIndex is true, mongoose will call sequentially each defined index
// to create the indexes manually invoke createIndexes which will call this function.  (see createIndex call in user.controller)
UserSchema.index({ username: 1 }, { unique: true, name: "dupUser" });

UserSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', UserSchema);
