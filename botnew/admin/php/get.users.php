<?php

require '../libs/connect.php';

if (!isset($_REQUEST)) {
	$data = [
		'result' => 'Error'
	];
	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}

if ($_REQUEST['token'] != 'd3a284b3d63b6f077d68825e8e5028c911d40c31') {
	$data = [
		'result' => 'Error'
	];
	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}

$users = R::findAll('users');

foreach ($users as $key => $value) {
	$usersData['id'][] = $value->id;
	$usersData['mail'][] = $value->mail;
	$usersData['balance'][] = $value->balance;
	$usersData['status'][] = $value->status;
}

$data = [
	'result' => 'Success',
	'users' => $usersData
];
header('Content-Type: text/json; charset=utf-8');
echo json_encode($data);
exit();

