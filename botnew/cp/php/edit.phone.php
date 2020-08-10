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

if ($user['password'] != sha1($_REQUEST['password'])) {
	$data = [
		'result' => 'error',
		'code' => 3
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}

$edit = R::load('users', $log['user']);
$edit->phone = $_REQUEST['phone'];
$edit->updateAction = 1;
R::store($edit);

$data = [
	'result' => 'success'
];


header('Content-Type: text/json; charset=utf-8');
echo json_encode($data);
exit();