<?php

require '../../libs/connect.php';

function check($var1, $var2){
    if(($var1 == 1) || ($var2 == 1)){
        return 1;
    }else{
        return 0;
    }
}

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

$user = R::findOne('users', 'mail = ?', [$_REQUEST['mail']]);

if (!isset($user)) {
    $data = [
	    'result' => 'Error',
	    'data' => [
	    	'type' => "User don't found"
	    ]
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}
    
if (sha1($_REQUEST['password']) != $user['password']) {
    $data = [
	    'result' => 'Error',
	    'data' => [
	    	'type' => 'Password is incorrect'
	    ]
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}

$change = R::load('users', $user['id']);
$change->newaction = 1;
$change->vkid = $userData['vkid'];
$change->verify = check($userData['verify'], $user['verify']);
$change->pay = check($userData['pay'], $user['pay']);
$change->real_balance = ($userData['real_balance'] + $user['real_balance']);
$change->demo_balance = ($userData['demo_balance'] + $user['demo_balance']);
$change->paysum = ($userData['paysum'] + $user['paysum']);
R::store($change);

$delete = R::load('users', $userData['id']);
R::trash($delete);

$data = [
	'result' => 'Success'
];

header('Content-Type: text/json; charset=utf-8');
echo json_encode($data);
exit();