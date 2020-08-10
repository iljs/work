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
$userData = R::findOne('users', 'id = ?', [$logData['user']]);

if (!isset($userData)) {
	$data = [
		'result' => 'Error'
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}
if ($userData['balance_type'] == 1) {
	if ($_REQUEST['bet'] > $userData['real_balance']) {
		$data = [
			'result' => 'Error'
		];

		header('Content-Type: text/json; charset=utf-8');
		echo json_encode($data);
		exit();
	}
}

if ($userData['balance_type'] == 0) {
	if ($_REQUEST['bet'] > $userData['demo_balance']) {
		$data = [
			'result' => 'Error'
		];

		header('Content-Type: text/json; charset=utf-8');
		echo json_encode($data);
		exit();
	}
}
/*
$date = date('N');

if ($date == 6) {
	$data = [
		'result' => 'Error'
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}

if ($date == 7) {
	$data = [
		'result' => 'Error'
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}
*/
$c = json_decode(file_get_contents("https://api.1forge.com/quotes?pairs=" . $_REQUEST['couples'] . "&api_key=WyiNf1i8Rp72YyBX5RL080WK4wO8kIvp"));

$couples = R::findOne('couples', 'name = ?', [$_REQUEST['couples']]);

$bet = R::dispense('bet');

$bet->user = $userData['id'];
$bet->sum = $_REQUEST['bet'];
$bet->couples = $_REQUEST['couples'];
$bet->time = (int)date('U') + ($_REQUEST['time'] * 60);
$bet->type = $_REQUEST['type'];
$bet->price = $c[0]->p;
$bet->procent = $couples['procent'];
$bet->status = 'active';
$bet->endprice = 0;
$bet->account = $userData['balance_type'];

R::store($bet);
if ($userData['balance_type'] == 1) {
	$change = R::load('users', $userData['id']);
	$change->newaction = 1;
	$change->real_balance = ((int)$change->real_balance)-((int)$_REQUEST['bet']);
	R::store($change);
}else{
	$change = R::load('users', $userData['id']);
	$change->newaction = 1;
	$change->demo_balance = ((int)$change->demo_balance)-((int)$_REQUEST['bet']);
	R::store($change);
}


$bet = R::findAll('bet');

foreach ($bet as $key => $value) {
	if ($value->user == $userData['id']) {
		if ($value->account == $userData['balance_type']) {
			if ($value->status == 'active') {
				$now = R::findOne('couples', 'name = ?', [$value->couples]);
				$active['id'][] = $value->id;
				$active['time'][] = $value->time;
				$active['type'][] = $value->type;
				$active['couples'][] = $value->couples;
				$active['sum'][] = $value->sum;
				$active['procent'][] = $value->procent;
				$active['price'][] = $value->price;
				$active['now'][] = $now['price'];
			}else{
				$history['id'][] = $value->id;
				$history['time'][] = $value->time;
				$history['type'][] = $value->type;
				$history['couples'][] = $value->couples;
				$history['sum'][] = $value->sum;
				$history['status'][] = $value->status;
				$history['procent'][] = $value->procent;
			}
		}
	}
}



$data = [
	'result' => 'Success',
	'data' => [
		'active' => $active,
		'history' => $history
	]
];
header('Content-Type: text/json; charset=utf-8');
echo json_encode($data);
exit();