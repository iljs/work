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

$bet = R::findOne('bet', 'id = ?', [$_REQUEST['key']]);

if ($bet['user'] != $userData['id']) {
	$data = [
		'result' => 'Error'
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}

$data = [
	'result' => 'Success',
	'data' => [
		'id' => $bet['id'],
		'couples' => $bet['couples'],
		'sum' => $bet['sum'],
		'time' => $bet['time'],
		'type' => $bet['type'],
		'procent' => $bet['procent'],
		'status' => $bet['status'],
		'account' => $bet['account'],
		'price' => $bet['price'],
		'endprice' => $bet['endprice']
	]
];

header('Content-Type: text/json; charset=utf-8');
echo json_encode($data);
exit();