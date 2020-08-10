<?php

require '../../libs/table.php';

if (!isset($_REQUEST)) {

	$data = [
	    'result' => 'Error'
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}

if ($_REQUEST['token'] != '512cf166bdbdfe63405e4b760868094bbb154a85') {
	$data = [
	    'result' => 'Error'
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}

R::wipe('table1');