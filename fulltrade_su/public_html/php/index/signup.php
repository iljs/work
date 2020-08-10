<?php

require '../../libs/connect.php';

if (!isset($_REQUEST)) {
	$data = [
	    'result' => 'Error',
	    'data' => [
	    	'type' => 'RequestError'
	    ]

	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}

$userData = R::findOne('users', 'mail = ?', [$_REQUEST['mail']]);

if (isset($userData)) {
	$data = [
	    'result' => 'Error',
	    'data' => [
	    	'type' => 'Mail has been used'
	    ]
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}

if (trim($_REQUEST['mail']) == '') {
	$data = [
	    'result' => 'Error',
	    'data' => [
	    	'type' => 'Specify mail'
	    ]
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}

$to      = $userData['mail'];
$subject = 'Регистрация';
$message = '<html>
    <head>
        
    </head>
    <body>
        <p>Вы успешно зарегистрировались на торговой платформе <a href="https://fulltrade.su">FullTrade</a><br>Успешной торговли!<br><br>Вопросы - support@fulltrade.su<br>Сотрудничество - work@fulltrade.su</p>
    </body>
</html>';

$headers= "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=utf-8\r\n\r\n";

$headers .= "From: FullTrade <message@fulltrade.su>\r\n";
$headers .= "Reply-To: FullTrade <message@fulltrade.su>\r\n";

mail($to, $subject, $message, $headers);

$user = R::dispense('users');

$user->mail = $_REQUEST['mail'];
$user->password = sha1($_REQUEST['password']);
$user->realBalance = 0;
$user->demoBalance = 100000;
$user->saveCouples = 'EURUSD,USDJPY';
$user->pay = 0;
$user->paysum = 0;
$user->payout = 0;
$user->dateReg = date('U');
$user->newaction = 1;
$user->balance_type = 0;
$user->verify = 0;
$user->refcode = substr(sha1($_REQUEST['mail']), 0, 6);
$user->refer = $_REQUEST['refer'];
$user->refprocent = 70;
$user->ip = $_SERVER['REMOTE_ADDR'];
$user->device = $_SERVER['HTTP_USER_AGENT'];
R::store($user);

$userData = R::findOne('users', 'mail = ?', [$_REQUEST['mail']]);

$token = sha1(date('U') . sha1($_REQUEST['password']) . $_REQUEST['mail']);

$user = R::dispense('logs');
$user->user = $userData['id'];
$user->token = $token;
$user->date = date('U');
R::store($user);

$data = [
    'result' => 'Success',
    'data' => [
    	'token' => $token,
    	'id' => $userData['id']
    ]

];

header('Content-Type: text/json; charset=utf-8');
echo json_encode($data);