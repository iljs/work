var num = 1;

function update() {
	$.get('./php/get.bot.php', function(data){
		$("#table_message_table").html("");
		$("#table_keyboard_table").html("");
		
		$("#table_message_table").append(
			'<tr>\
				<td>ID</td>\
				<td>Текст</td>\
				<td>Клавиатура</td>\
				<td>Функции</td>\
				<td>Медиа</td>\
				<td>Действия</td>\
			</tr>'
		);

		$("#table_keyboard_table").append(
			'<tr>\
				<td>ID</td>\
				<td>Информация</td>\
				<td>Действия</td>\
			</tr>'
		);

		let keysMessage = Object.keys(data.data.message);
		let keysKeyboards = Object.keys(data.data.keyboard);

		for (var i = 0; i < keysMessage.length; i++) {
			$("#table_message_table").append(
				'<tr>\
					<td>' + data.data.message[keysMessage[i]].id + '</td>\
					<td>' + data.data.message[keysMessage[i]].text + '</td>\
					<td>' + data.data.message[keysMessage[i]].keyboard + '</td>\
					<td>' + data.data.message[keysMessage[i]].functions + '</td>\
					<td>' + data.data.message[keysMessage[i]].media + '</td>\
					<td>\
						<div id="table_message_edit" key="' + data.data.message[keysMessage[i]].id + '">\
							<img src="./img/pencil.svg" height="20">\
						</div>\
						<div id="table_message_remove" key="' + data.data.message[keysMessage[i]].id + '">\
							<img src="./img/remove.svg" height="20">\
						</div>\
					</td>\
				</tr>'
			);
		}

		for (var i = 0; i < keysKeyboards.length; i++) {
			let newTable = '\
			<table width="100%">\
				<tr>\
					<td>Номер ответа</td>\
					<td>Текст</td>\
					<td>Сообщение</td>\
					<td>Линия</td>\
					<td>Цвет</td>\
				</tr>';
			let keysKeyboard = Object.keys(data.data.keyboard[keysKeyboards[i]]);

			for (var q = 0; q < keysKeyboard.length; q++) {
				newTable += '\
				<tr>\
					<td>' + data.data.keyboard[keysKeyboards[i]][keysKeyboard[q]].numAnswer + '</td>\
					<td>' + data.data.keyboard[keysKeyboards[i]][keysKeyboard[q]].textAnswer + '</td>\
					<td>' + data.data.keyboard[keysKeyboards[i]][keysKeyboard[q]].messageId + '</td>\
					<td>' + data.data.keyboard[keysKeyboards[i]][keysKeyboard[q]].row + '</td>\
					<td>' + data.data.keyboard[keysKeyboards[i]][keysKeyboard[q]].color + '</td>\
				</tr>'
			}

			newTable += '</table>';
			
			$("#table_keyboard_table").append(
				'<tr>\
					<td>' + data.data.keyboard[keysKeyboards[i]][keysKeyboard[0]].id + '</td>\
					<td>' + newTable + '</td>\
					<td>\
						<div id="table_keyboard_edit" key="' + data.data.keyboard[keysKeyboards[i]][keysKeyboard[0]].id + '">\
							<img src="./img/pencil.svg" height="20">\
						</div>\
						<div id="table_keyboard_remove" key="' + data.data.keyboard[keysKeyboards[i]][keysKeyboard[0]].id + '">\
							<img src="./img/remove.svg" height="20">\
						</div>\
					</td>\
				</tr>'
			);
			
		}
	});
}

$('#create_keyboard_plus').on('click', function(){
	num += 1;
	$('#info').attr('count', num);
	$('#keyboards').append('\
		<div id="keyboard_' + num + '">\
			<input type="hidden" id="create_keyboard_id" value="' + num + '">\
			<input type="text" placeholder="Номер ответа" id="create_keyboard_num_answer">\
			<input type="text" placeholder="Текст ответа" id="create_keyboard_text_answer">\
			<input type="text" placeholder="ID сообщения" id="create_keyboard_message_id">\
			<input type="text" placeholder="Линия(ВК/Telegram)" id="create_keyboard_row">\
			<input type="text" placeholder="Цвет(ВК)" id="create_keyboard_color">\
		</div>'
	);
});

$('#create_keyboard_mines').on('click', function(){
	$('#keyboard_' + num).detach();
	num -= 1;
	$('#info').attr('count', num);
});


$("#create_keyboard_button").click(function() {
	let keyboardType = $("#info").attr('keyboard');
	if (keyboardType == 'create') {
		let params = [];

		for (var i = 1; i < (num + 1); i++) {
			Array.prototype.push.apply(params, [{
				numAnswer: $("#create_keyboard_num_answer", "#keyboard_" + i).val(),
				textAnswer: $("#create_keyboard_text_answer", "#keyboard_" + i).val(),
				messageId: $("#create_keyboard_message_id", "#keyboard_" + i).val(),
				row: $("#create_keyboard_row", "#keyboard_" + i).val(),
				color: $("#create_keyboard_color", "#keyboard_" + i).val(),
			}]);
		}

		$.post('./php/create.keyboard.php', {array: params, keyboardId: $("info").attr("keyboardId")}, function(data){
			num = 1;
			$('#info').attr('count', 1);
			$('#keyboards').html('\
				<div id="keyboard_1">\
					<input type="text" placeholder="Номер ответа" id="create_keyboard_num_answer">\
					<input type="text" placeholder="Текст ответа" id="create_keyboard_text_answer">\
					<input type="text" placeholder="ID сообщения" id="create_keyboard_message_id">\
					<input type="text" placeholder="Линия(ВК/Telegram)" id="create_keyboard_row">\
					<input type="text" placeholder="Цвет(ВК)" id="create_keyboard_color">\
				</div>'
			);

			update();
			$("#info").attr('keyboard', 'create');
		});
	}

	if (keyboardType == 'update') {
		let params = [];

		for (var i = 1; i < (num + 1); i++) {
			Array.prototype.push.apply(params, [{
				id: $("#create_keyboard_id", "#keyboard_" + i).val(),
				numAnswer: $("#create_keyboard_num_answer", "#keyboard_" + i).val(),
				textAnswer: $("#create_keyboard_text_answer", "#keyboard_" + i).val(),
				messageId: $("#create_keyboard_message_id", "#keyboard_" + i).val(),
				row: $("#create_keyboard_row", "#keyboard_" + i).val(),
				color: $("#create_keyboard_color", "#keyboard_" + i).val(),
			}]);
		}

		$.post('./php/update.keyboard.php', {array: params, keyboardId: $("#info").attr("keyboardid")}, function(data){
			num = 1;
			$('#info').attr('count', 1);
			$('#keyboards').html('\
				<div id="keyboard_1">\
					<input type="text" placeholder="Номер ответа" id="create_keyboard_num_answer">\
					<input type="text" placeholder="Текст ответа" id="create_keyboard_text_answer">\
					<input type="text" placeholder="ID сообщения" id="create_keyboard_message_id">\
					<input type="text" placeholder="Линия(ВК/Telegram)" id="create_keyboard_row">\
					<input type="text" placeholder="Цвет(ВК)" id="create_keyboard_color">\
				</div>'
			);

			update();
		});
	}
});


$("#create_message_button").click(function() {
	let messageType = $("#info").attr('message');
	if (messageType == "create") {
		$.post('./php/create.message.php', {
			text: $("#create_message_text").val(),
			keyboard: $("#create_message_keyboard").val(),
			functions: $("#create_message_function").val(),
			media: $("#create_message_media").val()
		}, function(data){
			$("#create_message_text").val('');
			$("#create_message_keyboard").val('');
			$("#create_message_function").val('');
			$("#create_message_media").val('');

			update();
		});
	}

	if (messageType == "update") {
		$.post('./php/update.message.php', {
			messageId: $("#create_message_id").val(),
			text: $("#create_message_text").val(),
			keyboard: $("#create_message_keyboard").val(),
			functions: $("#create_message_function").val(),
			media: $("#create_message_media").val()
		}, function(data){
			$("#create_message_text").val('');
			$("#create_message_keyboard").val('');
			$("#create_message_function").val('');
			$("#create_message_media").val('');

			$("#info").attr('message', 'create');
			update();
		});
	}
});

var files; 


$('input[type=file]').on('change', function(){
	files = this.files;
});

$('#create_media_button').on( 'click', function( event ){

	event.stopPropagation();
	event.preventDefault(); 

	if( typeof files == 'undefined' ) return;

	var data = new FormData();

	$.each( files, function( key, value ){
		data.append( key, value );
	});

	data.append( 'my_file_upload', 1 );

	$.ajax({
		url         : './php/upload.file.php',
		type        : 'POST', // важно!
		data        : data,
		cache       : false,
		dataType    : 'json',
		processData : false,
		contentType : false, 

		success     : function( respond, status, jqXHR ){

			if( typeof respond.error === 'undefined' ){
				$("#create_media_done").html(respond.file);
				navigator.clipboard.writeText(respond.file)
			}else{
				console.log('ОШИБКА: ' + respond.data );
			}
		},
		
		error: function( jqXHR, status, errorThrown ){
			console.log( 'ОШИБКА AJAX запроса: ' + status, jqXHR );
		}
	});
});

$(document).on("click", "#table_message_edit", function() {
	$("#info").attr('message', 'update');
	let key = $(this).attr('key');
	$.get('./php/get.message.php?messageId=' + key, function(data){
		$("#create_message_id").val(key);
		$("#create_message_text").val(data.data.message.text);
		$("#create_message_keyboard").val(data.data.message.keyboard);
		$("#create_message_function").val(data.data.message.functions);
		$("#create_message_media").val(data.data.message.media);
	});
});

$(document).on("click", "#table_message_remove", function() {
	let key = $(this).attr('key');
	$.get('./php/remove.message.php?messageId=' + key, function(data){
		update()
	});
});

$(document).on("click", "#table_keyboard_edit", function() {
	$("#info").attr('message', 'update');
	let key = $(this).attr('key');
	$.get('./php/get.keyboard.php?keyboardId=' + key, function(data){
		$('#keyboards').html('');
		$("#info").attr('keyboard', 'update');

		let keys = Object.keys(data.data.keyboard);

		$('#info').attr('count', keys.length);
		$('#info').attr('keyboardId', key);

		num = keys.length;

		for (var i = 0; i < keys.length; i++) {
			$('#keyboards').append('\
				<div id="keyboard_' + data.data.keyboard[keys[i]].id + '">\
					<input type="hidden" id="create_keyboard_id" value="' + data.data.keyboard[keys[i]].id + '">\
					<input type="text" placeholder="Номер ответа" id="create_keyboard_num_answer" value="' + data.data.keyboard[keys[i]].numAnswer + '">\
					<input type="text" placeholder="Текст ответа" id="create_keyboard_text_answer" value="' + data.data.keyboard[keys[i]].textAnswer + '">\
					<input type="text" placeholder="ID сообщения" id="create_keyboard_message_id" value="' + data.data.keyboard[keys[i]].messageId + '">\
					<input type="text" placeholder="Линия(ВК/Telegram)" id="create_keyboard_row" value="' + data.data.keyboard[keys[i]].row + '">\
					<input type="text" placeholder="Цвет(ВК)" id="create_keyboard_color" value="' + data.data.keyboard[keys[i]].color + '">\
				</div>'
			);
		}
	});
});

$(document).on("click", "#table_keyboard_remove", function() {
	let key = $(this).attr('key');
	$.get('./php/remove.keyboard.php?keyboardId=' + key, function(data){
		update()
	});
});

$(document).on("click", "#vk_button", function() {
	let token = $("#vk_token").val();
	let confirmationToken = $("#vk_conf_token").val();
	let secretKey = $("#vk_secret_key").val();
	$.get('../sys/connect/vk.connect.php?token=' + token + "&confirmationToken=" + confirmationToken + "&secretKey=" + secretKey, function(data){
		$("#vk_connect_url").html(data.url);
		alert(data.result);
	});
});

$(document).on("click", "#telegram_button", function() {
	let token = $("#telegram_token").val();
	$.get('../sys/connect/telegram.connect.php?token=' + token, function(data){
		alert(data.result);
	});
});

$(document).on("click", "#whatsapp_button", function() {
	let token = $("#whatsapp_token").val();
	let instanceId = $("#whatsapp_id").val();
	$.get('../sys/connect/whatsapp.connect.php?token=' + token + "&instanceId=" + instanceId, function(data){
		alert(data.result);
	});
});

update();