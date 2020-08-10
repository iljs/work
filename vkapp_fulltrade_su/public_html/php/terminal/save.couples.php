<?php
/*
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
*/
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
if ($_REQUEST['type'] == 'update') {
	$couples = explode(',', $userData['save_couples']);
	$couples[$_REQUEST['couples_id']] = $_REQUEST['couples'];

	$str = $couples[0];
	$c = count($couples);
	for ($i=0; $i < ($c-1); $i++) { 
		$str = $str . ',' . $couples[($i+1)];
	}

	$user = R::load('users', $userData['id']);
	$user->save_couples = $str;
	$user->newaction = 1;
	R::store($user);

	$couples = R::findAll('couples');

	foreach ($couples as $key => $value) {
	    $couplesData['id'][] = $value->id;
	    $couplesData['name'][] = $value->name;
	    $couplesData['procent'][] = $value->procent;
	}

	$data = [
		'result' => 'Success',
		'data' => [
			'couples' => $str
		],
		'couples' => $couplesData
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}

if ($_REQUEST['type'] == 'new') {
	$str = $userData['save_couples'] . ',' . $_REQUEST['couples'];

	$user = R::load('users', $userData['id']);
	$user->save_couples = $str;
	$user->newaction = 1;
	R::store($user);

	$couples = R::findAll('couples');

	foreach ($couples as $key => $value) {
	    $couplesData['id'][] = $value->id;
	    $couplesData['name'][] = $value->name;
	    $couplesData['procent'][] = $value->procent;
	}

	$data = [
		'result' => 'Success',
		'data' => [
			'couples' => $str
		],
		'couples' => $couplesData
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}

if ($_REQUEST['type'] == 'delete') {
	$couples = explode(',', $userData['save_couples']);

	$str = $couples[0];
	$c = count($couples);
	for ($i=0; $i < ($c-1); $i++) { 
		if ($_REQUEST['couples_id'] == ($i+1)) {
			# code...
		}else{
			$str = $str . ',' . $couples[($i+1)];
		}
	}

	$user = R::load('users', $userData['id']);
	$user->save_couples = $str;
	$user->newaction = 1;
	R::store($user);

	$data = [
		'result' => 'Success',
		'data' => [
			'couples' => $str
		],
		'couples' => $couplesData
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}