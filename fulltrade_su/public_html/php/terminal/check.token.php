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
if (isset($logData)) {
	$data = [
	    'result' => 'Success'
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}else{
	$data = [
	    'result' => 'Error'
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}