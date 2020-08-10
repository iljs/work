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

$userData = R::findOne('users', 'vkid = ?', [$_REQUEST['vkid']]);

if (isset($userData)) {
	//if (sha1($_REQUEST['password']) == $userData['password']) {
		$token = sha1(date('U') . $_REQUEST['vkid']);

		$user = R::dispense('logs');
		$user->user = $userData['id'];
		$user->token = $token;
		$user->date = date('U');
		R::store($user);

		$change = R::load('users', $userData['id']);
		$change->newaction = 1;
		R::store($change);

		$data = [
		    'result' => 'Success',
		    'data' => [
		    	'token' => $token,
		    	'id' => $userData['id']
		    ]

		];
		header('Content-Type: text/json; charset=utf-8');
		echo json_encode($data);
	/*}else{
		$data = [
		    'result' => 'Error',
		    'data' => [
		    	'type' => "Password is incorrect"
		    ]
		];

		header('Content-Type: text/json; charset=utf-8');
		echo json_encode($data);
		exit();
	}*/
}else{
	$data = [
	    'result' => 'Error',
	    'data' => [
	    	'type' => "User don't found"
	    ]
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}