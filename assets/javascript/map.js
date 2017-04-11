var rev_geocoder;
var map;
var markers = Array();
var infos = Array();

//Initialize the google Map with Lat and Longitude
function initMap() {
   // Geocoder is part of the Google Maps API. It is converting addresses into coordinates, here we're using reverse geocoding.
   //Reverse geocoding coverts coodinates into addresses. You still create a Geocoder object.
   rev_geocoder = new google.maps.Geocoder();
   // set initial position (UNCC City Center)
   var genieLatlng = new google.maps.LatLng(35.228440,-80.834919);
   var myOptions = { // default map options
       zoom: 14,
       center: genieLatlng,
       mapTypeId: google.maps.MapTypeId.ROADMAP
   };
   map = new google.maps.Map(document.getElementById('pg-map'), myOptions);

}

// clear overlays function
function clearOverlays() {
   if (markers) {
       for (i in markers) {
           markers[i].setMap(null);
       }
       markers = [];
       infos = [];
   }
}

// clear infos function
function clearInfos() {
   if (infos) {
       for (i in infos) {
           if (infos[i].getMap()) {
               infos[i].close();
           }
       }
   }
}


// findParking function
function findParking() {
   // prepare variables (filter)
   var type = $('#gmap_type').attr('id'); //document.getElementById('gmap_type').value;
   var radius = $('#gmap_radius').find(":selected").val()
   console.log(radius)// document.getElementById('gmap_radius').value;
   //var keyword = document.getElementById('gmap_keyword').value;

   var lat = document.getElementById('lat').value;
   var lng = document.getElementById('lng').value;
   var cur_location = new google.maps.LatLng(lat, lng);
   // prepare request to Places
   var request = {
       location: cur_location,
       radius: radius,
       types: [type]
   };
   /* if (keyword) {
    request.keyword = [keyword];
    }*/
   // send request
   service = new google.maps.places.PlacesService(map);
   service.search(request, createMarkers);
}



// create markers to place on map (from 'findParking' function)
function createMarkers(results, status) {
   if (status == google.maps.places.PlacesServiceStatus.OK) {
       // if a parking log is found - clear map (overlays)
       clearOverlays();
       // and create new markers for parking lots found
       for (var i = 0; i < results.length; i++) {
           createMarker(results[i]);
       }
       //check to see if we have any result of places found
   } else if (status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
       alert('Sorry, nothing is found');
   }
}


// creare single marker function
function createMarker(obj) {
   // prepare new Marker object
   var mark = new google.maps.Marker({
       position: obj.geometry.location,
       map: map,
       title: obj.name
   });
   markers.push(mark);
   // prepare info window
   var infowindow = new google.maps.InfoWindow({
       content: '<img src="' + obj.icon + '" /><font style="color:#000;">' + obj.name +
       '<br />Rating: ' + obj.rating + '<br />Vicinity: ' + obj.vicinity + '</font>'
   });
   // add event handler to current marker
   google.maps.event.addListener(mark, 'click', function() {
       clearInfos();
       infowindow.open(map,mark);
   });
   infos.push(infowindow);
}