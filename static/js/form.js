
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
	
	$.post(url, {}, function(response) {
		var itemid = response;
		listForm();
	});
}

function listForm() {
	var url = "/listForm?"
				+ "login=" + login 
				+ "&userid=" + userid 
				+ "&token=" + token;
	
	$.post(url, {}, function(response) {
		var list = "";
		var items = jQuery.parseJSON(response);
		for(var k in items) {
			var item = items[k];
			var date = "";
			if (item.timestamp != undefined && (item.timestamp != "")) {
				var date = new Date(item.timestamp.$date);
			}
		   	list += "<hr>" + 
		   			date + "<br/>" +
		   			item.contact + "<br/>" + 
		   			item.message;
		}
		document.getElementById("listFormDiv").innerHTML = list + "<hr>";
	});
}