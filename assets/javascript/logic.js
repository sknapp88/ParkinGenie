	var map, infoWindow;
  var form = (`<form id="email-form">
    <label for="email">Please enter your Email</label>
    <input type="text" class="form-control top-element" id="email-input" name="email-input">
    <button type="button" class="form-control btn-primary" name="submit" id="e-submit">Submit</button>
    </form>`);
  var panel = (`<div class="holder">
    <div class="panel panel-default" id="events">
    <div class="panel-heading">
    <h3 class="panel-title">Nearby Events</h3>
    <ul id="event-list">
    <li class="well well-sm">does this help?</li>
    </ul>
    </div>
    </div>
    </div>`);
  var genie = (`
    <div class="row">
    <img class="top-elemnt" src="assets/images/junk-genie.png" alt="genie awaits">
    </div>
    <div class="row">
    <button type="button" id="button1" class="form-control btn-primary" name="park">Remember Where I Parked</button>
    </div>
    `);
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC7sur-winD7BqDB3TRLB8aO49-b_XBLWA",
    authDomain: "parkingenie-3ab7b.firebaseapp.com",
    databaseURL: "https://parkingenie-3ab7b.firebaseio.com",
    projectId: "parkingenie-3ab7b",
    storageBucket: "parkingenie-3ab7b.appspot.com",
    messagingSenderId: "790386734940"
  };
  
  firebase.initializeApp(config);
  function initMap() {
    map = new google.maps.Map(document.getElementById('pg-map'), {
     center: {lat: 35.228440, lng:  -80.834919},
			// mapTypeId: "satellite",
			zoom: 20
		});
    infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
        	navigator.geolocation.getCurrentPosition(function(position) {
        		var pos = {
        			lat: position.coords.latitude,
        			lng: position.coords.longitude
        		};

        		infoWindow.setPosition(pos);
        		infoWindow.setContent('Location found.');
        		infoWindow.open(map);
        		map.setCenter(pos);
        	}, function() {
        		handleLocationError(true, infoWindow, map.getCenter());
        	});
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
       infoWindow.setPosition(pos);
       infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
       infoWindow.open(map);
     }

     var me = $('#dynamic');

     $('#e-submit').on('click', function(emailToTest) {
      event.preventDefault();
    // check for @
    var atSymbol = emailToTest.indexOf("@");
    if(atSymbol < 1) return false;

    var dot = emailToTest.indexOf(".");
    if(dot <= atSymbol + 2) return false;

    // check that the dot is not at the end
    if (dot === emailToTest.length - 1) return false;

    return true;
  });

     $('#email-button').click(function(){
      if (me.html() === ""){
        me.append(form);
      }
      else if ($("#dynamic").html() != form){
        me.html('');
        me.append(form);
      }
    });

     $("#events-button").click(function(){
      if (me.html() === ""){
        me.append(panel);
      }
      else if (me.html() != panel){
        me.html('');
        me.append(panel);
      }
    });

     $("#begin-search-button").click(function(){
      if (me.html() === ""){
        me.append(genie);
      }
      else if (me.html() != genie){
        me.html('');
        me.append(genie);
      }

     function findParking(){
      var cur_location = new google.maps.LatLng(map.getCenter().lat(), map.getCenter().lng());
      var request = {
        location: cur_location,
        radius: 500,
        types: "Parking"
      };
      var service = new google.maps.places.PlacesService(map);
      service.search(request, createMarkers);
    }

    $("#button1").on("click", findParking());
  });