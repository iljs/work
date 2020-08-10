function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function height() {
	$('#root').css({
        height: $(window).height() + 'px'
    });

    $('#main').css({
        height: $(window).height() + 'px'
    });

    $('#panel-1').css({
        height: ($(window).height() - 46) + 'px'
    });

    $('#panel-2').css({
        height: $(window).height() + 'px'
    });
}

function adaptive() {
	if ($(window).width() > 780) {
		$("#auth").toggleClass('d');
		$("#main").toggleClass('d');
	}
	if ($(window).width() <= 780) {
		$("#auth").toggleClass('m');
		$("#main").toggleClass('m');
	}
}

function animation() {
	let token = getCookie('token');
	if (token != undefined) {
		$("#main").css("display", "block");
		$("#main").animate({
			opacity: 1
		}, 600);

		$("#user_info").attr("token", token);
	}else{
		$("#auth").css("display", "block");
		$("#auth").animate({
			opacity: 1
		}, 600);
	}
}

function reports() {
	let token = $("#user_info").attr('token');
	var settings = {
		"async": true,
		"crossDomain": false,
		"url": "./php/get.reports.php?token=" + token,
		"method": "GET"
	}
	$.ajax(settings).done(function (data) {
		if(data.result == 'Success'){
			for (var i = data.data.reports.id.length - 1; i >= 0; i--) {
				$("#reports").append('\
					<div id="reports_block" key="' + data.data.reports.id[i] + '" class="default_block">\
						<div id="reports_block_header" class="default_block_header">\
							<p>' + data.data.reports.type[i] + '</p>\
							<img src="./img/svg/next.svg" height="7">\
						</div>\
						<h2>' + data.data.reports.name[i] + '</h2>\
					</div>'
				);
			}
		}
	});
}

$(document).ready(function(){
	adaptive();
	height();
	animation();
	reports();
});