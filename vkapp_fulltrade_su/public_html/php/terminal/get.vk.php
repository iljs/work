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

$params = array(
    'access_token' => "75e5ad3f75e5ad3f75e5ad3f32758b2158775e575e5ad3f2817cd4c7da672841eeec85e",
    'user_ids' => $_REQUEST['userid'],
    'fields' => 'photo_max,city,verified,domain',
    'v' => 5.103
);
    
$user = json_decode(file_get_contents('https://api.vk.com/method/users.get?' . urldecode(http_build_query($params))), true);

$mail = 0;

if($userData['mail'] != 'None'){
    $mail = 1;
}

$data = [
	'result' => 'Success',
	'data' => [
	    'photo' => $user['response'][0]['photo_max'],
	    'name' => $user['response'][0]['first_name'] . ' ' . $user['response'][0]['last_name'],
	    'domain' => '@' . $user['response'][0]['domain'],
	    'status' => $userData['verify'],
	    'key' => substr(sha1('! @ # $ % ^ & * ( ) | ' . $userData['id']), 0, 20),
	    'mail' => $mail
	 ]
];

header('Content-Type: text/json; charset=utf-8');
echo json_encode($data);