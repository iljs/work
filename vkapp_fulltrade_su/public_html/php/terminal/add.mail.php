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

$logData = R::findOne('logs', 'token = ?', [$_REQUEST['token']]);
$userData = R::findOne('users', 'id = ?', [$logData['user']]);

if (!isset($userData)) {
	$data = [
		'result' => 'Error',
		'message' => 'Token Error'
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}

$user = R::findOne('users', 'mail = ?', [$_REQUEST['mail']]);

if (isset($user)) {
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

$change = R::load('users', $userData['id']);
$change->newaction = 1;
$change->mail = $_REQUEST['mail'];
$change->password = sha1($_REQUEST['password']);
R::store($change);

$data = [
	'result' => 'Success'
];

header('Content-Type: text/json; charset=utf-8');
echo json_encode($data);
exit();