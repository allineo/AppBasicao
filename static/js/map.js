
var latitude = "";
var longitude = "";
var map = null;

getLocation();


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getLocationSuccess);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function getLocationSuccess(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    initMap();
}

function initMap() {
	if (map == null) {
		 map = new google.maps.Map(document.getElementById('map'), {
		    zoom: 12,
		    center: {lat: latitude, lng: longitude}
		 });
		 addMarker(latitude, longitude, username);
	}
}

function addMarker(lat, long, title) {
  var marker = new google.maps.Marker({
    position: {lat: lat, lng: long},
    map: map,
    title: title
  });
}