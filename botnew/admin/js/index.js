function get(name){
   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
      return decodeURIComponent(name[1]);
}

function usersUpdate() {
	let token = $("#info").attr("token");
	$.get('./php/get.users.php?token=' + token, function(data){
		$("table", "#table_users").html("");
		$("table", "#table_users").append(
			"<tr>\
				<td>ID</td>\
				<td>Почта</td>\
				<td>Баланс</td>\
				<td>Привелегии</td>\
			</tr>"
		);

		for (var i = data.users.id.length - 1; i >= 0; i--) {
			$("table", "#table_users").append(
				"<tr>\
					<td>" + data.users.id[i] + "</td>\
					<td>" + data.users.mail[i] + "</td>\
					<td>" + data.users.balance[i] + "</td>\
					<td>" + data.users.status[i] + "</td>\
				</tr>"
			);
		}
	});
}


$("#info").attr("token", get('token'));


$("#create_user_button").click(function(){
	let token = $("#info").attr("token");
	let mail = $("#create_user_mail").val();
	let password = $("#create_user_password").val();
	$.get('./php/create.user.php?token=' + token + "&mail=" + mail + "&password=" + password, function(data){
		$("#create_user_mail").val("");
		$("#create_user_password").val("");
		usersUpdate();
	});
});

$("#create_bot_button").click(function(){
	let token = $("#info").attr("token");
	let admin = $("#create_bot_user").val();
	let pay = $("#create_bot_pay").val();
	let vkLink = $("#create_bot_vk").val();
	let telegramLink = $("#create_bot_telegram").val();
	let whatsappLink = $("#create_bot_whatsapp").val();

	$.get('./php/create.bot.php?token=' + token + "&admin=" + admin + "&pay=" + pay + "&vkLink=" + vkLink + "&telegramLink=" + telegramLink + "&whatsappLink=" + whatsappLink, function(data){
		$("#create_bot_user").val("");
		$("#create_bot_pay").val("");
		$("#create_bot_vk").val("");
		$("#create_bot_telegram").val("");
		$("#create_bot_whatsapp").val("");
		usersUpdate();
	});
});

usersUpdate();