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

$refers = [];


$stats = R::findAll('stats');
$users = R::findAll('users');
$bets = R::findAll('bet');

$dayTransitions = 0;
$weekTransitions = 0;
$monthTransitions = 0;
$allTransitions = 0;

$dayUsers = 0;
$weekUsers = 0;
$monthUsers = 0;
$allUsers = 0;

$dayDeposits = 0;
$weekDeposits = 0;
$monthDeposits = 0;
$allDeposits = 0;

$dayWithdraw = 0;
$weekWithdraw = 0;
$monthWithdraw = 0;
$allWithdraw = 0;

$dayDemoWins = 0;
$weekDemoWins = 0;
$monthDemoWins = 0;
$allDemoWins = 0;

$dayDemoLose = 0;
$weekDemoLose = 0;
$monthDemoLose = 0;
$allDemoLose = 0;

$dayRealWins = 0;
$weekRealWins = 0;
$monthRealWins = 0;
$allRealWins = 0;

$dayRealLose = 0;
$weekRealLose = 0;
$monthRealLose = 0;
$allRealLose = 0;

$day = date('d');
$week = date('W');
$month = date('m');

foreach ($stats as $key => $value) {
	if ($userData['refcode'] == $value->refer) {
		$dayUser = date('d', $value->date);
		$weekUser = date('W', $value->date);
		$monthUser = date('m', $value->date);

		if ($dayUser == $day) {
			$dayTransitions++;
		}

		if ($weekUser == $week) {
			$weekTransitions++;
		}

		if ($monthUser == $month) {
			$monthTransitions++;
		}

		$allTransitions++;
	}
}

foreach ($users as $key => $value) {
	if ($userData['refcode'] == $value->refer) {
		$dayUser = date('d', $value->date_reg);
		$weekUser = date('W', $value->date_reg);
		$monthUser = date('m', $value->date_reg);

		if ($dayUser == $day) {
			$dayUsers++;
		}

		if ($weekUser == $week) {
			$weekUsers++;
		}

		if ($monthUser == $month) {
			$monthUsers++;
		}

		$allUsers++;
		array_push($refers, $value->id);
	}
}

foreach ($bets as $key => $value) {
	$result = array_search($value->user, $refers);
	if (is_int($result) == true) {
		if ($value->account == 0) {
			if ($value->status == 'win') {
				$dayUser = date('d', $value->time);
				$weekUser = date('W', $value->time);
				$monthUser = date('m', $value->time);

				if ($dayUser == $day) {
					$dayDemoWins = $dayDemoWins + ($value->sum*$value->procent/100);
				}

				if ($weekUser == $week) {
					$weekDemoWins = $weekDemoWins + ($value->sum*$value->procent/100);
				}

				if ($monthUser == $month) {
					$monthDemoWins = $monthDemoWins + ($value->sum*$value->procent/100);
				}

				$allDemoWins = $allDemoWins + ($value->sum*$value->procent/100);
			}
			if ($value->status == 'lose') {
				$dayUser = date('d', $value->time);
				$weekUser = date('W', $value->time);
				$monthUser = date('m', $value->time);

				if ($dayUser == $day) {
					$dayDemoLose = $dayDemoLose + $value->sum;
				}

				if ($weekUser == $week) {
					$weekDemoLose = $weekDemoLose + $value->sum;
				}

				if ($monthUser == $month) {
					$monthDemoLose = $monthDemoLose + $value->sum;
				}

				$allDemoLose = $allDemoLose + $value->sum;
			}
		}
		if ($value->account == 1) {
			if ($value->status == 'win') {
				$dayUser = date('d', $value->time);
				$weekUser = date('W', $value->time);
				$monthUser = date('m', $value->time);

				if ($dayUser == $day) {
					$dayRealWins = $dayRealWins + ($value->sum*$value->procent/100);
				}

				if ($weekUser == $week) {
					$weekRealWins = $weekRealWins + ($value->sum*$value->procent/100);
				}

				if ($monthUser == $month) {
					$monthRealWins = $monthRealWins + ($value->sum*$value->procent/100);
				}

				$allRealWins = $allRealWins + ($value->sum*$value->procent/100);
			}
			if ($value->status == 'lose') {
				$dayUser = date('d', $value->time);
				$weekUser = date('W', $value->time);
				$monthUser = date('m', $value->time);

				if ($dayUser == $day) {
					$dayRealLose = $dayRealLose + $value->sum;
				}

				if ($weekUser == $week) {
					$weekRealLose = $weekRealLose + $value->sum;
				}

				if ($monthUser == $month) {
					$monthRealLose = $monthRealLose + $value->sum;
				}

				$allRealLose = $allRealLose + $value->sum;
			}
		}
	}
}

$data = [
	'result' => 'Success',
	'link' => $userData['refcode'],
	'procent' => $userData['refprocent'],
	'transitions' => [
		'day' => $dayTransitions,
		'week' => $weekTransitions,
		'month' => $monthTransitions,
		'all' => $allTransitions
	],
	'users' => [
		'day' => $dayUsers,
		'week' => $weekUsers,
		'month' => $monthUsers,
		'all' => $allUsers
	],
	'deposits' => [
		'day' => $dayDeposits,
		'week' => $weekDeposits,
		'month' => $monthDeposits,
		'all' => $allDeposits
	],
	'withdraw' => [
		'day' => $dayWithdraw,
		'week' => $weekWithdraw,
		'month' => $monthWithdraw,
		'all' => $allWithdraw
	],
	'demoLose' => [
		'day' => $dayDemoLose,
		'week' => $weekDemoLose,
		'month' => $monthDemoLose,
		'all' => $allDemoLose
	],
	'demoWins' => [
		'day' => $dayDemoWins,
		'week' => $weekDemoWins,
		'month' => $monthDemoWins,
		'all' => $allDemoWins
	],
	'realLose' => [
		'day' => $dayRealLose,
		'week' => $weekRealLose,
		'month' => $monthRealLose,
		'all' => $allRealLose
	],
	'realWins' => [
		'day' => $dayRealWins,
		'week' => $weekRealWins,
		'month' => $monthRealWins,
		'all' => $allRealWins
	],
	'cash' => [
		'day' => (($dayRealLose-$dayRealWins)*($userData['refprocent']/100)),
		'week' => (($weekRealLose-$weekRealWins)*($userData['refprocent']/100)),
		'month' => (($monthRealLose-$monthRealWins)*($userData['refprocent']/100)),
		'all' => (($allRealLose-$allRealWins)*($userData['refprocent']/100))
	]
];

header('Content-Type: text/json; charset=utf-8');
echo json_encode($data);
exit();

