function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function check() {
	let token = getCookie('fulltrade');
	if (token != undefined) {
		window.location.replace("./terminal");
	}else{
		
	}
}

$(document).ready(function() {
	check();
});

$("#button").click(function() {
	let mail = $('#mail').val();
	var settings = {
		"async": true,
		"crossDomain": false,
		"url":"./php/forgot/create.password.php?mail=" + mail,
		"method": "GET"
	}
	$.ajax(settings).done(function (data) {
		if (data.result == 'Error') {
			alert(data.message);
		}else{
			$("input").hide();
			$("button").hide();
			$("p").show();

			setTimeout(function() {
				window.location.replace("./index");
			}, 6000);
		}
	});
		
});