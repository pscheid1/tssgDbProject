<a name="team.controller.module_js"></a>

## js
A module for the 'team' collection


* [js](#team.controller.module_js)
    * _static_
        * [.create()](#team.controller.module_js.create) ⇒ <code>object</code> \| <code>object</code>
        * [.update()](#team.controller.module_js.update) ⇒ <code>object</code> \| <code>object</code>
        * [.findAll()](#team.controller.module_js.findAll) ⇒ <code>object</code> \| <code>object</code>
        * [.findOne()](#team.controller.module_js.findOne) ⇒ <code>object</code> \| <code>object</code>
        * [.listTeams()](#team.controller.module_js.listTeams) ⇒ <code>object</code> \| <code>object</code>
        * [.delete()](#team.controller.module_js.delete) ⇒ <code>object</code> \| <code>object</code>
        * [.test()](#team.controller.module_js.test) ⇒ <code>string</code>
    * _inner_
        * [~toarray(teams)](#team.controller.module_js..toarray) ⇒ <code>Array.&lt;string&gt;</code>

<a name="team.controller.module_js.create"></a>

### js.create() ⇒ <code>object</code> \| <code>object</code>
Function create adds a new team to the team collection

**Kind**: static method of [<code>js</code>](#team.controller.module_js)  
**Returns**: <code>object</code> - success - status 200 and a json Team object<code>object</code> - failure - status 404 and json Meeting message  

| Param | Type | Description |
| --- | --- | --- |
| req.body | <code>object</code> | Team object to add |

<a name="team.controller.module_js.update"></a>

### js.update() ⇒ <code>object</code> \| <code>object</code>
Function update modifies an existing team.
It calls findByIdAndUpdate (one operation) and receives an updated team.

**Kind**: static method of [<code>js</code>](#team.controller.module_js)  
**Returns**: <code>object</code> - success - status 200 and the updated Team object<code>object</code> - failure - status 404 and json error message  

| Param | Type | Description |
| --- | --- | --- |
| req.body | <code>object</code> | All prameters are in a Team object in the request body |

<a name="team.controller.module_js.findAll"></a>

### js.findAll() ⇒ <code>object</code> \| <code>object</code>
Function findAll returns a list of all team entries

**Kind**: static method of [<code>js</code>](#team.controller.module_js)  
**Returns**: <code>object</code> - success - status 200 and a list of teams.<code>object</code> - failure - status 404 and json error message  
<a name="team.controller.module_js.findOne"></a>

### js.findOne() ⇒ <code>object</code> \| <code>object</code>
Function findOne returns a specific team. (currently by _id)

**Kind**: static method of [<code>js</code>](#team.controller.module_js)  
**Returns**: <code>object</code> - success - status 200 and team<code>object</code> - failure - status 404 and json error message  

| Param | Type | Description |
| --- | --- | --- |
| req.params._id | <code>object</code> | contains the team id (string) to access |

<a name="team.controller.module_js.listTeams"></a>

### js.listTeams() ⇒ <code>object</code> \| <code>object</code>
Function listUsers produces a sorted list of specific users

**Kind**: static method of [<code>js</code>](#team.controller.module_js)  
**Summary**: because _id is unique we don't have to worry about duplicates
         returns a list of team id's only.  
**Returns**: <code>object</code> - success - status 200 and a list of teams<code>object</code> - failure - status 404 and json error message  
<a name="team.controller.module_js.delete"></a>

### js.delete() ⇒ <code>object</code> \| <code>object</code>
Function delete removes a specific team by _id

**Kind**: static method of [<code>js</code>](#team.controller.module_js)  
**Returns**: <code>object</code> - success - status 200 and team deleted message<code>object</code> - failure - status 404 and json error message  

| Param | Type | Description |
| --- | --- | --- |
| req.params._id | <code>object</code> | contains the id {string} of team to delete |

<a name="team.controller.module_js.test"></a>

### js.test() ⇒ <code>string</code>
Function test is a simple test,  returning data without validation or authentication

**Kind**: static method of [<code>js</code>](#team.controller.module_js)  
**Returns**: <code>string</code> - Message returning a few system variables  
<a name="team.controller.module_js..toarray"></a>

### js~toarray(teams) ⇒ <code>Array.&lt;string&gt;</code>
Function toarray returns an array of team ids from an array of Team objects

**Kind**: inner method of [<code>js</code>](#team.controller.module_js)  
**Returns**: <code>Array.&lt;string&gt;</code> - teamIds - array of team ids.  

| Param | Type | Description |
| --- | --- | --- |
| teams | <code>string</code> | list of teams |

