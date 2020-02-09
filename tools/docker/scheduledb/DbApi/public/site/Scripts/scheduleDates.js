/* 
   Javascript file for generating the Schedules page from data. As of 11/14/2018, it uses hardcoded arrays of Schedule and Location objects.  In a future version, this data will be retrieved from a server-side script.
*/


function XLocation (name, locationGraphic, mapLink,label) {
   /* Constructor method for objects of type Location.  A location requires a name, a graphic to use as the icon, a map link, and a label for the Alt and Title attributes.
   */ 
  this.name = name;
  this.locationGraphic = locationGraphic;
  this.mapLink = mapLink;
  this.label = label;
}

/* Create all objects of class Location here.  They're created as separate, named  objects, instead of an array of objects, in order to simplify their use in later code.  In the future they might become part of a data request to a server script, or they might be left like this.
*/

// var acton = new Location("Acton","Images/icon-lib-acton.png", "https://goo.gl/maps/6wmSZBydHVU2","Acton Memorial Library");
// var chelmsford = new Location("Chelmsford","Images/icon-lib-chelmsford.png","https://goo.gl/maps/5r8hpPRyd4n","Chelmsford Library");
// var cancelled = new Location("Cancelled","Images/icon-lib-NOmeeting.png","","Meeting Cancelled");
// var hopkinton = new Location("Hopkinton","Images/icon-lib-hopkinton.png","https://goo.gl/maps/QYW9A3VBayS2","Hopkinton Public Library");
// var lexington = new Location("Lexington","Images/icon-lib-lexington.png","https://goo.gl/maps/4y785Pjxq4H2","Lexington Community Center");
// var boxborough = new Location("Boxborough","Images/icon-lib-boxborough.png","https://goo.gl/maps/UQjhdjHa41x","Albert J. Sargent Memorial Library");
// var tobedetermined = new Location("TBD","Images/icon-lib-TBD.png","","To Be Determined");

/* scheduleArray is an array of Schedule objects as they would be received from a server-side script.  
 Each Schedule object consists of a name, month (as the three-letter abbreviation), day (one or two digits), year, start time (as a string), end time (as a string), 
 and a location which is one of the previously defined Location objects.
*/
var XscheduleArray = [ 
    {
      "name": "item1",
      "month": "JANUARY",
      "day": 29,
      "year": 2020,
      "startTime": "12:30",
      "endTime": "5PM",
      "location": acton
    },
    {
      "name": "item2",
      "month": "FEBRUARY",
      "day": 5,
      "year": 2020,
      "startTime": "12:30",
      "endTime": "5PM",
      "location": acton
    },
    {
      "name": "item3",
      "month": "FEBRUARY",
      "day": 12,
      "year": 2020,
      "startTime": "12:30",
      "endTime": "5PM",
      "location": acton
    }
];
 
// var scheduleTable = document.getElementById("scheduleBody");

// For each item in the Schedules array, run a function that builds a table row containing the data from that Schedule item.
XscheduleArray.forEach(displaySchedule);

function XdisplaySchedule(entry,index) {
  // build a table-row node that contains the needed HTML for a Schedule entry, 
   // inserting data from the array row where necessary.
   var newRow = scheduleTable.insertRow(index);
   var dateCell = newRow.insertCell(0);
   var locationCell = newRow.insertCell(1);
   var timeCell = newRow.insertCell(2);
   var imgElement = document.createElement("img"); 
   var locationLink = document.createElement("a");

   /* The structure built here is based on the original hard-coded structure for a Schedule entry, but with the CSS extracted and simplified.  See scheduleStyles.css for the styles used here.
   
      A Schedule entry consists of three cells:
         Left ->  Contains the date
         Center -> Contains an icon for the location which is also a link to a map of the location
         Right-> The start and end times for the meeting
   */  
   dateCell.innerHTML = "<span class='monthText'>" + entry.month + 
      "</span><br><span class='dayText'>" + entry.day + 
      "</span><br><span class='yearText'>" + entry.year +
      "</span>";

   imgElement.setAttribute("src", entry.location.locationGraphic);
   locationLink.href = entry.location.mapLink;
   locationLink.setAttribute("title",entry.location.label);
   locationLink.appendChild(imgElement);
   locationCell.appendChild(locationLink);

   timeCell.innerHTML = entry.startTime + "<br> to <br>" + entry.endTime;
}
