function chart(data,interval){;
	$('#panel-2').load('./samples/chart.html', function() {
		let intervalSplit = interval.split('-');

		let startDayInput = intervalSplit[0].trim();
		startDayInput = dateReverseUs(startDayInput);

		let endDayInput = intervalSplit[1].trim();
		endDayInput = dateReverseUs(endDayInput);

		$("#chart_menu_custom_interval_start").val(startDayInput);
		$("#chart_menu_custom_interval_end").val(endDayInput);

		$("h4","#chart").html(interval);
		if ($(window).width() <= 780) {
			$("canvas","#chart").attr("height", 320);
		}

		if ($(window).width() > 780) {
			$("canvas","#chart").attr("height", 482);
		}

		let dataValues;

		if (data.type == 'intervals') {
			dataValues = data.tableAll;
		}
		if (data.type == 'allData') {
			dataValues = data.tableConvert;
		}

		let all = 0;
		let mean = 0;

		for (var i = dataValues.value.length - 1; i >= 0; i--) {
			all += parseInt(dataValues.value[i], 10);
			mean += parseInt(dataValues.value[i], 10);
			let h3 = ""
			if (i != 0) {
				percent = (dataValues.value[i] / (dataValues.value[(i - 1)]/100) - 100).toFixed(2);
				if (percent > 0) {
					h3 = '<h3 style="color: green;">' + percent + '%</h3>';
				}else{
					h3 = '<h3 style="color: red;">' + percent + '%</h3>';
				}
			}
			$("#chart_values").append('\
				<div class="default_block">\
					<div class="default_block_header">\
	        	           <p>' + dataValues.date[i] + '</p>\
	        	           <img src="./img/svg/next.svg" height="7">\
	        	        </div>\
					<h2>' + shorterInt(dataValues.value[i]) + '</h2>\
					' + h3 + '\
				</div>\
			');
		}

		mean = (mean / dataValues.value.length).toFixed(0);
		all = (all - 0).toFixed(0);

		$("h2", "#chart_info_all").html(shorterInt(all) + "");
		$("h2", "#chart_info_mean").html(shorterInt(mean) + "");


		var popCanvas = document.getElementById("chart_main_canvas");
        var barChart = new Chart(popCanvas, {
            type: 'line',
            data: {
                labels: data.tableConvert.date,
                datasets: [{
                    label: 'Доходность',
                    data: data.tableConvert.value,
                    backgroundColor: 'rgba(117, 46, 46, 0.45)',
				    borderColor: 'rgb(176, 44, 44)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
				    display: true,
				    text: 'График'
			    },
                
            }
        });
	});
}



$(document).on("click", "#chart_menu_left", function() {
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
	}else if(interval == 'quarter'){
		dateStart = quarterStart('previous');
		dateEnd = quarterEnd('previous');
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

	let p3 = $("#user_info").attr('p3');

	if(p3 !== ""){
		optionParams = "&p3=" + p3;
	}
	ajax(("token=" + token + "&table=" + key + "&p1=" + start + "&p2=" + end + optionParams), intervalDate);
});

$(document).on("click", "#chart_menu_right", function() {
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
	}else if(interval == 'quarter'){
		dateStart = quarterStart('next');
		dateEnd = quarterEnd('next');
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

	let p3 = $("#user_info").attr('p3');

	if(p3 !== ""){
		optionParams = "&p3=" + p3;
	}

	ajax(("token=" + token + "&table=" + key + "&p1=" + start + "&p2=" + end + optionParams), intervalDate);
});


$(document).on("click", "#chart_menu_interval_half", function() {
	$("#user_info").attr('p3', $(this).attr("key"));
	$(this).toggleClass('active');
});

$(document).on("click", "#chart_menu_interval", function() {
	let key = $(this).attr('key').toString();

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

		let p3 = $("#user_info").attr('p3');

		if(p3 !== ""){
			optionParams = "&p3=" + p3;
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

		let p3 = $("#user_info").attr('p3');

		if(p3 !== ""){
			optionParams = "&p3=" + p3;
		}

		ajax(("token=" + token + "&table=" + key + "&p1=" + start + "&p2=" + end + optionParams), intervalDate);
	}

	if (key == 'quarter') {
		let start = quarterStart('now');
		let end = quarterEnd('now');

		let intervalDate = start + " - " + end;

		$("#user_info").attr('start_time', start);
		$("#user_info").attr('end_time', end);
		$("#user_info").attr('interval', 'quarter');

		let key = $("#user_info").attr('table');
		let token = $("#user_info").attr('token');

		let optionParams = "";

		let p3 = $("#user_info").attr('p3');

		if(p3 !== ""){
			optionParams = "&p3=" + p3;
		}

		ajax(("token=" + token + "&table=" + key + "&p1=" + start + "&p2=" + end + optionParams), intervalDate);
	}
});

$(document).on("click", "#chart_menu_custom_button", function() {
	let startInput = $("#chart_menu_custom_interval_start").val();
	let endInput = $("#chart_menu_custom_interval_end").val();

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

	let p3 = $("#user_info").attr('p3');

	if(p3 !== ""){
		optionParams = "&p3=" + p3;
	}

	ajax(("token=" + token + "&table=" + key + "&p1=" + start + "&p2=" + end + optionParams), intervalDate);
});


$(document).on("click", "#chart_menu_setting", function() {
	if ($(window).width() <= 780) {
		if ($("#chart_menu_all").css('bottom') == '0px') {
			$("#chart_menu_main").animate({
				bottom: 0
			},400);
			$("#chart_menu_all").animate({
				bottom: -150
			},400);
		}else{
			$("#chart_menu_main").animate({
				bottom: 150
			},400);
			$("#chart_menu_all").animate({
				bottom: 0
			},400);
		}
	}

	if ($(window).width() > 780) {
		if ($("#chart_menu_all").css('bottom') == ($(window).height()/2 - 400) + "px") {
			$("#chart_menu_main").animate({
				bottom: $(window).height()/2 - 400
			},0);
			$("#chart_menu_all").animate({
				bottom: -150
			},0);
		}else{
			$("#chart_menu_main").animate({
				bottom: $(window).height()/2 - 250
			},0);
			$("#chart_menu_all").animate({
				bottom: $(window).height()/2 - 400
			},0);
		}
	}
});