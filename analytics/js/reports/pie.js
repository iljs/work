function pie(data,interval){;
	$('#panel-2').load('./samples/pie.html', function() {
		let intervalSplit = interval.split('-');

		let startDayInput = intervalSplit[0].trim();
		startDayInput = dateReverseUs(startDayInput);

		let endDayInput = intervalSplit[1].trim();
		endDayInput = dateReverseUs(endDayInput);

		$("#pie_menu_custom_interval_start").val(startDayInput);
		$("#pie_menu_custom_interval_end").val(endDayInput);

		$("h4","#pie").html(interval);

		let keys = Object.keys(data.table);

		let namesArray = [];
		let valuesArray = [];

		for (var i = 0; i < keys.length; i++) {
			namesArray[i] = data.table[keys[i]].name;
			valuesArray[i] = data.table[keys[i]].value;
		}

		console.log(namesArray);
		console.log(valuesArray);

		var chart = new Chart('pie_main_canvas', {
		    type: 'doughnut',
		    data: {
		    	labels: namesArray,
		    	datasets: [{
		        	data: valuesArray,

		    	}]
			},
		    options: {
		    	responsive: true,
                maintainAspectRatio: false,
			    elements: {
			        arc: {
			            backgroundColor: [
							'rgba(205,92,92, 0.5)',
							'rgba(255,215,0, 0.5)',
							'rgba(50,205,50, 0.5)',
							'rgba(0,255,255, 0.5)',
							'rgba(46,139,87, 0.5)',
							'rgba(255,0,255, 0.5)',
							'rgba(255,140,0, 0.5)',
							'rgba(205,92,92, 0.5)',
							'rgba(255,215,0, 0.5)',
							'rgba(50,205,50, 0.5)',
							'rgba(0,255,255, 0.5)',
							'rgba(46,139,87, 0.5)',
							'rgba(255,0,255, 0.5)',
							'rgba(255,140,0, 0.5)',
							'rgba(205,92,92, 0.5)',
							'rgba(255,215,0, 0.5)',
							'rgba(50,205,50, 0.5)',
							'rgba(0,255,255, 0.5)',
							'rgba(46,139,87, 0.5)',
							'rgba(255,0,255, 0.5)',
							'rgba(255,140,0, 0.5)',
						],
			            hoverBackgroundColor: [
							'rgba(205,92,92, 1)',
							'rgba(255,215,0, 1)',
							'rgba(50,205,50, 1)',
							'rgba(0,255,255, 1)',
							'rgba(46,139,87, 1)',
							'rgba(255,0,255, 1)',
							'rgba(255,140,0, 1)',
							'rgba(205,92,92, 1)',
							'rgba(255,215,0, 1)',
							'rgba(50,205,50, 1)',
							'rgba(0,255,255, 1)',
							'rgba(46,139,87, 1)',
							'rgba(255,0,255, 1)',
							'rgba(255,140,0, 1)',
							'rgba(205,92,92, 1)',
							'rgba(255,215,0, 1)',
							'rgba(50,205,50, 1)',
							'rgba(0,255,255, 1)',
							'rgba(46,139,87, 1)',
							'rgba(255,0,255, 1)',
							'rgba(255,140,0, 1)',
						],
			            borderColor: '#131722'
			        }
			    }
			}
		});
	});
}

$(document).on("click", "#pie_menu_left", function() {
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

	ajax(("token=" + token + "&table=" + key + "&p1=" + start + "&p2=" + end), intervalDate);
});

$(document).on("click", "#pie_menu_right", function() {
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

	ajax(("token=" + token + "&table=" + key + "&p1=" + start + "&p2=" + end), intervalDate);
});

$(document).on("click", "#pie_menu_setting", function() {
	if ($(window).width() <= 780) {
		if ($("#pie_menu_all").css('bottom') == '0px') {
			$("#pie_menu_main").animate({
				bottom: 0
			},400);
			$("#pie_menu_all").animate({
				bottom: -100
			},400);
		}else{
			$("#pie_menu_main").animate({
				bottom: 100
			},400);
			$("#pie_menu_all").animate({
				bottom: 0
			},400);
		}
	}

	if ($(window).width() > 780) {
		if ($("#pie_menu_all").css('bottom') == ($(window).height()/2 - 400) + "px") {
			$("#pie_menu_main").animate({
				bottom: $(window).height()/2 - 400
			},0);
			$("#pie_menu_all").animate({
				bottom: -100
			},0);
		}else{
			$("#pie_menu_main").animate({
				bottom: $(window).height()/2 - 300
			},0);
			$("#pie_menu_all").animate({
				bottom: $(window).height()/2 - 400
			},0);
		}
	}
});

$(document).on("click", "#pie_menu_interval", function() {
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

		ajax(("token=" + token + "&table=" + key + "&p1=" + start + "&p2=" + end), intervalDate);
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

		ajax(("token=" + token + "&table=" + key + "&p1=" + start + "&p2=" + end), intervalDate);
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

		ajax(("token=" + token + "&table=" + key + "&p1=" + start + "&p2=" + end), intervalDate);
	}
});


$(document).on("click", "#pie_menu_custom_button", function() {
	let startInput = $("#pie_menu_custom_interval_start").val();
	let endInput = $("#pie_menu_custom_interval_end").val();

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

	ajax(("token=" + token + "&table=" + key + "&p1=" + start + "&p2=" + end), intervalDate);
});