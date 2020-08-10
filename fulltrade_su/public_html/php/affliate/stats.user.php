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

$user = R::dispense('stats');
$user->refer = $_REQUEST['refer'];
$user->date = date('U');
R::store($user);

$data = [
	'result' => 'Success'
];

header('Content-Type: text/json; charset=utf-8');
echo json_encode($data);
exit();