let option = ['Подтвердить','Да'];


function history(array) {
	$("#history").html('');

	if (array.active) {

		$("#history").append('<h2>Активные</h2>');
			for (var i = array.active.id.length - 1; i >= 0; i--) {
			let color = 'green';

			if (array.active.price[i] > array.active.now[i]) {
				if (array.active.type[i] == 'up') {
					color = 'red';
				}
			}

			if (array.active.price[i] < array.active.now[i]) {
				if (array.active.type[i] == 'down') {
					color = 'red';
				}
			}

			$("#history").append('\
				<div id="history_block" key="-1">\
					<div id="history_block_h5">\
						<h5>' + timeConverter(parseInt(array.active.time[i],10) + 60)+ '</h5>\
					</div>\
					<div id="history_block_right">\
						<h1>' + array.active.sum[i]+ '₽</p>\
						<p><p style="float: right; color: ' + color + '">' + array.active.now[i] + '</p><p style="float: right;">' + array.active.price[i] + ' /&nbsp</p></p>\
					</div>\
					<div id="history_block_couples">\
						<h1>' + array.active.couples[i] + '</h1>\
						<p id="i' + array.active.type[i] + '"></p>\
					</div>\
				</div>'
			);
		}
	}

	if (array.history) {

		$("#history").append('<h2>Прошедшие</h2>');

		for (var i = array.history.id.length - 1; i >= 0; i--) {
			let win = 0;
			if (array.history.status[i] == 'win') {
				win = (parseInt(array.history.procent[i],10)/100 * parseInt(array.history.sum[i],10) + parseInt(array.history.sum[i],10)).toFixed(2);
			}

			$("#history").append('\
				<div id="history_block" key="' + array.history.id[i] + '" class="history_hover">\
					<div id="history_block_h5">\
						<h5>' + timeConverter(parseInt(array.history.time[i],10) + 60)+ '</h5>\
					</div>\
					<div id="history_block_right">\
						<h1>' + array.history.sum[i] + '₽</p>\
						<p>' + win + '₽</p>\
					</div>\
					<div id="history_block_couples">\
						<h1>' + array.history.couples[i] + '</h1>\
						<p id="i' + array.history.status[i] + '"></p>\
					</div>\
				</div>'
			);
		}
	}
}


function trade(index) {
    index = index.substr(0, 3) + index.substr(4);
	var widget = window.tvWidget = new TradingView.widget({
		width: ($(window).width()-294),
		height: ($(window).height()-80),
		symbol: "FOREXCOM:" + index,
		interval: "1",
		timezone: "Europa/Moscow",
		theme: "dark",
		style: "1",
		locale: "ru",
		toolbar_bg: "#131722",
		enable_publishing: false, 
		container_id: "tradingview-widget-container",
		hide_side_toolbar: false,
	});
}

function couples(array, obj, a) {
	let couples = obj.split(',');
	let deletevar = '';
	$('#couples_blocks').html('');
	$('#trade_couples_option_all').html('');
	for (var i = 0; i < couples.length; i++) {
		for (var q = 0; q < array.id.length; q++) {
			if (couples[i] == array.name[q]) {
				let active = '';
				if (i == a) {
					active = 'class="active"';
					$('h2','#result').html(array.procent[q] + "%");
					$('h6','#result').html(((array.procent[q]/100) * parseInt($("#trade_info").attr('tradebet'),10) + parseInt($("#trade_info").attr('tradebet'),10)).toFixed(2) + "₽");
					$("#trade_info").attr('procent', array.procent[q]);
				}
				if (couples.length > 2) {
					deletevar = '<div id="couples_delete" key="' + i + '">\
									<img src="img/svg/cancelwhite.svg" height="10">\
						 		</div>'
				}
				$('#couples_blocks').append("\
					<div id='couples' " + active + ">\
						<div style='float: left; width: 85%'>\
							 <div id='country'>\
							 	<h6>" + array.name[q] + "</h6>\
							 </div>\
							 <div id='cash'>\
							 	<p>" + array.procent[q] + "%</p>\
							 </div>\
						 </div>\
						 " + deletevar + "\
					</div>\
				");
			}
		}
	}

	for (var x = 0; x < array.id.length; x++) {
		$('#trade_couples_option_all').append("\
			<div id='trade_couples_once'>\
				<div id='trade_couples_once_country'>\
					<h6>" + array.name[x] + "</h6>\
				</div>\
				<div id='trade_couples_once_cash'>\
					<p>" + array.procent[x] + "%</p>\
				</div>\
			</div>"
		);
	}
}

function start() {
	let token = $("#trade_info").attr('token');
	var settings = {
		"async": true,
		"crossDomain": false,
		"url": "./php/terminal/get.userdata.php?update=1&token=" + token,
		"method": "GET",
	}
	$.ajax(settings).done(function (data) {
		if (data.result != 'Success') {
			window.location.replace("./index");
		}else{
			$("#trade_info").attr('balance', data.data.balance);
			$("#settings_new_mail").val(data.data.mail);
			$('#settings_verify').html(option[data.data.verify]);

			if (data.data.balance == 1) {
				$("h3","#account_balance").html(data.data.realBalance + "₽");
				$("h6","#account_balance").html("РЕАЛЬНЫЙ");
				$("h3","#account_balance_change").html(data.data.demoBalance + "₽");
				$("h6","#account_balance_change").html("УЧЕБНЫЙ");
			}else{
				$("h3","#account_balance").html(data.data.demoBalance + "₽");
				$("h6","#account_balance").html("УЧЕБНЫЙ");
				$("h3","#account_balance_change").html(data.data.realBalance + "₽");
				$("h6","#account_balance_change").html("РЕАЛЬНЫЙ");
			}
			//let couples = data.data.couples.split(',');

			$("#trade_info").attr('couples', data.data.couples);
			$("#trade_info").attr('activecouples', data.data.couples.split(',')[0]);

			$("#history").html('');

			history(data.data);
			trade(data.data.couples.split(',')[0]);
			couples(data.couples, data.data.couples, 0);
		}
	});
}

function update() {
	let token = $("#trade_info").attr('token');
	var settings = {
		"async": true,
		"crossDomain": false,
		"url": "./php/terminal/get.userdata.php?update=0&token=" + token,
		"method": "GET",
	}
	$.ajax(settings).done(function (data) {
		if (data.result != 'Success') {
			window.location.replace("./index");
		}else{
			if (data.change == 1) {
				$("#trade_info").attr('balance', data.data.balance);
				$("#settings_new_mail").val(data.data.mail);
				$('#settings_verify').html(option[data.data.verify]);

				history(data.data);

				if (data.data.balance == 1) {
					$("h3","#account_balance").html(data.data.realBalance + "₽");
					$("h6","#account_balance").html("РЕАЛЬНЫЙ");
					$("h3","#account_balance_change").html(data.data.demoBalance + "₽");
					$("h6","#account_balance_change").html("УЧЕБНЫЙ");
				}else{
					$("h3","#account_balance").html(data.data.demoBalance + "₽");
					$("h6","#account_balance").html("УЧЕБНЫЙ");
					$("h3","#account_balance_change").html(data.data.realBalance + "₽");
					$("h6","#account_balance_change").html("РЕАЛЬНЫЙ");
				}

				$('#couples_blocks').html('');

				let c = data.data.couples.split(',');

				$("#trade_info").attr('couples', data.data.couples);
				let couplesActive = $("#trade_info").attr('activecouples');

				for (var i = 0; i < c.length; i++) {
					if (c[i] == couplesActive) {
						couples(data.couples, data.data.couples, i);
					}
					
				}
			}
		}
	});
}

$(document).ready(function() {
	start();
	setInterval(update,1000);
	$(window).resize(function() {
		let activecouples = $("#trade_info").attr('activecouples');
		trade(activecouples);
	});
});


$(document).on('click', '#couples', function() {
	$("#trade_info").attr('typecouples', 'update');
	let couplesActiveOld = $("#trade_info").attr('activecouples');
	let thisCouples = $('h6', this).html();
	if (thisCouples != $("#trade_info").attr('activecouples')) {
		let token = $("#trade_info").attr('token');
		var settings = {
			"async": true,
			"crossDomain": false,
			"url": "./php/terminal/get.userdata.php?update=1&token=" + token,
			"method": "GET",
		}
		$.ajax(settings).done(function (data) {
			if (data.result != 'Success') {
				window.location.replace("./index");
			}else{
				$("#trade_info").attr('balance', data.data.balance);
				$("#settings_new_mail").val(data.data.mail);
				$('#settings_verify').html(option[data.data.verify]);

				history(data.data);
				$('#couples_blocks').html('');
				if (data.data.balance == 1) {
					$("h3","#account_balance").html(data.data.realBalance + "₽");
					$("h6","#account_balance").html("РЕАЛЬНЫЙ");
					$("h3","#account_balance_change").html(data.data.demoBalance + "₽");
					$("h6","#account_balance_change").html("УЧЕБНЫЙ");
				}else{
					$("h3","#account_balance").html(data.data.demoBalance + "₽");
					$("h6","#account_balance").html("УЧЕБНЫЙ");
					$("h3","#account_balance_change").html(data.data.realBalance + "₽");
					$("h6","#account_balance_change").html("РЕАЛЬНЫЙ");
				}

				let c = data.data.couples.split(',');

				$("#trade_info").attr('couples', data.data.couples);
				let couplesActive = $("#trade_info").attr('activecouples');

				for (var i = 0; i < c.length; i++) {
					//alert(c[i] + ' | ' + thisCouples);
					if (c[i] == thisCouples) {
						trade(c[i]);
						$("#trade_info").attr('activecouples', c[i]);
						couples(data.couples, data.data.couples, i);
						
					}
				}
				
			}
		});
	}
	if (couplesActiveOld == thisCouples) {
		if($('#trade_couples_option').css('display') == 'none') {
			$("#trade_couples_option").removeAttr('style');
			$("#trade_couples_option").css('left', $(this).offset().left);
			$("#trade_couples_option").toggleClass('vis');
		}else{
			$("#trade_couples_option").removeClass('vis');
		}
	}
});


$(document).on('click', '#couples_plus', function() {
	$("#trade_info").attr('typecouples', 'new');
	if($('#trade_couples_option').css('display') == 'none') {
		$("#trade_couples_option").removeAttr('style');
		if ((($("#couples_plus").offset().left)-390) <= 0) {
			$("#trade_couples_option").css('left', 80);
		}else{
			$("#trade_couples_option").css('left', (($("#couples_plus").offset().left)-390));
		}
		//},50);
		$("#trade_couples_option").toggleClass('vis');
	}else{
		$("#trade_couples_option").removeClass('vis');
	}
});


$(document).on('click', '#trade_couples_once', function() {
	$("#trade_couples_option").removeClass('vis');

	let token = $("#trade_info").attr('token');
	let change = $('h6',this).html();
	let id = 0;
	let c = $("#trade_info").attr('couples').split(',');
	let couplesActive = $("#trade_info").attr('activecouples');

	for (var i = 0; i < c.length; i++) {
		if (c[i] == couplesActive) {
			id = i;
		}
	}
	$("#trade_info").attr('activecouples', change);
	var settings = {
		"async": true,
		"crossDomain": false,
		"url": "./php/terminal/save.couples.php?type=" + $("#trade_info").attr('typecouples') + "&couples=" + change + "&couples_id=" + id + "&token=" + token,
		"method": "GET",
	}
	$.ajax(settings).done(function (data) {
		update();
		//couples(data.couples, data.data.couples, id);
		trade(change);
	});

});


$(document).on('click', "#couples_delete", function() {
	let couplesDelete = $(this).attr('key');
	setTimeout(function () {
		$("#trade_couples_option").removeClass('vis');
		let c = $("#trade_info").attr('couples').split(',');
		let token = $("#trade_info").attr('token');
		let id = 0;
		$("#trade_info").attr('activecouples', c[0]);
		var settings = {
			"async": true,
			"crossDomain": false,
			"url": "./php/terminal/save.couples.php?type=delete&couples_id=" + couplesDelete + "&token=" + token,
			"method": "GET",
		}
		$.ajax(settings).done(function (data) {
			update();
		});
	},100);
	
});


$("#balance_change").click(function() {
	let token = $("#trade_info").attr('token');
	var settings = {
		"async": true,
		"crossDomain": false,
		"url": "./php/terminal/update.balance.type.php?token=" + token,
		"method": "GET",
	}
	$.ajax(settings).done(function (data) {
		$("#balance_change").hide(0);
		update();
	});
});


$("#settings_demo_button").click(function() {
	if ($("#trade_info").attr('balance') == 1) {
		let token = $("#trade_info").attr('token');
		var settings = {
			"async": true,
			"crossDomain": false,
			"url": "./php/terminal/update.balance.type.php?token=" + token,
			"method": "GET",
		}
		$.ajax(settings).done(function (data) {
			$("#balance_change").hide(0);
			update();
		});
	}
});

$("#settings_real_button").click(function() {
	if ($("#trade_info").attr('balance') == 0) {
		let token = $("#trade_info").attr('token');
		var settings = {
			"async": true,
			"crossDomain": false,
			"url": "./php/terminal/update.balance.type.php?token=" + token,
			"method": "GET",
		}
		$.ajax(settings).done(function (data) {
			update();
		});
	}
});

$("#settings_verify").click(function() {
	
});

$("#settings_mail").click(function() {
	let token = $("#trade_info").attr('token');
	let mail = $("#settings_new_mail").val();
	var settings = {
		"async": true,
		"crossDomain": false,
		"url": "./php/terminal/change.mail.php?mail=" + mail + "&token=" + token,
		"method": "GET",
	}
	$.ajax(settings).done(function (data) {
		if (data.result == 'Success') {
			update();
			$("#settings_new_mail").toggleClass("input_success");
			setTimeout(function() {
				$("#settings_new_mail").removeClass("input_success");
			},4000);
		}
		if (data.result == 'Error') {
			$("#settings_new_mail").toggleClass("input_error");
			setTimeout(function() {
				$("#settings_new_mail").removeClass("input_error");
			},4000);
		}
	});
});

$("#settings_password").click(function() {
	let token = $("#trade_info").attr('token');
	let oldpassword = $("#settings_old_password").val();
	let newpassword = $("#settings_new_password").val();
	let repeatpassword = $("#settings_new_password_repeat").val();
	var settings = {
		"async": true,
		"crossDomain": false,
		"url": "./php/terminal/change.password.php?oldpassword=" + oldpassword + "&newpassword=" + newpassword + "&repeatpassword=" + repeatpassword + "&token=" + token,
		"method": "GET",
	}
	$.ajax(settings).done(function (data) {
		if (data.result == 'Success') {
			$("#settings_old_password").toggleClass("input_success");
			$("#settings_new_password").toggleClass("input_success");
			$("#settings_new_password_repeat").toggleClass("input_success");

			$("#settings_old_password").val("");
			$("#settings_new_password").val("");
			$("#settings_new_password_repeat").val("");
			setTimeout(function() {
				$("#settings_old_password").removeClass("input_success");
				$("#settings_new_password").removeClass("input_success");
				$("#settings_new_password_repeat").removeClass("input_success");
			},4000);
		}
		if (data.result == 'Error') {
			$("#settings_old_password").toggleClass("input_error");
			$("#settings_new_password").toggleClass("input_error");
			$("#settings_new_password_repeat").toggleClass("input_error");

			$("#settings_old_password").val("");
			$("#settings_new_password").val("");
			$("#settings_new_password_repeat").val("");
			setTimeout(function() {
				$("#settings_old_password").removeClass("input_error");
				$("#settings_new_password").removeClass("input_error");
				$("#settings_new_password_repeat").removeClass("input_error");
			},4000);
		}
	});
});

$(document).on('click', "#history_block", function(){
	let token = $("#trade_info").attr('token');
	let key = $(this).attr("key");
	if (key != -1) {
		var settings = {
			"async": true,
			"crossDomain": false,
			"url": "./php/terminal/get.history.php?key=" + key + "&token=" + token,
			"method": "GET",
		}
		$.ajax(settings).done(function (data) {
			if (data.result == 'Success') {

				let result = {
					"lose": "Проигрыш",
					"win": "Победа"
				};

				let type = {
					"up": "Выше",
					"down": "Ниже"
				};

				let account = ['Учебный', 'Реальный'];

				let win = 0;
				if (data.data.status == 'win') {
					win = (parseInt(data.data.procent,10)/100 * parseInt(data.data.sum,10) + parseInt(data.data.sum,10)).toFixed(2);
				}

				$("#history_id_id").html("Опцион #" + data.data.id);
				$("#history_id_time").html("Конец времени: " + timeConverterFull(parseInt(data.data.time,10) + 60));
				$("#history_id_result").html("Результат: " + result[data.data.status]);
				$("#history_id_sum").html("Сумма сделки: " + data.data.sum + "₽");
				$("#history_id_procent").html("Доходность: " + data.data.procent + "%");
				$("#history_id_result_sum").html("Выплата: " + win + "₽");
				$("#history_id_type").html("Тип сделки: " + type[data.data.type]);
				$("#history_id_price").html("Начало сделки: " + data.data.price);
				$("#history_id_endprice").html("Конец сделки: " + data.data.endprice);
				$("#history_id_account").html("Тип аккаунта: " + account[data.data.account]);

				$("#background").toggleClass('vis');
				$("#history_id").toggleClass('vis');
			}
		});
	}
});