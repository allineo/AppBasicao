var login = "";
var token = "";
var userid = "";
var username = "Você";



$(document).ready(function(){
  $('.sidenav').sidenav();
});


function hideAllPages() {
  $("#loginPage,#formPage,#mapPage").hide();
}
function showLoginPage() {
  hideAllPages();
  $("#loginPage").show();
}
function showFormPage() {
  hideAllPages();
  $("#formPage").show();
  listForm();
}
function showMapPage() {
  hideAllPages();
  $("#mapPage").show();
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
	
	$.post(url, {}, function(response) {
		console.log('Successful login: ' + response);
	});
}
