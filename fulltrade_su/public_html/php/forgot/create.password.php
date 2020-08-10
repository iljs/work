<?php
require '../../libs/connect.php';

if (!isset($_REQUEST)) {
	$data = [
	    'result' => 'Error',
	    'message' => 'Request Error'
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}

$userData = R::findOne('users', 'mail = ?', [$_REQUEST['mail']]);

if (!isset($userData)) {
	$data = [
		'result' => 'Error',
		'message' => 'Mail is not found'
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}

$pass = rand(10000000, 99999999);

$change = R::load('users', $userData['id']);
$change->newaction = 1;
$change->password = sha1($pass);
R::store($change);

$token = sha1(date('U') . sha1($pass) . $_REQUEST['mail']);

$user = R::dispense('logs');
$user->user = $userData['id'];
$user->token = $token;
$user->date = date('U');
R::store($user);

$to      = $userData['mail'];
$subject = 'Восстановление пароля';
$message = '<html>
    <head>
        
    </head>
    <body>
        <p>Ваш временный пароль: ' . $pass . '<br>Войти в аккаунт - <a href="https://fulltrade.su/login.php?token=' . $token . '">fulltrade.su</a><br><br>Вопросы - support@fulltrade.su<br>Сотрудничество - work@fulltrade.su</p>
    </body>
</html>';

$headers= "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=utf-8\r\n";

$headers .= "From: FullTrade <message@fulltrade.su>\r\n";
$headers .= "Reply-To: FullTrade <message@fulltrade.su>\r\n";


// Отправка mail
mail($to, $subject, $message, $headers);

$data = [
	'result' => 'Success'
];
header('Content-Type: text/json; charset=utf-8');
echo json_encode($data);
exit();

?>