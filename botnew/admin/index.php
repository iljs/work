<?php

if (!isset($_REQUEST)) {
	exit();
}

if ($_REQUEST['token'] != 'd3a284b3d63b6f077d68825e8e5028c911d40c31') {
	exit();
}

?>
<!DOCTYPE html>
<html>
<head>
	<title>Админ панель</title>

	<meta charset="utf-8">
	<meta content="width=device-width, initial-scale=1" shrink-to-fit="no" user-scalable="no" viewport-fit="cover" name="viewport" />
	<meta id="info" token="">

	<link rel="stylesheet" type="text/css" href="./css/index.css">

 	<link href="https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400,500,600,700,800,900&display=swap" rel="stylesheet">
 	<link rel="shortcut icon" href="images/icon.png" type="image/png">

 	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
</head>
<body>
	<div id="create_user">
		<h1>Создать пользователя</h1>
		<input type="text" id="create_user_mail" placeholder="Почта" class="input">
		<input type="text" id="create_user_password" placeholder="Пароль" class="input">
		<div id="create_user_button" class="button">
			<p>Добавить</p>
		</div>
	</div>
	<div id="create_bot">
		<h1>Создать бота</h1>
		<input type="text" id="create_bot_user" placeholder="ID пользователя" class="input">
		<input type="text" id="create_bot_price" placeholder="Цена" class="input">
		<input type="text" id="create_bot_vk" placeholder="Vk link" class="input">
		<input type="text" id="create_bot_telegram" placeholder="Telegram link" class="input">
		<input type="text" id="create_bot_whatsapp" placeholder="WhatsApp link" class="input">
		<div id="create_bot_button" class="button">
			<p>Добавить</p>
		</div>
	</div>

	<div id="table_users">
		<table width="100%">
			
		</table>
	</div>

	<script type="text/javascript" src="./js/index.js"></script>
</body>
</html>