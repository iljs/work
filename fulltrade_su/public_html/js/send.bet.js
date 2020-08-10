function twoDigits(num) {
  return ('0' + num).slice(-2);
}

function timeConverter(UNIX_timestamp){
	  var a = new Date(UNIX_timestamp * 1000);
	  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	  var year = a.getFullYear();
	  var month = months[a.getMonth()];
	  var date = a.getDate();
	  var hour = a.getHours();
	  var min = a.getMinutes();
	  var sec = a.getSeconds();
	  var time =  hour + ':' + twoDigits(min);
	  return time;
}

function timeConverterFull(UNIX_timestamp){
	  var a = new Date(UNIX_timestamp * 1000);
	  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	  var year = a.getFullYear();
	  var month = (a.getMonth() + 1);
	  var date = a.getDate();
	  var hour = a.getHours();
	  var min = a.getMinutes();
	  var sec = a.getSeconds();
	  var time =  year + "." + twoDigits(month) + "." + twoDigits(date) + " " + hour + ':' + twoDigits(min);
	  return time;
}


function bet(type) {
	$("#help").removeClass('vis');
	$("#background").toggleClass('vis');
	$("#message").toggleClass('vis');
	$("#loader").toggleClass('vis');
	$("#trade_couples_option").removeClass('vis');
	$("#trade_time_option").fadeTo(100,0);
	$("#trade_bet_option").fadeTo(100,0);

	let token = $("#trade_info").attr('token');
	let bet = $("#trade_info").attr('tradebet');
	let couples = $("#trade_info").attr('activecouples');
	let time = $("#trade_info").attr('tradetime');

	var settings = {
		"async": true,
		"crossDomain": false,
		"url": "./php/terminal/send.bet.php?token=" + token + "&bet=" + bet + "&time=" + time + "&couples=" + couples + "&type=" + type,
		"method": "GET",
	}
	$.ajax(settings).done(function (data) {
		if (data.result == 'Success') {

			$("#history").html('');

			if (data.data.active) {

				$("#history").append('<h2>Активные</h2>');

				for (var i = data.data.active.id.length - 1; i >= 0; i--) {
					let color = 'green';

					if (data.data.active.price[i] > data.data.active.now[i]) {
						if (data.data.active.type[i] == 'up') {
							color = 'red';
						}
					}

					if (data.data.active.price[i] < data.data.active.now[i]) {
						if (data.data.active.type[i] == 'down') {
							color = 'red';
						}
					}

					$("#history").append('\
						<div id="history_block">\
							<div id="history_block_h5">\
								<h5>' + timeConverter(parseInt(data.data.active.time[i],10) + 60)+ '</h5>\
							</div>\
							<div id="history_block_right">\
								<h1>' + data.data.active.sum[i]+ '₽</p>\
								<p><p style="float: right; color: ' + color + '">' + data.data.active.now[i] + '</p><p style="float: right;">' + data.data.active.price[i] + ' /&nbsp</p></p>\
							</div>\
							<div id="history_block_couples">\
								<h1>' + data.data.active.couples[i] + '</h1>\
								<p id="i' + data.data.active.type[i] + '"></p>\
							</div>\
						</div>');

					
				}

			}

			if (data.data.history) {

				$("#history").append('<h2>Прошедшие</h2>');

				for (var i = data.data.history.id.length - 1; i >= 0; i--) {
					let win = 0;
					if (data.data.history.status[i] == 'win') {
						win = (parseInt(data.data.history.procent[i],10)/100 * parseInt(data.data.history.sum[i],10) + parseInt(data.data.history.sum[i],10)).toFixed(2);
					}

					$("#history").append('\
						<div id="history_block">\
							<div id="history_block_h5">\
								<h5>' + timeConverter(parseInt(data.data.history.time[i],10) + 60)+ '</h5>\
							</div>\
							<div id="history_block_right">\
								<h1>' + data.data.history.sum[i] + '₽</p>\
								<p>' + win + '₽</p>\
							</div>\
							<div id="history_block_couples">\
								<h1>' + data.data.history.couples[i] + '</h1>\
								<p id="i' + data.data.history.status[i] + '"></p>\
							</div>\
						</div>');
				}
			}

			$("#loader").removeClass('vis');
			$("#success").toggleClass('vis');
			setTimeout(function() {
				$("#background").removeClass('vis');
				$("#message").removeClass('vis');
				$("#success").removeClass('vis');
				$("#optionbar").animate({left: "80px"}, 300);
				setTimeout(function() {
					$("#history").show(100);
				},200);
			},1000);
		}

		if (data.result == 'Error') {
			$("#loader").removeClass('vis');
			$("#error").toggleClass('vis');
			setTimeout(function() {
				$("#background").removeClass('vis');
				$("#message").removeClass('vis');
				$("#error").removeClass('vis');
			},3000);
		}
	});
}

$(document).ready(function() {
	$("#up").click(function() {
		bet('up');
	});
	$("#down").click(function() {
		bet('down');
	});
});