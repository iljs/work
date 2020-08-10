function custom1(data,interval){;
	$('#panel-2').load('./samples/custom1.html', function() {
		let intervalSplit = interval.split('-');

		let startDayInput = intervalSplit[0].trim();
		startDayInput = dateReverseUs(startDayInput);

		let endDayInput = intervalSplit[1].trim();
		endDayInput = dateReverseUs(endDayInput);

		$("#custom-1_menu_custom_interval_start").val(startDayInput);
		$("#custom-1_menu_custom_interval_end").val(endDayInput);

		$("#custom-1_wallets").append('<h4>' + interval + '</h4>');

		let keys = Object.keys(data.table);

		let allBalance = 0;
		let allBalanceLast = 0;

		for (var i = 0; i < keys.length; i++) {
			allBalance += parseInt(data.table[keys[i]].balance, 10);
			allBalanceLast += parseInt(data.table[keys[i]].balanceLast, 10);
		}

		$("#custom-1_wallets").append('\
				<div id="custom-1_wallet_block" class="default_block">\
					<div id="custom-1_wallet_main">\
						<div id="custom-1_wallet_main_left" key="0">\
							<h2>Итого</h2>\
						</div>\
						<div id="custom-1_wallet_main_right">\
							<h3>' + shorterInt(allBalance) + '</h3>\
							<p>' + shorterInt(allBalanceLast) + '</p>\
						</div>\
					</div>\
				</div>\
			');

		for (var i = 0; i < keys.length; i++) {
			let change = parseInt(data.table[keys[i]].balance, 10) - parseInt(data.table[keys[i]].balanceLast, 10);
			let color = 'green';
			let persent = (parseInt(data.table[keys[i]].balance, 10) - parseInt(data.table[keys[i]].balanceLast, 10)) / (parseInt(data.table[keys[i]].balance, 10) / 100);
			if (change < 0) {
				color = 'red';
			}
			$("#custom-1_wallets").append('\
				<div id="custom-1_wallet_block" class="default_block">\
					<div id="custom-1_wallet_main">\
						<div id="custom-1_wallet_main_left" key="' + data.table[keys[i]].name + '">\
							<h2>' + shorter(data.table[keys[i]].nameAll) + '</h2>\
						</div>\
						<div id="custom-1_wallet_main_right">\
							<h3>' + shorterInt(data.table[keys[i]].balance) + '</h3>\
							<p>' + shorterInt(data.table[keys[i]].balanceLast) + '</p>\
						</div>\
					</div>\
					<div id="custom-1_wallet_history" class="wallet_' + data.table[keys[i]].name + '"></div>\
				</div>\
			');
		}

		if (data.history !== null) {
		    for (var i = data.history.id.length - 1; i >= 0; i--) {
		    	let color = 'green';
				if (parseInt(data.history.sum[i], 10) < 0) {
					color = 'red';
				}

				$(".wallet_" + data.history.wallet[i]).append('\
					<div id="custom-1_history_block" key="' + data.history.id[i] + '" class="default_block">\
					    <div id="custom-1_history_block_header" class="default_block_header">\
	        	           <p>' + data.history.date[i] + '</p>\
	        	           <img src="./img/svg/next.svg" height="7">\
	        	        </div>\
						<h2>' + shorter(data.history.contractor[i]) + '</h2>\
						<h3 style="color: ' + color + ';">' + shorterInt(data.history.sum[i]) + '</h3>\
					</div>'
				);
		    }
		}

		if (data.contractor) {
			for (var i = data.contractor.length - 1; i >= 0; i--) {
				$('#custom-1_menu_sort_agent').append('\
					<option>' + data.contractor[i] + '</option>\
				');
			}
		}

		if (data.orderType) {
			for (var i = data.orderType.length - 1; i >= 0; i--) {
				$('#custom-1_menu_sort_type').append('\
					<option>' + data.orderType[i] + '</option>\
				');
			}
		}
	});
}

$(document).on("click", "#custom-1_menu_left", function() {
	let dateStartArray = $("#user_info").attr('start_time').split('.');
	let dateEndArray = $("#user_info").attr('end_time').split('.');

	var dateStartX = new Date(dateStartArray[2], (parseInt(dateStartArray[1], 10) - 1), dateStartArray[0]);
	var dateEndX = new Date(dateEndArray[2], (parseInt(dateEndArray[1], 10) - 1), dateEndArray[0]);

	let interval = $("#user_info").attr('interval');

	let dateStart = '';
	let dateEnd = '';

	if (interval == 'month') {
		dateStart = monthStart('previous');
		dateEnd = monthEnd('previous');
	}else{
		interval = parseInt($("#user_info").attr('interval'), 10);
		dateStart = minesDays(dateStartX, interval);
		dateEnd = minesDays(dateEndX, interval);
	}

	$("#user_info").attr('start_time', dateStart);
	$("#user_info").attr('end_time', dateEnd);

	let key = $("#user_info").attr('table');
	let token = $("#user_info").attr('token');
	let start = dateStart;
	let end = dateEnd;

	let intervalDate = dateStart + " - " + dateEnd;
	let optionParams = "";

	let selectAgent = $("#user_info").attr('p3');
	let selectOrderType = $("#user_info").attr('p4');

	if(selectAgent !== ""){
		optionParams = "&p3=" + selectAgent;
	}

	if(selectOrderType !== ""){
		optionParams = "&p4=" + selectOrderType;
	}

	if((selectOrderType !== "") && (selectAgent !== "")){
		optionParams = "&p3=" + selectAgent + "&p4=" + selectOrderType;
	}

	ajax(("token=" + token + "&table=" + key + "&p1=" + start + "&p2=" + end + optionParams), intervalDate);
});

$(document).on("click", "#custom-1_menu_right", function() {
	let dateStartArray = $("#user_info").attr('start_time').split('.');
	let dateEndArray = $("#user_info").attr('end_time').split('.');

	var dateStartX = new Date(dateStartArray[2], (parseInt(dateStartArray[1], 10) - 1), dateStartArray[0]);
	var dateEndX = new Date(dateEndArray[2], (parseInt(dateEndArray[1], 10) - 1), dateEndArray[0]);

	let interval = $("#user_info").attr('interval');

	let dateStart = '';
	let dateEnd = '';

	if (interval == 'month') {
		dateStart = monthStart('next');
		dateEnd = monthEnd('next');
	}else{
		interval = parseInt($("#user_info").attr('interval'), 10);
		dateStart = plusDays(dateStartX, interval);
		dateEnd = plusDays(dateEndX, interval);
	}

	$("#user_info").attr('start_time', dateStart);
	$("#user_info").attr('end_time', dateEnd);

	let key = $("#user_info").attr('table');
	let token = $("#user_info").attr('token');
	let start = dateStart;
	let end = dateEnd;

	let intervalDate = dateStart + " - " + dateEnd;
	let optionParams = "";

	let selectAgent = $("#user_info").attr('p3');
	let selectOrderType = $("#user_info").attr('p4');

	if(selectAgent !== ""){
		optionParams = "&p3=" + selectAgent;
	}

	if(selectOrderType !== ""){
		optionParams = "&p4=" + selectOrderType;
	}

	if((selectOrderType !== "") && (selectAgent !== "")){
		optionParams = "&p3=" + selectAgent + "&p4=" + selectOrderType;
	}

	ajax(("token=" + token + "&table=" + key + "&p1=" + start + "&p2=" + end + optionParams), intervalDate);
});

$(document).on("click", "#custom-1_menu_setting", function() {
	if ($(window).width() <= 780) {
		if ($("#custom-1_menu_all").css('bottom') == '0px') {
			$("#custom-1_menu_main").animate({
				bottom: 0
			},400);
			$("#custom-1_menu_all").animate({
				bottom: -150
			},400);
		}else{
			$("#custom-1_menu_main").animate({
				bottom: 150
			},400);
			$("#custom-1_menu_all").animate({
				bottom: 0
			},400);
		}
	}

	if ($(window).width() > 780) {
		if ($("#custom-1_menu_all").css('bottom') == ($(window).height()/2 - 400) + "px") {
			$("#custom-1_menu_main").animate({
				bottom: $(window).height()/2 - 400
			},0);
			$("#custom-1_menu_all").animate({
				bottom: -150
			},0);
		}else{
			$("#custom-1_menu_main").animate({
				bottom: $(window).height()/2 - 250
			},0);
			$("#custom-1_menu_all").animate({
				bottom: $(window).height()/2 - 400
			},0);
		}
	}
});

$(document).on("click", "#custom-1_menu_interval", function() {
	let key = $(this).attr('key').toString();

	if (key == 'day') {
		let start = timeDate();
		let end = timeDate();

		let intervalDate = start + " - " + end;

		$("#user_info").attr('start_time', start);
		$("#user_info").attr('end_time', end);
		$("#user_info").attr('interval', 1);

		let key = $("#user_info").attr('table');
		let token = $("#user_info").attr('token');

		let optionParams = "";

		let selectAgent = $("#user_info").attr('p3');
		let selectOrderType = $("#user_info").attr('p4');

		if(selectAgent !== ""){
			optionParams = "&p3=" + selectAgent;
		}

		if(selectOrderType !== ""){
			optionParams = "&p4=" + selectOrderType;
		}

		if((selectOrderType !== "") && (selectAgent !== "")){
			optionParams = "&p3=" + selectAgent + "&p4=" + selectOrderType;
		}

		ajax(("token=" + token + "&table=" + key + "&p1=" + start + "&p2=" + end + optionParams), intervalDate);
	}

	if (key == 'week') {
		let start = weekStart();
		let end = weekEnd();

		let intervalDate = start + " - " + end;

		$("#user_info").attr('start_time', start);
		$("#user_info").attr('end_time', end);
		$("#user_info").attr('interval', 7);

		let key = $("#user_info").attr('table');
		let token = $("#user_info").attr('token');

		let optionParams = "";

		let selectAgent = $("#user_info").attr('p3');
		let selectOrderType = $("#user_info").attr('p4');

		if(selectAgent !== ""){
			optionParams = "&p3=" + selectAgent;
		}

		if(selectOrderType !== ""){
			optionParams = "&p4=" + selectOrderType;
		}

		if((selectOrderType !== "") && (selectAgent !== "")){
			optionParams = "&p3=" + selectAgent + "&p4=" + selectOrderType;
		}

		ajax(("token=" + token + "&table=" + key + "&p1=" + start + "&p2=" + end + optionParams), intervalDate);
	}

	if (key == 'month') {
		let start = monthStart('now');
		let end = monthEnd('now');

		let intervalDate = start + " - " + end;

		$("#user_info").attr('start_time', start);
		$("#user_info").attr('end_time', end);
		$("#user_info").attr('interval', 'month');

		let key = $("#user_info").attr('table');
		let token = $("#user_info").attr('token');

		let optionParams = "";

		let selectAgent = $("#user_info").attr('p3');
		let selectOrderType = $("#user_info").attr('p4');

		if(selectAgent !== ""){
			optionParams = "&p3=" + selectAgent;
		}

		if(selectOrderType !== ""){
			optionParams = "&p4=" + selectOrderType;
		}

		if((selectOrderType !== "") && (selectAgent !== "")){
			optionParams = "&p3=" + selectAgent + "&p4=" + selectOrderType;
		}

		ajax(("token=" + token + "&table=" + key + "&p1=" + start + "&p2=" + end + optionParams), intervalDate);
	}
});


$(document).on("click", "#custom-1_menu_custom_button", function() {
	let startInput = $("#custom-1_menu_custom_interval_start").val();
	let endInput = $("#custom-1_menu_custom_interval_end").val();
	let selectAgent = $("#custom-1_menu_sort_agent").val();
	let selectOrderType = $("#custom-1_menu_sort_type").val();

	let start = dateReverseEuro(startInput);
	let end = dateReverseEuro(endInput);

	startDate = start.split('.');
	endDate = end.split('.');

	var date1 = new Date(startDate[2], startDate[1], startDate[0]);
	var date2 = new Date(endDate[2], endDate[1], endDate[0]);
	var daysLag = Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));

	let intervalDate = start + " - " + end;

	let startLast = $("#user_info").attr('start_time');
	let endLast = $("#user_info").attr('end_time');

	if ((startLast == start) && (endLast == end)) {
	}else{
		$("#user_info").attr('start_time', start);
		$("#user_info").attr('end_time', end);
		$("#user_info").attr('interval', (daysLag + 1));
	}

	let key = $("#user_info").attr('table');
	let token = $("#user_info").attr('token');

	let optionParams = "";

	$("#user_info").attr('p3', "");
	$("#user_info").attr('p4', "");

	if(selectAgent !== null){
		optionParams = "&p3=" + selectAgent;
		$("#user_info").attr('p3', selectAgent);
	}

	if(selectOrderType !== null){
		optionParams = "&p4=" + selectOrderType;
		$("#user_info").attr('p4', selectOrderType);
	}

	if((selectOrderType !== null) && (selectAgent !== null)){
		optionParams = "&p3=" + selectAgent + "&p4=" + selectOrderType;
		$("#user_info").attr('p3', selectAgent);
		$("#user_info").attr('p4', selectOrderType);
	}

	ajax(("token=" + token + "&table=" + key + "&p1=" + start + "&p2=" + end + optionParams), intervalDate);
});

$(document).on("click", "#custom-1_history_block", function() {
	let table = $("#user_info").attr('table');
	let token = $("#user_info").attr('token');
	let key = $(this).attr('key');

	var settings = {
		"async": true,
		"crossDomain": false,
		"url": "./php/tables.data/custom-1.data.php?token=" + token + "&table=" + table + "&id=" + key,
		"method": "GET"
	}
	$.ajax(settings).done(function (data) {
		if(data.result == 'Success'){
			$("#panel-3").show();
			$("#panel-2").animate({
				left: '-50%',
				opacity: 0
			},700);
			$("#panel-3").animate({
				left: 0,
				opacity: 1
			},700);
			setTimeout(function(){
				$("#panel-2").hide();
			},700);
			$('#panel-3').load('./samples/custom1.1.html', function() {
				$("#custom-1_text_reg").html(data.data.reg);
				$("#custom-1_text_contractor").html(data.data.contractor);
				$("#custom-1_text_type").html(data.data.type);
				$("#custom-1_text_sum").html(data.data.sum);
				$("#custom-1_text_wallet").html(data.data.wallet);
				$("#custom-1_text_date").html(data.data.date);
			});
		}
	});
});

$(document).on("click", "#cancel_panel-3", function(){
	$("#panel-2").show();
	$("#panel-3").animate({
		left: '100%',
		opacity: 0
	},700);
	$("#panel-2").animate({
		left: 0,
		opacity: 1
	},700);
	setTimeout(function(){
		$("#panel-3").hide();
	},700);
});

$(document).on("click","#custom-1_wallet_main_right",function(){
	let position = $(this).offset();

	$("#custom-1_hint").css('top', (position.top - 13));
	$("#custom-1_hint").css('left', (position.left - $("#custom-1_hint").width() - 30));

	$("#custom-1_hint").show();
	$("#custom-1_hint").animate({
		opacity: 1
	},300);

	setTimeout(function(){
		$("#custom-1_hint").animate({
			opacity: 0
		},300);
		setTimeout(function(){
			$("#custom-1_hint").hide();
		}, 300);
	},5000);
});

$("#panel-2").scroll(function () {
	$("#custom-1_hint").hide();
});

$(document).on("click", "#custom-1_wallet_main_left", function() {
	let key = parseInt($(this).attr('key'),10);
	if (key != 0) {
		if ($(".wallet_" + key).css('display') != 'none') {
			$(".wallet_" + key).animate({
				height: 0
			},600);
			setTimeout(function() {
				$(".wallet_" + key).hide();
			},600);
		}else{
			let len = $('.wallet_' + key + ' #custom-1_history_block').length;
			$(".wallet_" + key).show();
			$(".wallet_" + key).animate({
				height: 58 * len
			},600);
		}
	}
});