var login = "";
var token = "";
var userid = "";
var username = "Você";



//Inicializacao do Menu
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});


function hideAllPages() {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("formPage").style.display = "none";
  document.getElementById("mapPage").style.display = "none";
  
}
function showLoginPage() {
  hideAllPages();
  document.getElementById("loginPage").style.display = "block";
}
function showFormPage() {
  hideAllPages();
  document.getElementById("formPage").style.display = "block";
}
function showMapPage() {
  hideAllPages();
  document.getElementById("mapPage").style.display = "block";
  listForm();
}   


function saveNewUser(login, userid, username, useremail) {
	addMarker(latitude, longitude, username);
	document.getElementById("userfield").innerHTML = "Usuário:<b> " + username + "</b>";
	var url = "/saveNewUser?"
				+ "login=" + login
				+ "&userid=" + userid
        + "&latitude=" + latitude
        + "&longitude=" + longitude				
				+ "&username=" + username 
				+ "&useremail=" + useremail;
	
  fetch(url, {method: 'POST'})
    .then(function(response) {
      console.log('Successful login: ' + response);
    });
}
