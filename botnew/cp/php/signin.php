<?php

require '../../libs/connect.php';

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

if (!isset($_REQUEST)) {
	$data = [
		'result' => 'error',
		'code' => 1
	];
}

$user = R::findOne('users', 'mail = ?', [$_REQUEST['login']]);

if (isset($user)) {
	if ($user['password'] == sha1($_REQUEST['password'])) {
		$date = date('U');
		$token = sha1($_REQUEST['login'] . " | " . $date . " | " . $user['password']);

		$log = R::dispense('logs');
		$log->user = $user['id'];
		$log->token = $token;
		$log->date = $date;
		R::store($log);

		$data = [
			'result' => 'success',
			'body' => [
				'token' => $token,
				'firstName' => $user['firstname'],
				'lastName' => $user['lastname'],
				'phone' => $user['phone']
			]
		];
	}else{
		$data = [
			'result' => 'error',
			'code' => 3
		];
	}
}else{
	$data = [
		'result' => 'error',
		'code' => 2
	];	
}

header('Content-Type: text/json; charset=utf-8');
echo json_encode($data);
exit();