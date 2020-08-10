function refer(url) {
	let c = getCookie("fulltradeRefer");
	if (c == undefined) {
		let res = url.split("?");
		if (res[1]) {
			var date = new Date();
			var days = 30;
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			$.cookie("fulltradeRefer", res[1], { expires: date });

			var settings = {
				"async": true,
				"crossDomain": false,
				"url":"./php/affliate/stats.user.php?refer=" + res[1],
				"method": "GET"
			}
			$.ajax(settings).done(function (data) {
				console.log("User Save");
			});
		}else{
			var date = new Date();
			var days = 30;
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			$.cookie("fulltradeRefer", "admin", { expires: date });

			var settings = {
				"async": true,
				"crossDomain": false,
				"url":"./php/affliate/stats.user.php?refer=admin",
				"method": "GET"
			}
			$.ajax(settings).done(function (data) {
				console.log("User Save");
			});
		}
	}else{
	    let res = url.split("?");
	    if(res[1]){
	        var date = new Date();
			var days = 30;
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			$.cookie("fulltradeRefer", res[1], { expires: date });

			var settings = {
				"async": true,
				"crossDomain": false,
				"url":"./php/affliate/stats.user.php?refer=" + res[1],
				"method": "GET"
			}
			$.ajax(settings).done(function (data) {
				console.log("User Save");
			});
	    }
	}
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function height() {
	$('#form').css({
        height: ($(window).height()-80) + 'px'
    });
}

$(document).ready(function() {
	refer(window.location.href);
	height();
	$('#reg').click(function() {
		$('#reg').removeClass('active');
		$('#login').removeClass('active');
		$('#signup').removeClass('active');
		$('#signin').removeClass('active');

		$('#reg').toggleClass('active');
		$('#login').removeClass('active');
		$('#signup').toggleClass('active');
		$('#signin').removeClass('active');
	});
	$('#login').click(function() {
		$('#reg').removeClass('active');
		$('#login').removeClass('active');
		$('#signup').removeClass('active');
		$('#signin').removeClass('active');
		
		$('#login').toggleClass('active');
		$('#reg').removeClass('active');
		$('#signin').toggleClass('active');
		$('#signup').removeClass('active');
	});
	$('#signup_button').click(function() {
		let mail = $('#mail_r').val();
		let password = $('#password_r').val();
		let passwordReply = $('#password_replay_r').val();
		
		if (password == passwordReply) {
			var settings = {
				"async": true,
				"crossDomain": false,
				"url":"./php/index/signup.php?mail=" + mail + "&password=" + password + "&refer=" + getCookie('fulltradeRefer'),
				"method": "GET"
			}
			$.ajax(settings).done(function (data) {
				if (data.result == 'Error') {
					alert(data.data.type);
				}else{
					var date = new Date();
					var days = 30;
					date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
					$.cookie("fulltrade", data.data.token, { expires: date });
					window.location.replace("./terminal");
				}
			});
		}
	});

	$('#signin_button').click(function() {
		let mail = $('#mail_l').val();
		let password = $('#password_l').val();
		var settings = {
			"async": true,
			"crossDomain": false,
			"url":"./php/index/signin.php?mail=" + mail + "&password=" + password,
			"method": "GET"
		}
		$.ajax(settings).done(function (data) {
			if (data.result == 'Error') {
				alert(data.data.type);
			}else{
				var date = new Date();
				var days = 30;
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				$.cookie("fulltrade", data.data.token, { expires: date }); 
				window.location.replace("./terminal");
			}
		});
	});
});

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