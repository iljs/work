$(document).on("click", "#reports_block", function(){
	let key = $(this).attr('key');
	let token = $("#user_info").attr('token');
	let start = weekStart();
	let end = weekEnd();

	let intervalDate = start + " - " + end;

	$("#user_info").attr('start_time', start);
	$("#user_info").attr('end_time', end);
	$("#user_info").attr('interval', 7);
	$("#user_info").attr('table', key);

	$("#panel-2").show();
	$("#panel-1").animate({
		left: '-50%',
		opacity: 0
	},700);
	$("#panel-2").animate({
		left: 0,
	},700);
	setTimeout(function(){
		$("#panel-1").hide();
	},700);

	ajax(("token=" + token + "&table=" + key + "&p1=" + start + "&p2=" + end), intervalDate);
});

$(document).on("click", "#cancel_header", function(){
	$("#panel-1").show();
	$("#panel-2").animate({
		left: '100%',
		opacity: 0
	},700);
	$("#panel-1").animate({
		left: 0,
		opacity: 1
	},700);
	setTimeout(function(){
		$("#panel-2").hide();
	},700);

	let start = weekStart();
	let end = weekEnd();

	$("#user_info").removeAttr('p3');
	$("#user_info").removeAttr('p4');

	$("#user_info").attr('start_time', start);
	$("#user_info").attr('end_time', end);
	$("#user_info").attr('interval', 7);
	$("#user_info").attr('table', 0);
});
