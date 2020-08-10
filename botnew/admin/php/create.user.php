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

$message = R::dispense('users');
$message->firstname = "";
$message->lastname = "";
$message->mail = $_REQUEST['mail'];
$message->phone = "";
$message->password = sha1($_REQUEST['password']);
$message->status = 1;
$message->balance = 0;
$message->date = date("U");
R::store($message);


$data = [
	'result' => 'Success'
];
header('Content-Type: text/json; charset=utf-8');
echo json_encode($data);
exit();