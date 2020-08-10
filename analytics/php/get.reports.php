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

$reports = R::findAll('config');

foreach ($reports as $key => $value) {
	if ($value->user == $userData['id']) {
		$reportsData['id'][] = $value->id;
		$reportsData['name'][] = $value->name;
		$reportsData['type'][] = $value->type;
	}
}

$data = [
	'result' => 'Success',
	'data' => [
		'reports' => $reportsData
	]
];

header('Content-Type: text/json; charset=utf-8');
echo json_encode($data);