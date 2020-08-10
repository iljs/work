<?php

require '../libs/connect.php';

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

$userData = R::findOne('users', 'login = ?', [$_REQUEST['login']]);

if (isset($userData)) {
	if ($_REQUEST['password'] == $userData['password']) {
		$token = sha1(date('U') . sha1($_REQUEST['password']) . $_REQUEST['login']);

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
	}else{
		$data = [
		    'result' => 'Error',
		    'data' => [
		    	'type' => 2
		    ]
		];

		header('Content-Type: text/json; charset=utf-8');
		echo json_encode($data);
		exit();
	}
}else{
	$data = [
	    'result' => 'Error',
	    'data' => [
	    	'type' => 1
	    ]
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}