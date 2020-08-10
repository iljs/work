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

if ($userData['pay'] == 0) {
	$data = [
		'result' => 'Success',
		'message' => 'NoPay'
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}

if ($userData['verify'] == 0) {
	$data = [
		'result' => 'Success',
		'message' => 'NoVerify'
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}

$data = [
	'result' => 'Success',
	'message' => 'Form'
];

header('Content-Type: text/json; charset=utf-8');
echo json_encode($data);