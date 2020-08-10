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

if ($userData['newaction'] == 0) {

	if($_REQUEST['update'] == 1){
		$couples = R::findAll('couples');

		foreach ($couples as $key => $value) {

		    	$couplesData['id'][] = $value->id;
		    	$couplesData['name'][] = $value->name;
		    	$couplesData['procent'][] = $value->procent;

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
						$active['now'][] = $now['price'];
						$active['price'][] = $value->price;
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
			'change' => $userData['newaction'],
			'data' => [
				'mail' => $userData['mail'],
				'balance' => $userData['balance_type'],
				'verify' => $userData['verify'],
				'realBalance' => round($userData['real_balance'], 2),
				'demoBalance' => round($userData['demo_balance'], 2),
				'couples' => $userData['save_couples'],
				'active' => $active,
				'history' => $history
			],
			'couples' => $couplesData
		];

		$change = R::load('users', $userData['id']);
		$change->newaction = 0;
		R::store($change);

		header('Content-Type: text/json; charset=utf-8');
		echo json_encode($data);
		exit();
	}else{

		$data = [
			'result' => 'Success',
			'change' => $userData['newaction']
		];

		header('Content-Type: text/json; charset=utf-8');
		echo json_encode($data);
		exit();
	}
	
}else if($userData['newaction'] == 1) {

	$couples = R::findAll('couples');

	foreach ($couples as $key => $value) {

	    	$couplesData['id'][] = $value->id;
	    	$couplesData['name'][] = $value->name;
	    	$couplesData['procent'][] = $value->procent;

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
					$active['now'][] = $now['price'];
					$active['price'][] = $value->price;
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
		'change' => $userData['newaction'],
		'data' => [
			'mail' => $userData['mail'],
			'balance' => $userData['balance_type'],
			'verify' => $userData['verify'],
			'realBalance' => $userData['real_balance'],
			'demoBalance' => $userData['demo_balance'],
			'couples' => $userData['save_couples'],
			'active' => $active,
			'history' => $history
		],
		'couples' => $couplesData
	];

	$change = R::load('users', $userData['id']);
	$change->newaction = 0;
	R::store($change);

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();

}