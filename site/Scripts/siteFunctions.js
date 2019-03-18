/* 	JavaScript file: siteFunctions.js
	Javascript functions required across the site.  Includes the IIEF that runs on page load.
	*/

function loadSections() {
	// insert the header and footer text and html.
  $('#pageHeader').load( "pageHeader.html");
  $('#pageFooter').load( "pageFooter.html");
 
  $('.navbar-nav li a').on('click', function(){
    if(!$( this ).hasClass('dropdown-toggle')){
        $('.navbar-collapse').collapse('hide');
    }
  });
   $('.carousel').carousel(1);
} // end function loadSections


function setActive() {
    // function to clear the "active" border form all navbar icons, then activate the border on only the current one.
    // first, get the current url.
    var fullPagePath = window.location.pathname;
    // extract the pagename only - no path or extension - and use it to set the current menu-bar cell.
    var currentPage = "#" + getPageName(fullPagePath);
    // remove the 'active' class from all navbar icons.
    //$(".linkCell").removeClass("currentPage");
    // add the 'active' class to only the current page's icon.
    $(currentPage).addClass("currentPage");
}


function getPageName(url) {
  console.log("In getPageName with url=" + url);
  // copied from Stack Overflow: https://stackoverflow.com/questions/16286384/how-to-get-the-pagename-from-the-url-without-the-extension-through-jquery
  var index = url.lastIndexOf("/") + 1;
  var filenameWithExtension = url.substr(index);
  var filename = filenameWithExtension.split(".")[0]; // <-- added this line
  return filename;                                    // <-- added this line
}

/* Code to load and display the testimonials that are listed in testimonials.js.
*/
function loadTestimonials() {
  testimonials.forEach(displayTestimonial);
}


function displayTestimonial(entry,index) {
  // create container div for this testimonial and set its class.
  var thisEntry = document.createElement('div'); 
  thisEntry.className = "testimonialEntry";
  
  // create container elements for the components of the testimonial
  var thisIndex = document.createElement('span'); 
  var thisText = document.createElement('p');
  var thisSignature = document.createElement('p');
  // load the three fields of a testimonial into the appropriate, just-created elements
  /* NOTE: thisIndex is now holding the testimonial title. Better to show a title than 
           testimonial #1, #2, #3... Not changing thisIndex to thisTitle yet. JS 1/8/2019
  */
  //  thisIndex.innerHTML = "Entry #" + (index + 1);
  thisIndex.innerHTML = entry.title;
//  thisSignature.innerHTML = "Signed - " + entry.name + ", " + entry.date;
  thisSignature.innerHTML = entry.name + ", " + entry.date;
  thisText.innerHTML = entry.text;

  // set the classes for the four new elements.  
  thisIndex.className = "testimonialIndex";
  thisText.className = "testimonialText";
  thisSignature.className = "testimonialSignature";

  // append the three just-created elements to the container element
  thisEntry.appendChild(thisIndex);
  thisEntry.appendChild(thisText);
  thisEntry.appendChild(thisSignature);
  // and finally, add the container div to the document as a child of Content
  document.getElementById("content").appendChild(thisEntry);
}


function displayContactBox() {
  alert("We do not have a contact email address.  If you have any questions, \n please come to our next Wednesday general meeting.");
}