<?php

require '../../libs/connect.php';

if (!isset($_REQUEST)) {
	$data = [
	    'result' => 'Error',
	    'message' => 'Request Error'
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}

$logData = R::findOne('logs', 'token = ?', [$_REQUEST['token']]);
$userData = R::findOne('users', 'id = ?', [$logData['user']]);

if (!isset($userData)) {
	$data = [
		'result' => 'Error',
		'message' => 'Token Error'
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}

if (sha1($_REQUEST['oldpassword']) != $userData['password']) {
	$data = [
		'result' => 'Error',
		'message' => 'Old Password Error'
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}


if ($_REQUEST['newpassword'] != $_REQUEST['repeatpassword']) {
	$data = [
		'result' => 'Error',
		'message' => 'New Password Error'
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}


$change = R::load('users', $userData['id']);
$change->newaction = 1;
$change->password = sha1($_REQUEST['newpassword']);
R::store($change);

$data = [
	'result' => 'Success'
];
header('Content-Type: text/json; charset=utf-8');
echo json_encode($data);
exit();