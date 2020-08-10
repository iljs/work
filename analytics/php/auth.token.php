<?php

require '../libs/connect.php';

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);


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

$report = R::findOne('config', 'id = ?', [$_REQUEST['table']]);

if ($report['user'] != $userData['id']) {
	$data = [
		'result' => 'Error'
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}

$data = [
	'result' => 'Success',
	'userData' => [
		'id' => $userData['id']
	],
	'tableData' => [
		'id' => $report['id'],
		'sample' => $report['sample']
	]
];

header('Content-Type: text/json; charset=utf-8');
echo json_encode($data);
exit();

