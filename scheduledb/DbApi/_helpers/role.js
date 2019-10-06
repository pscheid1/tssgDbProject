/*
The role object defines all the roles in the application.
It can be used like an enum to avoid passing roles around
as strings, so instead of 'Admin' you can use Role.Admin.
*/

/*
Role definitions:
  Admin:  All CRUD rights (create, read, update, delete).
  User:   Read only. Limited to their own accounts.
  Contact; No CRUD rights.  Contact data only.
*/

module.exports = {
    Admin: 'Admin',
    User: 'User',
    Contact: 'Contact'
}
