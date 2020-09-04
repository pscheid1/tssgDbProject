<a name="meeting.controller.module_js"></a>

## js
A module for the 'Meetings' collection


* [js](#meeting.controller.module_js)
    * _static_
        * [.create()](#meeting.controller.module_js.create) ⇒ <code>object</code> \| <code>object</code>
        * [.update()](#meeting.controller.module_js.update) ⇒ <code>object</code> \| <code>object</code>
        * [.findAll()](#meeting.controller.module_js.findAll) ⇒ <code>object</code> \| <code>object</code>
        * [.findOne()](#meeting.controller.module_js.findOne) ⇒ <code>object</code> \| <code>object</code>
        * [.delete()](#meeting.controller.module_js.delete) ⇒ <code>object</code> \| <code>object</code>
        * [.schedule()](#meeting.controller.module_js.schedule) ⇒ <code>object</code> \| <code>object</code>
        * [.webSchedule()](#meeting.controller.module_js.webSchedule) ⇒ <code>object</code> \| <code>object</code>
        * [.test()](#meeting.controller.module_js.test) ⇒ <code>string</code>
    * _inner_
        * [~updateDate(newDate, newTime)](#meeting.controller.module_js..updateDate) ⇒ <code>object</code>

<a name="meeting.controller.module_js.create"></a>

### js.create() ⇒ <code>object</code> \| <code>object</code>
Function create adds a new meeting to the meetings collection

**Kind**: static method of [<code>js</code>](#meeting.controller.module_js)  
**Returns**: <code>object</code> - success - status 200 and a json Meeting object<code>object</code> - failure - status 404 and json Meeting message  

| Param | Type | Description |
| --- | --- | --- |
| req.body | <code>object</code> | Meeting object to add |

<a name="meeting.controller.module_js.update"></a>

### js.update() ⇒ <code>object</code> \| <code>object</code>
Function update modifies an existing meeting.
It calls findByIdAndUpdate (one operation) and receives an updated team.

**Kind**: static method of [<code>js</code>](#meeting.controller.module_js)  
**Returns**: <code>object</code> - success - status 200 and the updated Meeting object<code>object</code> - failure - status 404 and json error message  

| Param | Type | Description |
| --- | --- | --- |
| req.body | <code>object</code> | All prameters are in a Meeting object in the request body |

<a name="meeting.controller.module_js.findAll"></a>

### js.findAll() ⇒ <code>object</code> \| <code>object</code>
Function findAll returns a list of all meeting entries

**Kind**: static method of [<code>js</code>](#meeting.controller.module_js)  
**Returns**: <code>object</code> - success - status 200 and a list of meetings.<code>object</code> - failure - status 404 and json error message  
<a name="meeting.controller.module_js.findOne"></a>

### js.findOne() ⇒ <code>object</code> \| <code>object</code>
Function findOne returns a specific meeting. (currently by _id)

**Kind**: static method of [<code>js</code>](#meeting.controller.module_js)  
**Returns**: <code>object</code> - success - status 200 and meeting<code>object</code> - failure - status 404 and json error message  

| Param | Type | Description |
| --- | --- | --- |
| req.params._id | <code>object</code> | contains the meeting id (string) to access |

<a name="meeting.controller.module_js.delete"></a>

### js.delete() ⇒ <code>object</code> \| <code>object</code>
Function delete removes a specific meeting by _id

**Kind**: static method of [<code>js</code>](#meeting.controller.module_js)  
**Returns**: <code>object</code> - success - status 200 and meeting deleted message<code>object</code> - failure - status 404 and json error message  

| Param | Type | Description |
| --- | --- | --- |
| req.params._id | <code>object</code> | contains the id {string} of meeting to delete |

<a name="meeting.controller.module_js.schedule"></a>

### js.schedule() ⇒ <code>object</code> \| <code>object</code>
Function schedule returns a sorted list of meetings

**Kind**: static method of [<code>js</code>](#meeting.controller.module_js)  
**Returns**: <code>object</code> - success - status 200 and meeting<code>object</code> - failure - status 404 and json error message  
**Summary:**: schedule filters meetings by team and endTime with a limit of 3.
    we compare aginst endTime becuase it has the meeting date and endTime.
    meetingDate has no time component.  Using endTime is a less complicated
    way to compare witn new Date() and get an entry for the current day
    as long as the endTime is greater than the current time.  

| Param | Type | Description |
| --- | --- | --- |
| req.params._id | <code>object</code> | contains the meeting id (string) to access |

<a name="meeting.controller.module_js.webSchedule"></a>

### js.webSchedule() ⇒ <code>object</code> \| <code>object</code>
Function webSchedule returns a sorted list of meetings for a specific team

**Kind**: static method of [<code>js</code>](#meeting.controller.module_js)  
**Returns**: <code>object</code> - success - status 200 and meeting<code>object</code> - failure - status 404 and json error message  
**Summary:**: webSchedule is unrestricted (public access)
   webSchedule is identical to schedule (above) except it populates the team
   and venue fields with data from their respective collection. If a team is 
   not passed in, it will default to BACKEND_DEFAULT_TEAM and then to 'WedGenMtg'.  

| Param | Type | Description |
| --- | --- | --- |
| req.params._id | <code>object</code> | contains the meeting id (string) to access |

<a name="meeting.controller.module_js.test"></a>

### js.test() ⇒ <code>string</code>
Function test is a simple test,  returning data without validation or authentication

**Kind**: static method of [<code>js</code>](#meeting.controller.module_js)  
**Returns**: <code>string</code> - Message returning a few system variables  
<a name="meeting.controller.module_js..updateDate"></a>

### js~updateDate(newDate, newTime) ⇒ <code>object</code>
Function updateDate creates a Date object with a given date & time

**Kind**: inner method of [<code>js</code>](#meeting.controller.module_js)  
**Returns**: <code>object</code> - newDateTime - Date object with a given date & time.  

| Param | Type | Description |
| --- | --- | --- |
| newDate | <code>string</code> | Meeting object to add |
| newTime | <code>string</code> | Meeting object to add |

