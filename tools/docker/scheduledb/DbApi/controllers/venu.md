<a name="meeting.controller.module_js"></a>

## js
A module for the 'Meetings' collection


* [js](#meeting.controller.module_js)
    * _static_
        * [.create()](#meeting.controller.module_js.create) ⇒ <code>object</code> \| <code>object</code>
        * [.update()](#meeting.controller.module_js.update) ⇒ <code>object</code> \| <code>object</code>
        * [.findAll()](#meeting.controller.module_js.findAll) ⇒ <code>object</code> \| <code>object</code>
        * [.listVenues()](#meeting.controller.module_js.listVenues) ⇒ <code>object</code> \| <code>object</code>
        * [.findOne()](#meeting.controller.module_js.findOne) ⇒ <code>object</code> \| <code>object</code>
        * [.delete()](#meeting.controller.module_js.delete) ⇒ <code>object</code> \| <code>object</code>
        * [.test()](#meeting.controller.module_js.test) ⇒ <code>string</code>
    * _inner_
        * [~toarray(venues)](#meeting.controller.module_js..toarray) ⇒ <code>Array.&lt;string&gt;</code>

<a name="meeting.controller.module_js.create"></a>

### js.create() ⇒ <code>object</code> \| <code>object</code>
Function create adds a new venue to the venue collection

**Kind**: static method of [<code>js</code>](#meeting.controller.module_js)  
**Returns**: <code>object</code> - success - status 200 and a json Venue object<code>object</code> - failure - status 404 and json Meeting message  

| Param | Type | Description |
| --- | --- | --- |
| req.body | <code>object</code> | Venue object to add |

<a name="meeting.controller.module_js.update"></a>

### js.update() ⇒ <code>object</code> \| <code>object</code>
Function update modifies an existing venue.
It calls findByIdAndUpdate (one operation) and receives an updated venue.

**Kind**: static method of [<code>js</code>](#meeting.controller.module_js)  
**Returns**: <code>object</code> - success - status 200 and the updated Venue object<code>object</code> - failure - status 404 and json error message  

| Param | Type | Description |
| --- | --- | --- |
| req.body | <code>object</code> | All prameters are in a Venue object in the request body |

<a name="meeting.controller.module_js.findAll"></a>

### js.findAll() ⇒ <code>object</code> \| <code>object</code>
Function findAll returns a list of all venue entries

**Kind**: static method of [<code>js</code>](#meeting.controller.module_js)  
**Returns**: <code>object</code> - success - status 200 and a list of teams.<code>object</code> - failure - status 404 and json error message  
<a name="meeting.controller.module_js.listVenues"></a>

### js.listVenues() ⇒ <code>object</code> \| <code>object</code>
Function listUsers produces a sorted list of venue id's only

**Kind**: static method of [<code>js</code>](#meeting.controller.module_js)  
**Summary**: because _id is unique we don't have to worry about duplicates
         returns a list of venue id's  
**Returns**: <code>object</code> - success - status 200 and a list of venues<code>object</code> - failure - status 404 and json error message  
<a name="meeting.controller.module_js.findOne"></a>

### js.findOne() ⇒ <code>object</code> \| <code>object</code>
Function findOne returns a specific venue.

**Kind**: static method of [<code>js</code>](#meeting.controller.module_js)  
**Returns**: <code>object</code> - success - status 200 and venue<code>object</code> - failure - status 404 and json error message  

| Param | Type | Description |
| --- | --- | --- |
| req.params._id | <code>object</code> | contains the venue id (string) to access |

<a name="meeting.controller.module_js.delete"></a>

### js.delete() ⇒ <code>object</code> \| <code>object</code>
Function delete removes a specific venue.

**Kind**: static method of [<code>js</code>](#meeting.controller.module_js)  
**Returns**: <code>object</code> - success - status 200 and venue deleted message<code>object</code> - failure - status 404 and json error message  

| Param | Type | Description |
| --- | --- | --- |
| req.params._id | <code>object</code> | contains the id {string} of venue to delete |

<a name="meeting.controller.module_js.test"></a>

### js.test() ⇒ <code>string</code>
Function test is a simple test,  returning data without validation or authentication

**Kind**: static method of [<code>js</code>](#meeting.controller.module_js)  
**Returns**: <code>string</code> - Message returning a few system variables  
<a name="meeting.controller.module_js..toarray"></a>

### js~toarray(venues) ⇒ <code>Array.&lt;string&gt;</code>
Function toarray returns an array of venue ids from an array of Venue objects

**Kind**: inner method of [<code>js</code>](#meeting.controller.module_js)  
**Returns**: <code>Array.&lt;string&gt;</code> - venue*ds - array of venue ids.  

| Param | Type | Description |
| --- | --- | --- |
| venues | <code>string</code> | list of venues |

