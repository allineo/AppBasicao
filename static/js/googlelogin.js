
function renderButton() {
    gapi.signin2.render('google-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });
}


function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    login = "gl"
    token = googleUser.getAuthResponse().id_token;
    userid = googleUser.getBasicProfile().getId();
    username = googleUser.getBasicProfile().getName();
    saveNewUser("gl", userid, username, googleUser.getBasicProfile().getEmail());
    document.getElementById("google-signin2").innerHTML = '<b><a href="#" onclick="googleSignOut();">DESLOGAR DO GOOGLE</a></b>';
}

function onFailure(error) {
    console.log(error);
}

function googleSignOut() {
	var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
       document.getElementById("google-signin2").innerHTML = '<b>DESLOGADO DO GOOGLE</b>';
    });
}