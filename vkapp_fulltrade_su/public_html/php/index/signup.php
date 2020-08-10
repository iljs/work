<?php

require '../../libs/connect.php';
require '/home/f/flysitegro/bot_fulltrade_su/public_html/get.keyboards.php';

$get = new get();

define('VK_TOKEN', "419830185ae656abe1a59c40ec238cacb1126a31a8085a6fd1a246cfc76e7991406299c314c07bd3e973f");

function send_message($message, $token, $user_id, $keyboard) {
    
    $request_params = array(
        'message' => $message,
        'keyboard' => $keyboard,
        'user_id' => $user_id,
        'access_token' => $token,
        'v' => '5.50'
	);

	$get_params = http_build_query($request_params);

	file_get_contents('https://api.vk.com/method/messages.send?' . $get_params);
   
}

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

if (trim($_REQUEST['vkid']) == '') {
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

$user = R::dispense('users');

$user->mail = 'None';
$user->vkid = $_REQUEST['vkid'];
$user->password = sha1(rand(0,9999999));
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
$user->refcode = substr(sha1($_REQUEST['vkid']), 0, 6);
$user->refer = $_REQUEST['refer'];
$user->refprocent = 70;
$user->ip = $_SERVER['REMOTE_ADDR'];
$user->device = $_SERVER['HTTP_USER_AGENT'];
R::store($user);

$userData = R::findOne('users', 'vkid = ?', [$_REQUEST['vkid']]);

$token = sha1(date('U') . $_REQUEST['vkid']);

$user = R::dispense('logs');
$user->user = $userData['id'];
$user->token = $token;
$user->date = date('U');
R::store($user);

$userbot = R::findOne('botusers', 'user = ?', array($_REQUEST['vkid']));

if (isset($userbot)) {
    
    $changeBot = R::load('botusers', $userbot['id']);
	$changeBot->token = $token;
	R::store($changeBot);

	$request_params = array(
        'token' => $token
    );

	$userDataBot = json_decode(file_get_contents('https://bot.fulltrade.su/php/get.userdata.php?' . urldecode(http_build_query($request_params))), true);
	
	$changeBot = R::load('botusers', $userbot['id']);
	$changeBot->last_real_balance = (int)$userData['data']['realBalance'];
	$changeBot->last_demo_balance = (int)$userData['data']['demoBalance'];
	R::store($changeBot);

	$message = "Я - бот, который будет автоматически торговать на бинарных опционах!\n\nТип счета: Демо\nВключен: Нет\n\nСчета:\n-Демо: " . $userDataBot['data']['demoBalance'] . " руб.\n-Реальный: " . $userDataBot['data']['realBalance'] . " руб.\n\nВыбери действие на клавитауре!";
    send_message($message, VK_TOKEN, $_REQUEST['vkid'], json_encode($get->menuOffDemo));
}

$data = [
    'result' => 'Success',
    'data' => [
    	'token' => $token,
    	'id' => $userData['id']
    ]
];

header('Content-Type: text/json; charset=utf-8');
echo json_encode($data);