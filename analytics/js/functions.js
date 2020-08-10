function twoDigits(num) {
  return ('0' + num).slice(-2);
}

function shorterInt(num){
	let numConvert = parseInt(num, 10);
	if(numConvert >= 1000000) return ((numConvert/1000000).toFixed(2) + "M");
	if(numConvert >= 1000) return ((numConvert/1000).toFixed(2) + "K");
	if(numConvert <= -1000000) return ((numConvert/1000000).toFixed(2) + "M");
	if(numConvert <= -1000) return ((numConvert/1000).toFixed(2) + "K");
	if(numConvert < 1000) return (numConvert + "₽");
}

String.prototype.replaceAt = function(index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function dateReverseUs(date) {
	euro_date = date.split('.');
	var us_date = euro_date.reverse().join('-');

	return us_date;
}

function dateReverseEuro(date) {
	us_date = date.split('-');
	var euro_date = us_date.reverse().join('.');

	return euro_date;
}

function timeDate(){
	  var a = new Date();
	  var year = a.getFullYear();
	  var month = (a.getMonth() + 1);
	  var date = a.getDate();
	  var hour = a.getHours();
	  var min = a.getMinutes();
	  var sec = a.getSeconds();
	  var time =  twoDigits(date) + '.' + twoDigits(month) + '.' + year;
	  return time;
}

function timeAll(){
	  var a = new Date();
	  var year = a.getFullYear();
	  var month = a.getMonth();
	  var date = a.getDate();
	  var hour = a.getHours();
	  var min = a.getMinutes();
	  var sec = a.getSeconds();
	  var time = twoDigits(date) + '.' + twoDigits(month) + '.' + twoDigits(year) + " " + year + ":" + twoDigits(year) + ":" + twoDigits(year);
	  return time;
}

function shorter(str) {
	if (str.length > 17) {
		 return str.substr(0, 17) + "...";
	}else{
		return str;
	}
}

function error(code, interval) {
	$('#panel-2').load('./samples/error.html', function() {
		let intervalSplit = interval.split('-');

		let startDayInput = intervalSplit[0].trim();
		startDayInput = dateReverseUs(startDayInput);

		let endDayInput = intervalSplit[1].trim();
		endDayInput = dateReverseUs(endDayInput);

		$("#custom-1_menu_custom_interval_start").val(startDayInput);
		$("#custom-1_menu_custom_interval_end").val(endDayInput);

		$("#error").append('<h4>' + interval + '</h4>');

		if (code == 1) {
			$("#error").append('<p>Нет информации</p>');
		}
	});
}

function ajax(params, intervalDate) {
	$("#panel-2").animate({
		opacity: 0.3
	},500);
	var settings = {
		"async": true,
		"crossDomain": false,
		"url": "./php/get.table.php?" + params,
		"method": "GET"
	}
	$.ajax(settings).done(function (data) {
		setTimeout(function(){
			$("#panel-2").animate({
				opacity: 1
			},800);
			if(data.result == 'Success'){
				if (data.data.sample == 'custom_1') {
					custom1(data.data, intervalDate);
				}

				if (data.data.sample == 'chart') {
					chart(data.data, intervalDate);
				}

				if (data.data.sample == 'pie') {
					pie(data.data, intervalDate);
				}
			}
			if (data.result == 'Error') {
					error(data.code, intervalDate);
			}
		},500);
	});
}

function timeConverterDate(UNIX_timestamp){
	  var a = new Date(UNIX_timestamp * 1000);
	  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	  var year = a.getFullYear();
	  var month = (a.getMonth() + 1);
	  var date = a.getDate();
	  var hour = a.getHours();
	  var min = a.getMinutes();
	  var sec = a.getSeconds();
	  var time = twoDigits(date) + "." + twoDigits(month) + "." + year;
	  return time;
}

function weekStart() {
	dateStart = new Date();
	mStart = new Date();
	if(dateStart.getDay()){
		mStart.setDate(dateStart.getDate() + 1 - dateStart.getDay())
	}else{
		mStart.setDate(dateStart.getDate() - 6)
	}

	var a = mStart;
	var year = a.getFullYear();
	var month = (a.getMonth() + 1);
	var date = a.getDate();
	var hour = a.getHours();
	var min = a.getMinutes();
	var sec = a.getSeconds();
	var time =  twoDigits(date) + '.' + twoDigits(month) + '.' + year;
	return time;
}

function weekEnd() {
	dateEnd = new Date();
	mEnd = new Date();
	if(dateEnd.getDay()){
		mEnd.setDate(dateEnd.getDate() + 7 - dateEnd.getDay());
	}else{
		mEnd.setDate(dateEnd.getDate() + 0);
	}

	var a = mEnd;
	var year = a.getFullYear();
	var month = (a.getMonth() + 1);
	var date = a.getDate();
	var hour = a.getHours();
	var min = a.getMinutes();
	var sec = a.getSeconds();
	var time =  twoDigits(date) + '.' + twoDigits(month) + '.' + year;
	return time;
}

function getLastDayOfMonth(year, month) {
  let date = new Date(year, month + 1, 0);
  return date.getDate();
}

function monthStart(type) {
	if (type == 'now') {
		let dateStartArray = $("#user_info").attr('start_time').split('.');
		var dateStart = new Date(dateStartArray[2], (parseInt(dateStartArray[1], 10) - 1), 1);

		return timeConverterDate(dateStart.getTime() / 1000);
	}
	if (type == 'next') {
		let dateStartArray = $("#user_info").attr('start_time').split('.');
		var dateStart = new Date(dateStartArray[2], (parseInt(dateStartArray[1], 10) - 1), 1);
		dateStart.setMonth(dateStart.getMonth() + 1);

		return timeConverterDate(dateStart.getTime() / 1000);
	}
	if (type == 'previous') {
		let dateStartArray = $("#user_info").attr('start_time').split('.');
		var dateStart = new Date(dateStartArray[2], (parseInt(dateStartArray[1], 10) - 1), 1);
		dateStart.setMonth(dateStart.getMonth() - 1);

		return timeConverterDate(dateStart.getTime() / 1000);
	}
}

function monthEnd(type) {
	if (type == 'now') {
		let dateEndArray = $("#user_info").attr('start_time').split('.');
		var lastDay = getLastDayOfMonth(dateEndArray[2], (parseInt(dateEndArray[1], 10) - 1));
		var dateEnd = new Date(dateEndArray[2], (parseInt(dateEndArray[1], 10) - 1), lastDay);

		return timeConverterDate(dateEnd.getTime() / 1000);
	}
	if (type == 'next') {
		let dateEndArray = $("#user_info").attr('end_time').split('.');
		var dateEnd = new Date(dateEndArray[2], (parseInt(dateEndArray[1], 10) - 1));
		dateEnd.setMonth(dateEnd.getMonth() + 1);
		var lastDay = getLastDayOfMonth(dateEnd.getFullYear(), dateEnd.getMonth());
		dateEnd.setDate(lastDay);
		
		return timeConverterDate(dateEnd.getTime() / 1000);
	}
	if (type == 'previous') {
		let dateEndArray = $("#user_info").attr('end_time').split('.');
		var dateEnd = new Date(dateEndArray[2], (parseInt(dateEndArray[1], 10) - 1));
		dateEnd.setMonth(dateEnd.getMonth() - 1);
		var lastDay = getLastDayOfMonth(dateEnd.getFullYear(), dateEnd.getMonth());
		dateEnd.setDate(lastDay);

		return timeConverterDate(dateEnd.getTime() / 1000);
	}
}


function getQuarter(d){
	d = d || new Date(); // If no date supplied, use today
  	var q = [0,1,2,3];
  	return q[Math.floor((d.getMonth()) / 3)];
}


function quarterStart(type){
	let dateQuarter = [
		[[0, 1], [2, 31]],
		[[3, 1], [5, 30]],
		[[6, 1], [8, 30]],
		[[9, 1], [11, 31]],
	];
	if (type == 'now') {
		let dateArray = $("#user_info").attr('start_time').split('.');
		var date = new Date(dateArray[2], (dateArray[1] - 1), dateArray[0]);

		result = getQuarter(date);
		dateStart = new Date(dateArray[2], dateQuarter[result][0][0], dateQuarter[result][0][1]);
		return timeConverterDate(dateStart.getTime() / 1000);
	}

	if (type == 'next') {
		let dateArray = $("#user_info").attr('start_time').split('.');
		var date = new Date(dateArray[2], (dateArray[1] - 1), dateArray[0]);

		result = getQuarter(date);
		if (result == 3) {
			dateStart = new Date((parseInt(dateArray[2], 10) + 1), dateQuarter[0][0][0], dateQuarter[0][0][1]);
			return timeConverterDate(dateStart.getTime() / 1000);
		}else{
			dateStart = new Date(dateArray[2], dateQuarter[(result + 1)][0][0], dateQuarter[(result + 1)][0][1]);
			return timeConverterDate(dateStart.getTime() / 1000);
		}
	}

	if (type == 'previous') {
		let dateArray = $("#user_info").attr('start_time').split('.');
		var date = new Date(dateArray[2], (dateArray[1] - 1), dateArray[0]);

		result = getQuarter(date);
		if (result == 0) {
			dateStart = new Date((dateArray[2] - 1), dateQuarter[3][0][0], dateQuarter[3][0][1]);
			return timeConverterDate(dateStart.getTime() / 1000);
		}else{
			dateStart = new Date(dateArray[2], dateQuarter[(result - 1)][0][0], dateQuarter[(result - 1)][0][1]);
			return timeConverterDate(dateStart.getTime() / 1000);
		}
	}
}

function quarterEnd(type){
	let dateQuarter = [
		[[0, 1], [2, 31]],
		[[3, 1], [5, 30]],
		[[6, 1], [8, 30]],
		[[9, 1], [11, 31]],
	];
	if (type == 'now') {
		let dateArray = $("#user_info").attr('start_time').split('.');
		var date = new Date(dateArray[2], (dateArray[1] - 1), dateArray[0]);

		result = getQuarter(date);
		dateEnd = new Date(dateArray[2], dateQuarter[result][1][0], dateQuarter[result][1][1]);
		return timeConverterDate(dateEnd.getTime() / 1000);
	}

	if (type == 'next') {
		let dateArray = $("#user_info").attr('end_time').split('.');
		var date = new Date(dateArray[2], (dateArray[1] - 1), dateArray[0]);

		result = getQuarter(date);
		if (result == 3) {
			dateEnd = new Date((parseInt(dateArray[2], 10) + 1), dateQuarter[0][1][0], dateQuarter[0][1][1]);
			return timeConverterDate(dateEnd.getTime() / 1000);
		}else{
			dateEnd = new Date(dateArray[2], dateQuarter[(result + 1)][1][0], dateQuarter[(result + 1)][1][1]);
			return timeConverterDate(dateEnd.getTime() / 1000);
		}
	}

	if (type == 'previous') {
		let dateArray = $("#user_info").attr('end_time').split('.');
		var date = new Date(dateArray[2], (dateArray[1] - 1), dateArray[0]);

		result = getQuarter(date);
		if (result == 0) {
			dateEnd = new Date((dateArray[2] - 1), dateQuarter[3][1][0], dateQuarter[3][1][1]);
			return timeConverterDate(dateEnd.getTime() / 1000);
		}else{
			dateEnd = new Date(dateArray[2], dateQuarter[(result - 1)][1][0], dateQuarter[(result - 1)][1][1]);
			return timeConverterDate(dateEnd.getTime() / 1000);
		}
	}
}



function plusDays(date, interval) {
	let newDate = (date.getTime() / 1000) + (interval*24*60*60);
	return timeConverterDate(newDate);
}

function minesDays(date, interval) {
	let newDate = (date.getTime() / 1000) - (interval*24*60*60);
	return timeConverterDate(newDate);
}