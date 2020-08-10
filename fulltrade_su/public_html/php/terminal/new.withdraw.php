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

if ($userData['realBalance'] < $_REQUEST['sum']) {
	$data = [
		'result' => 'Error'
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}

if (500 > $_REQUEST['sum']) {
	$data = [
		'result' => 'Error'
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}

$user = R::dispense('withdraw');

$user->user = $userData['id'];
$user->data = $_REQUEST['data'];
$user->key = $_REQUEST['key'];
$user->sum = $_REQUEST['sum'];
$user->date = date('U');

R::store($user);

$change = R::load('users', $userData['id']);
$change->newaction = 1;
$change->real_balance = ((int)$change->real_balance)-((int)$_REQUEST['sum']);
R::store($change);


$data = [
	'result' => 'Success'
];

header('Content-Type: text/json; charset=utf-8');
echo json_encode($data);
exit();
