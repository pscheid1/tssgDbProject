<a name="user.controller.module_js"></a>

## js
A module for the 'Users' collection


* [js](#user.controller.module_js)
    * _static_
        * [.register()](#user.controller.module_js.register) ⇒ <code>object</code> \| <code>object</code>
        * [.authenticate(req)](#user.controller.module_js.authenticate) ⇒ <code>object</code> \| <code>object</code>
        * [.logout()](#user.controller.module_js.logout) ⇒ <code>object</code>
        * [.refresh()](#user.controller.module_js.refresh) ⇒ <code>object</code> \| <code>object</code>
        * [.update()](#user.controller.module_js.update) ⇒ <code>object</code> \| <code>object</code>
        * [.findAll()](#user.controller.module_js.findAll) ⇒ <code>object</code> \| <code>object</code>
        * [.listUsers()](#user.controller.module_js.listUsers) ⇒ <code>object</code> \| <code>object</code>
        * [.listContacts()](#user.controller.module_js.listContacts) ⇒ <code>object</code> \| <code>object</code>
        * [.getCurrent()](#user.controller.module_js.getCurrent) ⇒ <code>object</code> \| <code>object</code>
        * [.findOne()](#user.controller.module_js.findOne) ⇒ <code>object</code> \| <code>object</code>
        * [.delete()](#user.controller.module_js.delete) ⇒ <code>object</code> \| <code>object</code>
        * [.test()](#user.controller.module_js.test) ⇒ <code>string</code>
    * _inner_
        * [~refreshTokens](#user.controller.module_js..refreshTokens)
        * [~userAuth(username, password)](#user.controller.module_js..userAuth) ⇒
        * [~refreshToken(tokenId)](#user.controller.module_js..refreshToken) ⇒
        * [~manage_refreshTokens(op, id, token)](#user.controller.module_js..manage_refreshTokens) ⇒

<a name="user.controller.module_js.register"></a>

### js.register() ⇒ <code>object</code> \| <code>object</code>
Function register adds a new user to the users collection

**Kind**: static method of [<code>js</code>](#user.controller.module_js)  
**Returns**: <code>object</code> - success - status 200 and a json User object<code>object</code> - failure - status 404 and json error message  

| Param | Type | Description |
| --- | --- | --- |
| req.body | <code>object</code> | User object to add |

<a name="user.controller.module_js.authenticate"></a>

### js.authenticate(req) ⇒ <code>object</code> \| <code>object</code>
Function authenticate verifies and logs on User

**Kind**: static method of [<code>js</code>](#user.controller.module_js)  
**Summary**: Calls userAuth(req.body).  userAuth verifies username/password and returns User object & access jwt.  
**Returns**: <code>object</code> - success - status 200 access jwt and User object without hash. BackendVersion and FrontendVersion are added in for frontend.home page display.<code>object</code> - failure - status 404 and json error message  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>object</code> | User object to add |

<a name="user.controller.module_js.logout"></a>

### js.logout() ⇒ <code>object</code>
Function logout removes the  refresh jwt from the refreshTokens array

**Kind**: static method of [<code>js</code>](#user.controller.module_js)  
**Returns**: <code>object</code> - success - status(200) messagefailure - there is no failure returned.  Refresh jwt was either removed or it did not exist.  

| Param | Type | Description |
| --- | --- | --- |
| req.params._id | <code>string</code> | contains the refresh jwt id |

<a name="user.controller.module_js.refresh"></a>

### js.refresh() ⇒ <code>object</code> \| <code>object</code>
Function refresh requests a refreshed (new) access jwt.

**Kind**: static method of [<code>js</code>](#user.controller.module_js)  
**Returns**: <code>object</code> - success - status 200 access jwt and User object without hash. BackendVersion and FrontendVersion are added in for frontend.home page display.<code>object</code> - failure - status 404 and json error message  

| Param | Type | Description |
| --- | --- | --- |
| req.params._id | <code>string</code> | contains the refresh jwt id |

<a name="user.controller.module_js.update"></a>

### js.update() ⇒ <code>object</code> \| <code>object</code>
Function update modifies an existing user.
It calls findByIdAndUpdate (one operation) and receives an updated user.

**Kind**: static method of [<code>js</code>](#user.controller.module_js)  
**Returns**: <code>object</code> - success - status 200 and the updated User object<code>object</code> - failure - status 404 and json error message  

| Param | Type | Description |
| --- | --- | --- |
| req.body | <code>object</code> | All prameters are in a User object in the request body |

<a name="user.controller.module_js.findAll"></a>

### js.findAll() ⇒ <code>object</code> \| <code>object</code>
Function findAll returns all users

**Kind**: static method of [<code>js</code>](#user.controller.module_js)  
**Returns**: <code>object</code> - success - status 200 and a list of users with hash removed<code>object</code> - failure - status 404 and json error message  
<a name="user.controller.module_js.listUsers"></a>

### js.listUsers() ⇒ <code>object</code> \| <code>object</code>
Function listUsers produces a sorted list of specific users

**Kind**: static method of [<code>js</code>](#user.controller.module_js)  
**Summary**: because _id is unique we don't have to worry about duplicates
         returns a list of user id's, fistname and lastname only, sorted on lastname
         role = Contact is excluded  
**Returns**: <code>object</code> - success - status 200 and a list of users<code>object</code> - failure - status 404 and json error message  
<a name="user.controller.module_js.listContacts"></a>

### js.listContacts() ⇒ <code>object</code> \| <code>object</code>
Function listContacts produces a sorted list of contacts

**Kind**: static method of [<code>js</code>](#user.controller.module_js)  
**Summary**: because _id is unique we don't have to worry about duplicates
         returns a list of user id's, fistname and lastname only, sorted on lastname
         role = Contact only  
**Returns**: <code>object</code> - success - status 200 and a list of users<code>object</code> - failure - status 404 and json error message  
<a name="user.controller.module_js.getCurrent"></a>

### js.getCurrent() ⇒ <code>object</code> \| <code>object</code>
Function getCurrent returns the logged on user.

**Kind**: static method of [<code>js</code>](#user.controller.module_js)  
**Summary**: user role === Admin, user account is returned -hash
         user role === User or Contact, user account is returned -hash, - role  
**Returns**: <code>object</code> - success - status 200 and user (-hash && [-role])<code>object</code> - failure - status 404 and json error message  

| Param | Type | Description |
| --- | --- | --- |
| req.user.sub | <code>object</code> | contains the user id to access |

<a name="user.controller.module_js.findOne"></a>

### js.findOne() ⇒ <code>object</code> \| <code>object</code>
Function findOne returns a specific user.

**Kind**: static method of [<code>js</code>](#user.controller.module_js)  
**Returns**: <code>object</code> - success - status 200 and user<code>object</code> - failure - status 404 and json error message  

| Param | Type | Description |
| --- | --- | --- |
| req.params._id | <code>object</code> | contains the user id (string) to access |

<a name="user.controller.module_js.delete"></a>

### js.delete() ⇒ <code>object</code> \| <code>object</code>
Function delete removes a specific user

**Kind**: static method of [<code>js</code>](#user.controller.module_js)  
**Returns**: <code>object</code> - success - status 200 and user deleted message<code>object</code> - failure - status 404 and json error message  

| Param | Type | Description |
| --- | --- | --- |
| req.params._id | <code>object</code> | contains the id {string} of user to delete |

<a name="user.controller.module_js.test"></a>

### js.test() ⇒ <code>string</code>
Function test is a simple test,  returning data without validation or authentication

**Kind**: static method of [<code>js</code>](#user.controller.module_js)  
**Returns**: <code>string</code> - Message returning a few system variables  
<a name="user.controller.module_js..refreshTokens"></a>

### js~refreshTokens
**Kind**: inner property of [<code>js</code>](#user.controller.module_js)  
**Properties**

| Name | Description |
| --- | --- |
| refreshTokens | Array, local storage for refresh tokens |

<a name="user.controller.module_js..userAuth"></a>

### js~userAuth(username, password) ⇒
Function userAuth verifies username/password & creates the access jwt and refresh jwt tokens.

**Kind**: inner method of [<code>js</code>](#user.controller.module_js)  
**Summary**: Called from user.controller authenticate  
**Returns**: success - User userWithoutHash, access token. Refresh token stored in refreshTokn Array.failure - Throws new Error('error message')  

| Param | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | User.username |
| password | <code>string</code> | User.password |

<a name="user.controller.module_js..refreshToken"></a>

### js~refreshToken(tokenId) ⇒
Function refreshToken created a new access tokon.

**Kind**: inner method of [<code>js</code>](#user.controller.module_js)  
**Returns**: success - User userWithoutHash, access token.failure - Throws new Error('error message')  
**Summary:**: If we are here, a request has been made to the backend. (User.refresh() above.)
  The request requires a valid  access JWT, therefore the access JWT has not expipred.
  Since the JWT has not expired and if the refreshToken has not expired,  we will refresh (create a new) access token.  

| Param | Type | Description |
| --- | --- | --- |
| tokenId | <code>string</code> | Id of refresh token. |

<a name="user.controller.module_js..manage_refreshTokens"></a>

### js~manage\_refreshTokens(op, id, token) ⇒
Function manage_refreshTokens perfoms various operations on the refreshTokens array;

**Kind**: inner method of [<code>js</code>](#user.controller.module_js)  
**Returns**: success - No return for a, d and t.success - encoded jwt for v.failure - a, Throws new Error('error message').failure - d, No returnfailure - t, No returnfailure - v, Null  
**Summary:**: Add will add a refresh jwt to the refreshToken arrary.
  Delete will remove a refresh jwt from the refreshToken array.
  Trim will loop through the refreshToken array and delete any expired tokens.
  Verify will return a refresh jwt if it has not expired, otherwise it returns null  

| Param | Type | Description |
| --- | --- | --- |
| op | <code>string</code> | 'a', 'd', 't', 'v'. |
| id | <code>string</code> | refresh jwt id for a, d, and v. Empty for t. |
| token | <code>string</code> | encoded jwt for a.  Empty for d, t and v. |

