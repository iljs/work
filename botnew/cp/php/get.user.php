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

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}

$log = R::findOne('logs', 'token = ?', [$_REQUEST['token']]);

if (!isset($log)) {
	$data = [
		'result' => 'error',
		'code' => 4
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}

$user = R::findOne('users', 'id = ?', [$log['user']]);

if (($_REQUEST['isUpdate'] == 1) || ($user['updateAction'] == 1)) {
	$userUpdate = R::load('users', $user['id']);
	$userUpdate->updateAction = 0;
	R::store($userUpdate);

	$data = [
		'result' => 'success',
		'isUpdate' => 1,
		'userInfo' => [
			'mail' => $user['mail'],
			'firstName' => $user['firstname'],
			'lastName' => $user['lastname'],
			'phone' => $user['phone'],
			'balance' => $user['balance']
		]
	];
}else{
	$data = [
		'result' => 'success',
		'isUpdate' => 0
	];
}

header('Content-Type: text/json; charset=utf-8');
echo json_encode($data);
exit();