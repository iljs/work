function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function height() {
	$('#sidebar').css({
        height: ($(window).height()-80) + 'px'
    });
    $('#widget').css({
        height: ($(window).height()-80) + 'px'
    });

    $('#optionbar').css({
        height: ($(window).height()-80) + 'px'
    });

    $('#history').css({
        height: ($(window).height()-80) + 'px'
    });

    $('#background').css({
        height: $(window).height() + 'px'
    });

}

function tradeTime() {
	var CurrentTime = new Date();
	CurrentTime.setMinutes(CurrentTime.getMinutes() + (parseInt($("#trade_info").attr('tradetime'), 10) + 1));
	$("#trade_time_select").html(CurrentTime.getHours()+":"+CurrentTime.getMinutes().toString().padStart(2,0));

	var CurrentTime = new Date();
	CurrentTime.setMinutes(CurrentTime.getMinutes() + 2);
	$("#trade_time_option_minute1").html(CurrentTime.getHours()+":"+CurrentTime.getMinutes().toString().padStart(2,0));

	CurrentTime.setMinutes(CurrentTime.getMinutes() + 1);
	$("#trade_time_option_minute2").html(CurrentTime.getHours()+":"+CurrentTime.getMinutes().toString().padStart(2,0));

	CurrentTime.setMinutes(CurrentTime.getMinutes() + 1);
	$("#trade_time_option_minute3").html(CurrentTime.getHours()+":"+CurrentTime.getMinutes().toString().padStart(2,0));

	CurrentTime.setMinutes(CurrentTime.getMinutes() + 2);
	$("#trade_time_option_minute5").html(CurrentTime.getHours()+":"+CurrentTime.getMinutes().toString().padStart(2,0));

	CurrentTime.setMinutes(CurrentTime.getMinutes() + 5);
	$("#trade_time_option_minute10").html(CurrentTime.getHours()+":"+CurrentTime.getMinutes().toString().padStart(2,0));
}


function tradeBet() {
	$("#trade_bet_select").html($("#trade_info").attr('tradebet'));
	$("#trade_bet_option_input").val($("#trade_info").attr('tradebet'));
}


function check() {
	let token = getCookie('fulltrade');
	if (token != undefined) {
			$("#trade_info").attr('token', token);
			var settings = {
				"async": true,
				"crossDomain": false,
				"url": "./php/terminal/check.token.php?token=" + token,
				"method": "GET",
			}
			$.ajax(settings).done(function (data) {
				if (data.result != 'Success') {
					window.location.replace("./index");
				}
			});
	}else{
		window.location.replace("./index");
	}
}

function withrdraw(key, sum) {
	if (key == "card") {
		$("#wallet_withdraw_way_result").html(((sum-80)*0.97).toFixed(2));
	}
	if (key == "yandex") {
		$("#wallet_withdraw_way_result").html((sum*0.97).toFixed(2));
	}
	if (key == "qiwi") {
		$("#wallet_withdraw_way_result").html((sum*0.97).toFixed(2));
	}
}


$(window).ready(function() {
	check();
	tradeBet();

	date = new Date();
    var day = date.getDay();

    if ((day == 0) || (day == 6)) {
    	alert("Биржа работает с понедельника по пятницу. На данный момент торги закрыты!");
    }

	let key = $("#trade_info").attr('withrdraw');
	let sum = parseInt($("#wallet_withdraw_way_input").val(), 10);
	withrdraw(key, sum);
	

	height();
	$(window).resize(height);

	setInterval(function() {
		tradeTime();
	},1000);
});

$("#trade_time").click(function() {
	if($('#trade_time_option').css('opacity') == 0) {
		$("#trade_time_option").fadeTo(200,1);
		$("#trade_bet_option").fadeTo(100,0);
		$("#trade_bet_option").css('z-index', 19);
		$("#trade_time_option").css('z-index', 20);
	}else{
		$("#trade_time_option").fadeTo(200,0);
	}
});

$("#time_plus").click(function() {
	var tradetime = parseInt($("#trade_info").attr('tradetime'), 10);
	if (tradetime != 300) {
		$("#trade_info").attr('tradetime', tradetime+1);
		tradeTime();
	}
});

$("#time_mines").click(function() {
	var tradetime = parseInt($("#trade_info").attr('tradetime'), 10);
	if (tradetime != 1) {
		$("#trade_info").attr('tradetime', tradetime-1);
		tradeTime();
	}
});

$(document).on('click',"#trade_time_option_block", function(){
	var key = parseInt($(this).attr('key'), 10);
	if (key >= 1) {
		$("#trade_info").attr('tradetime', key);
		tradeTime();
		$("#trade_time_option").fadeTo(200,0);
	}
});



$("#trade_bet").click(function() {
	if($('#trade_bet_option').css('opacity') == 0) {
		$("#trade_bet_option").fadeTo(200,1);
		$("#trade_time_option").fadeTo(100,0);
		$("#trade_bet_option_input").focus();
		$("#trade_bet_option").css('z-index', 20);
		$("#trade_time_option").css('z-index', 19);
	}else{
		$("#trade_bet_option").fadeTo(200,0);
	}
});

$("#bet_plus").click(function() {
	var tradebet = parseInt($("#trade_info").attr('tradebet'), 10);
	if (tradebet != 50000) {
		$("#trade_info").attr('tradebet', tradebet+10);
		tradeBet();

		let profit = (parseInt($("#trade_info").attr('procent'),10)/100 * (tradebet+10) + (tradebet+10)).toFixed(2);
		$('h6','#result').html(profit + "₽");
	}
});

$("#bet_mines").click(function() {
	var tradebet = parseInt($("#trade_info").attr('tradebet'), 10);
	if (tradebet != 60) {
		$("#trade_info").attr('tradebet', tradebet-10);
		tradeBet();

		let profit = (parseInt($("#trade_info").attr('procent'),10)/100 * (tradebet-10) + (tradebet-10)).toFixed(2);
		$('h6','#result').html(profit + "₽");
	}
});

$("#trade_bet_option_input").keyup(function(e){
	if ($(this).val() >= 60) {
		$("#trade_info").attr('tradebet', $(this).val());
		tradeBet();

		let profit = (parseInt($("#trade_info").attr('procent'),10)/100 * parseInt($(this).val(),10) + parseInt($(this).val(),10)).toFixed(2);
		$('h6','#result').html(profit + "₽");
	}
	if (e.which == 13) {
		$("#trade_bet_option").fadeTo(200,0);
	}
});

$(document).on('click',"#trade_bet_option_block", function(){
	var bet = parseInt($('p', this).html(), 10);
	if (bet >= 60) {
		$("#trade_info").attr('tradebet', bet);

		let profit = (parseInt($("#trade_info").attr('procent'),10)/100 * parseInt(bet,10) + parseInt(bet,10)).toFixed(2);
		$('h6','#result').html(profit + "₽");

		tradeBet();
		$("#trade_bet_option").fadeTo(200,0);
	}
});


$("#trade_couples_option_cancel").click(function() {
	$("#trade_couples_option").removeClass('vis');
});

$(document).on("click", "#button_m", function() {
	$("#background").removeClass('vis');
	$("#message").removeClass('vis');
	$("#error").removeClass('vis');
	$("#success").removeClass('vis');
	$("#help").removeClass('vis');
	$("#verify").removeClass('vis');
});

$(".button_history").click(function() {
	if($('#history').css('display') == 'none') {
		$("#optionbar").animate({left: "80px"}, 300);
		setTimeout(function() {
			$("#history").show(100);
		},200);
	}else{
		$("#optionbar").animate({left: "-350px"}, 300);
		$("#history").hide(100);
	}
});

$("#optionbar_exit").click(function() {
	$("#optionbar").animate({left: "-350px"}, 300);
		$("#history").hide(100);
});

$("#account_balance").click(function() {
	if($('#balance_change').css('display') == 'none') {
		$("#balance_change").show(0);
	}else{
		$("#balance_change").hide(0);
	}
});


$("#background").click(function() {
	$("#message").removeClass('vis');
	$("#background").removeClass('vis');
	$("#settings").removeClass('vis');
	$("#help").removeClass('vis');
	$("#history_id").removeClass('vis');
	$("#verify").removeClass('vis');
	$("#wallet").removeClass('vis');
});

$("img","#settings_header").click(function() {
	$("#background").removeClass('vis');
	$("#settings").removeClass('vis');
});

$("img","#history_id_header").click(function() {
	$("#background").removeClass('vis');
	$("#history_id").removeClass('vis');
});


$(".button_settings").click(function() {
	$("#background").toggleClass('vis');
	$("#settings").toggleClass('vis');
});

$(".button_help").click(function() {
	window.location.replace("./help/index");
});

$(".button_ref").click(function() {
	window.location.replace("./affiliate");
});

$(".button_window_help").click(function() {
	$("#message").toggleClass('vis');
	$("#help").toggleClass('vis');
	$("#background").toggleClass('vis');
});

$("#settings_exit").click(function() {
	$.removeCookie('fulltrade');
	window.location.replace("./index");
});

$("#settings_verify").click(function() {
	if ($(this).html() == 'Подтвердить' ) {
		$("#settings").removeClass('vis');
		$("#message").toggleClass('vis');
		$("#verify").toggleClass('vis');
	}
});

$(".button_wallet").click(function() {
	$("#wallet").toggleClass('vis');
	$("#background").toggleClass('vis');
});

$("#account_button_plus").click(function() {
	$("#wallet").toggleClass('vis');
	$("#background").toggleClass('vis');
});

$("#wallet_button_withdraw").click(function() {
	if ($(this).attr('class') != 'wallet_button wallet_active' ) {
		let token = $("#trade_info").attr('token');
		var settings = {
			"async": true,
			"crossDomain": false,
			"url": "./php/terminal/get.withdraw.php?token=" + token,
			"method": "GET",
		}
		$.ajax(settings).done(function (data) {
			$("#wallet_withdraw").toggleClass('wallet_block_vis');
			$("#wallet_button_withdraw").toggleClass('wallet_active');
			$("#wallet_deposit").removeClass('wallet_block_vis');
			$("#wallet_button_deposit").removeClass('wallet_active');

			$("#wallet_withdraw_pay").removeClass('wallet_withdraw_block_vis');
			$("#wallet_withdraw_verify").removeClass('wallet_withdraw_block_vis');
			$("#wallet_withdraw_form").removeClass('wallet_withdraw_block_vis');

			if (data.result == 'Success') {
				if (data.message == 'NoPay') {
					$("#wallet_withdraw_pay").toggleClass('wallet_withdraw_block_vis');
					$("#wallet_withdraw_verify").removeClass('wallet_withdraw_block_vis');
					$("#wallet_withdraw_form").removeClass('wallet_withdraw_block_vis');
				}
				if (data.message == 'NoVerify') {
					$("#wallet_withdraw_pay").removeClass('wallet_withdraw_block_vis');
					$("#wallet_withdraw_verify").toggleClass('wallet_withdraw_block_vis');
					$("#wallet_withdraw_form").removeClass('wallet_withdraw_block_vis');
				}
				if (data.message == 'Form') {
					$("#wallet_withdraw_pay").removeClass('wallet_withdraw_block_vis');
					$("#wallet_withdraw_verify").removeClass('wallet_withdraw_block_vis');
					$("#wallet_withdraw_form").toggleClass('wallet_withdraw_block_vis');
				}
			}
		});	
	}
});

$("#wallet_button_deposit").click(function() {
	if ($(this).attr('class') != 'wallet_button wallet_active' ) {
		$("#wallet_withdraw").removeClass('wallet_block_vis');
		$("#wallet_button_withdraw").removeClass('wallet_active');
		$("#wallet_deposit").toggleClass('wallet_block_vis');
		$("#wallet_button_deposit").toggleClass('wallet_active');
	}
});

$(document).on("click", "#wallet_withdraw_way_block",function(){
	$("#wallet_withdraw_way_block[key='card']").removeClass('active');
	$("#wallet_withdraw_way_block[key='qiwi']").removeClass('active');
	$("#wallet_withdraw_way_block[key='yandex']").removeClass('active');

	let key = $(this).attr('key');
	if (key == "card") {
		$("#trade_info").attr('withrdraw', 'card');

		$("#wallet_withdraw_way_block[key='card']").toggleClass('active');
		$("#wallet_withdraw_way_block[key='qiwi']").removeClass('active');
		$("#wallet_withdraw_way_block[key='other']").removeClass('active');
		$("#wallet_withdraw_way_block[key='yandex']").removeClass('active');

		$("#wallet_withdraw_way_commision").html("Коммисия 80 рублей + 3%");
	}

	if (key == "qiwi") {
		$("#trade_info").attr('withrdraw', 'qiwi');
		
		$("#wallet_withdraw_way_block[key='card']").removeClass('active');
		$("#wallet_withdraw_way_block[key='qiwi']").toggleClass('active');
		$("#wallet_withdraw_way_block[key='other']").removeClass('active');
		$("#wallet_withdraw_way_block[key='yandex']").removeClass('active');

		$("#wallet_withdraw_way_commision").html("Коммисия 3%");
	}

	if (key == "yandex") {
		$("#trade_info").attr('withrdraw', 'yandex');
		
		$("#wallet_withdraw_way_block[key='card']").removeClass('active');
		$("#wallet_withdraw_way_block[key='qiwi']").removeClass('active');
		$("#wallet_withdraw_way_block[key='other']").removeClass('active');
		$("#wallet_withdraw_way_block[key='yandex']").toggleClass('active');

		$("#wallet_withdraw_way_commision").html("Коммисия 3%");
	}
	
	if (key == "other") {
		$("#trade_info").attr('withrdraw', 'other');
		
		$("#wallet_withdraw_way_block[key='card']").removeClass('active');
		$("#wallet_withdraw_way_block[key='qiwi']").removeClass('active');
		$("#wallet_withdraw_way_block[key='yandex']").removeClass('active');
		$("#wallet_withdraw_way_block[key='other']").toggleClass('active');

		$("#wallet_withdraw_way_commision").html("");
	}

	if ($("#wallet_withdraw_way_input").val() >= 500) {
		if ($("#wallet_withdraw_way_input").val() <= 25000) {
			let sum = parseInt($("#wallet_withdraw_way_input").val(), 10);
			withrdraw(key, sum);
		}
	}
});

$("#wallet_withdraw_way_input").keyup(function(e){
	let key = $("#trade_info").attr('withrdraw');
	if ($(this).val() >= 500) {
		if ($(this).val() <= 25000) {
			let sum = parseInt($(this).val(), 10);
			withrdraw(key, sum);
		}
	}
});

$("#wallet_withdraw_way_button").click(function(){
	if ($("#wallet_withdraw_way_input").val() >= 500) {
		if ($("#wallet_withdraw_way_input").val() <= 25000) {
			$("#wallet_withdraw_form").removeClass('wallet_withdraw_block_vis');
			$("#wallet_withdraw_result").toggleClass('wallet_withdraw_block_vis');

			let key = $("#trade_info").attr('withrdraw');
			let sum = parseInt($("#wallet_withdraw_way_input").val(), 10);
			let token = $("#trade_info").attr('token');
			let data = $("#wallet_withdraw_data_input").val();
			
			if(key != 'other'){
    			var settings = {
    				"async": true,
    				"crossDomain": false,
    				"url": "./php/terminal/new.withdraw.php?key=" + key + "&sum=" + sum + "&token=" + token + "&data=" + data,
    				"method": "GET",
    			}
    			$.ajax(settings).done(function (data) {
    				if (data.result == 'Success') {
    					$("#wallet_withdraw_result_ok").toggleClass('vis');
    					setTimeout(function() {
    						$("#wallet_withdraw_form").toggleClass('wallet_withdraw_block_vis');
    						$("#wallet_withdraw_result_ok").removeClass('vis');
    						$("#wallet_withdraw_result").removeClass('wallet_withdraw_block_vis');
    					}, 2000);
    				}
    				if (data.result == 'Error') {
    					$("#wallet_withdraw_result_error").toggleClass('vis');
    					setTimeout(function() {
    						$("#wallet_withdraw_form").toggleClass('wallet_withdraw_block_vis');
    						$("#wallet_withdraw_result_error").removeClass('vis');
    						$("#wallet_withdraw_result").removeClass('wallet_withdraw_block_vis');
    					}, 2000);
    				}
    			});
			}
		}
	}
});

$("#wallet_deposit_way_button").click(function(){
	if ($("#wallet_deposit_way_input").val() >= 500) {
		if ($("#wallet_deposit_way_input").val() <= 25000) {
		    let key = $("#trade_info").attr('withrdraw');
			let token = $("#trade_info").attr('token');
			window.location.replace("./payment/redirect.php?token=" + token + "&sum=" + $("#wallet_deposit_way_input").val() + "&key=" + key);
		}
	}
});