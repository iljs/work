function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
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

function userData() {
	let token = $("#trade_info").attr('token');
	if (token != undefined) {
			$("#trade_info").attr('token', token);
			var settings = {
				"async": true,
				"crossDomain": false,
				"url": "./php/affliate/get.data.php?token=" + token,
				"method": "GET",
			}
			$.ajax(settings).done(function (data) {
				if (data.result != 'Success') {
					window.location.replace("./index");
				}else{
					$("#link_a").html("https://fulltrade.su/?" + data.link);
					$("#procent_p").html("Вы находитесь на партнёрской программе " + data.procent + "% от дохода брокера");

					$("#affliate_table").append('\
						<tr>\
							<th>Уникальных переходов</th>\
							<td>' + data.transitions.day + '</td>\
							<td>' + data.transitions.week + '</td>\
							<td>' + data.transitions.month + '</td>\
							<td>' + data.transitions.all + '</td>\
						</tr>\
						<tr>\
							<th>Новых пользователей</th>\
							<td>' + data.users.day + '</td>\
							<td>' + data.users.week + '</td>\
							<td>' + data.users.month + '</td>\
							<td>' + data.users.all + '</td>\
						</tr>\
						<tr>\
							<th>Депозитов</th>\
							<td>' + data.deposits.day + '₽</td>\
							<td>' + data.deposits.week + '₽</td>\
							<td>' + data.deposits.month + '₽</td>\
							<td>' + data.deposits.all + '₽</td>\
						</tr>\
						<tr>\
							<th>Выводов</th>\
							<td>' + data.withdraw.day + '₽</td>\
							<td>' + data.withdraw.week + '₽</td>\
							<td>' + data.withdraw.month + '₽</td>\
							<td>' + data.withdraw.all + '₽</td>\
						</tr>\
						<tr>\
							<th>Сумма проигрышей(Демо)</th>\
							<td>' + data.demoLose.day + '₽</td>\
							<td>' + data.demoLose.week + '₽</td>\
							<td>' + data.demoLose.month + '₽</td>\
							<td>' + data.demoLose.all + '₽</td>\
						</tr>\
						<tr>\
							<th>Сумма побед(Демо)</th>\
							<td>' + data.demoWins.day + '₽</td>\
							<td>' + data.demoWins.week + '₽</td>\
							<td>' + data.demoWins.month + '₽</td>\
							<td>' + data.demoWins.all + '₽</td>\
						</tr>\
						<tr>\
							<th>Сумма проигрышей(Реальный)</th>\
							<td>' + data.realLose.day + '₽</td>\
							<td>' + data.realLose.week + '₽</td>\
							<td>' + data.realLose.month + '₽</td>\
							<td>' + data.realLose.all + '₽</td>\
						</tr>\
						<tr>\
							<th>Сумма побед(Реальный)</th>\
							<td>' + data.realWins.day + '₽</td>\
							<td>' + data.realWins.week + '₽</td>\
							<td>' + data.realWins.month + '₽</td>\
							<td>' + data.realWins.all + '₽</td>\
						</tr>\
						<tr>\
							<th>Заработанно</th>\
							<td>' + data.cash.day + '₽</td>\
							<td>' + data.cash.week + '₽</td>\
							<td>' + data.cash.month + '₽</td>\
							<td>' + data.cash.all + '₽</td>\
						</tr>\
						');
				}
			});
	}else{
		window.location.replace("./index");
	}
}

$(document).ready(function() {
	check();
	userData();
});