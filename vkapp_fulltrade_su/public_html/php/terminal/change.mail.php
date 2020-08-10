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


$try = R::findOne('users', 'mail = ?', [$_REQUEST['mail']]);

if (!isset($try)) {
	$change = R::load('users', $userData['id']);
	$change->newaction = 1;
	$change->mail = $_REQUEST['mail'];
	R::store($change);
}else{
	$data = [
		'result' => 'Error',
		'message' => 'Mail has been used'
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}


$data = [
	'result' => 'Success'
];
header('Content-Type: text/json; charset=utf-8');
echo json_encode($data);
exit();