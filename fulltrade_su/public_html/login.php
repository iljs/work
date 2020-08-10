<?php
require './libs/connect.php';

if (!isset($_REQUEST)) {
	$data = [
	    'result' => 'Error',
	    'data' => [
	    	'type' => 'RequestError'
	    ]

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

setcookie("fulltrade", $_REQUEST['token'], time()+86400);
header("location: ./terminal");

?>