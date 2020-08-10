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

$log = R::findOne('logs', 'token = ?', [$_REQUEST['token']]);

if (!isset($log)) {
	$data = [
		'result' => 'error',
		'code' => 4
	];
}

$user = R::load('users', $log['user']);
$user->firstname = $_REQUEST['firstName'];
$user->lastname = $_REQUEST['lastName'];
$user->phone = $_REQUEST['phone'];
R::store($user);

$data = [
	'result' => 'success'
];

header('Content-Type: text/json; charset=utf-8');
echo json_encode($data);
exit();