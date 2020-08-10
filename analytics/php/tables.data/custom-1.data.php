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




$result = json_decode(file_get_contents(("https://ijbglobal.ru/dev/analytics/php/auth.token.php?token=" . $_REQUEST['token'] . "&table=" . $_REQUEST['table'])));

if ($result->result != 'Success') {
	$data = [
	    'result' => 'Error'
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}

if ($result->tableData->sample == 'custom_1') {
	$r = R::findOne('custom1', 'id = ?', [$_REQUEST['id']]);

	$nameBD = R::load('names', $r['wallet']);

	$data = [
		'result' => 'Success',
		'data' => [
		    'id' => $r['id'],
		    'contractor' => $r['contractor'],
		    'type' => $r['type'],
		    'wallet' => $nameBD->name,
		    'sum' => $r['sum'],
		    'date' => $r['date'],
		    'reg' => $r['reg']
		]
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}