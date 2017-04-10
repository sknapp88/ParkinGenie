	var map, infoWindow;
  var form = (`<form id="email-form">
    <label for="email">Please enter your Email</label>
    <input type="text" class="form-control input-form" id="email-input" name="email-input">
    <input type="submit" class="form-control" name="submit">
    </form>`);
  var panel = (`<div class="holder">
    <div class="panel panel-default" id="events">
    <div class="panel-heading">
    <h3 class="panel-title">Nearby Events</h3>
    <ul id="event-list">
    <li>does this help?</li>
    </ul>
    </div>
    </div>
    </div>`);
  function initMap() {
    map = new google.maps.Map(document.getElementById('pg-map'), {
     center: {lat: 35.228440, lng:  -80.834919},
			// mapTypeId: "satellite",
			zoom: 15
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