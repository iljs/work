<?php

require '../../libs/connect.php';

if (!isset($_REQUEST)) {
	$data = [
	    'result' => 'Error'
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}

$logData = R::findOne('logs', 'token = ?', [$_REQUEST['token']]);
$userData = R::findOne('users', 'id = ?', [$logData['user']]);

if (!isset($userData)) {
	$data = [
		'result' => 'Error'
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}

if ($userData['balance_type'] == 1) {

	$change = R::load('users', $userData['id']);
	$change->balance_type = 0;
	$change->newaction = 1;
	R::store($change);

	$data = [
		'result' => 'Success'
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
	
}

if ($userData['balance_type'] == 0) {

	$change = R::load('users', $userData['id']);
	$change->balance_type = 1;
	$change->newaction = 1;
	R::store($change);

	$data = [
		'result' => 'Success'
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
	
}
