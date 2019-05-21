
function saveForm() {
	var message = document.getElementById("feedbackmessageTextArea").value;
	var contact = document.getElementById("contactField").value;

	var url = "/saveForm?" 
				+ "contact=" + encodeURIComponent(contact)
				+ "&message=" + encodeURIComponent(message)
				+ "&login=" + login 
				+ "&userid=" + userid 
				+ "&latitude=" + latitude
        		+ "&longitude=" + longitude	
				+ "&token=" + token;

	fetch(url, {method: 'POST'})
		.then(function(response) {
			var itemid = response;
			listForm();
			showFormPage();
		});
}

function listForm() {
	var url = "/listForm?"
				+ "login=" + login 
				+ "&userid=" + userid 
				+ "&token=" + token;
	fetch(url, {method: 'POST'}) 
		.then((resp) => resp.json())
		.then(function(respjson) {
			var list = "";
			for(var k in respjson) {
				var item = respjson[k];
				var date = "";
				if (item.timestamp != undefined && (item.timestamp != "")) {
					var date = new Date(item.timestamp.$date);
				}
				   list += "<hr>" + 
						   date + "<br/>" +
						   item.contact + "<br/>" + 
						   item.message;
				   addMarker(parseInt(item.latitude), parseInt(item.longitude), item.message);
			}
			document.getElementById("listFormDiv").innerHTML = list + "<hr>";
		});
}