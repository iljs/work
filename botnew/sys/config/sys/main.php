<?php

require "../libs/connect.php";
/*
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
*/

function newUser($user_id, $name, $messanger)
{
	$user = R::dispense('users');

    $user ->userid = $user_id;
    $user ->message = 1;
    $user ->messanger = $messanger;
    $user ->name = $name;
    $user ->status = 1;
    $user ->buffer = "";
    $user ->unix = date('U');

    R::store($user);
}

function keyboardEncode($keyboard_array)
{
	foreach ($keyboard_array as $key => $value) {
		if (isset($keyboard)) {
            $last = end($keyboard);
            if($last[0] == $value->row){
                $c = (count($keyboard)) - 1;
                $keyboard[$c][1]++;
            }else{
                $keyboard[] = [$value->row, 1];
            }
        }else{
            $keyboard[] = [$value->row, 1];
        }
	}
	return json_encode($keyboard);
}

function updateMessage($message_id, $my_id)
{
	$user = R::load('users', $my_id);
    $user ->message = $message_id;
    $user ->unix = date('U');
    $user ->status = 1;
    R::store($user);
}

function main($message_id, $my_id){

	$user = R::findOne('users', 'id = ?', [$my_id]);

	if($message_id != 0){
		$message = R::findOne('message', 'id = ?', [$message_id]);

		updateMessage($message_id, $my_id);

		$keyboard = R::findAll('keyboard' . $message['keyboard']);
		$keyboardSort = json_decode(keyboardEncode($keyboard));

		$body = [
			'type' => 'bot',
			'my_id' => $my_id,
			'message' => $message['text'],
			'keyboard' => [
				'data' => $keyboard,
				'sort' => $keyboardSort
			],
			'attachment' => $message['media'],
			'functions' => $message['functions']
		];

		return json_encode($body);
	}

	if ($message_id == 0) {
		if ($user['status'] == 1) {
			$message = R::findOne('message', 'id = ?', [$user['message']]);

			$keyboard = R::findAll('keyboard' . $message['keyboard']);
			$keyboardSort = json_decode(keyboardEncode($keyboard));

			$body = [
				'type' => 'bot',
				'my_id' => $my_id,
				'message' => $message['text'],
				'keyboard' => [
					'data' => $keyboard,
					'sort' => $keyboardSort
				],
				'attachment' => $message['media'],
				'functions' => $message['functions']
			];

			return json_encode($body);
		}

		if ($user['status'] == 2) {
			$body = [
				'type' => 'chat',
				'my_id' => $my_id
			];

			return json_encode($body);
		}

		if ($user['status'] == 3) {
			$message_all = R::findAll('message');

			foreach ($message_all as $key => $value) {	
				$functions_array = explode(';', $value->functions);
				foreach ($functions_array as $key => $function) {
					if ($function == 'afterBuffer') {
						$message = R::findOne('message', 'id = ?', [$value->id]);
					}
				}
			}

			updateMessage($message['id'], $my_id);

			$keyboard = R::findAll('keyboard' . $message['keyboard']);
			$keyboardSort = json_decode(keyboardEncode($keyboard));

			$body = [
				'type' => 'buffer',
				'my_id' => $my_id,
				'message' => $message['text'],
				'keyboard' => [
					'data' => $keyboard,
					'sort' => $keyboardSort
				],
				'attachment' => $message['media'],
				'functions' => $message['functions']
			];

			return json_encode($body);
		}
	}
}




if (!isset($_REQUEST)) {
	$data = [
		'result' => 'error',
		'code' => 1
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}




// Vars
$user_id = $_REQUEST['user_id'];
$name = $_REQUEST['name'];
$message = $_REQUEST['message'];
$messanger = $_REQUEST['messanger'];


$user = R::findOne('users', 'userid = ? AND messanger = ?', [$user_id, $messanger]);

if (isset($user)) {

	$message_info = R::findOne('message', 'id = ?', [$user['message']]);
	$keyboard_now = R::findAll('keyboard' . $message_info['keyboard']);

	$message_new = 0;

	foreach ($keyboard_now as $key => $value) {
		if ((int)$value->numanswer == (int)$message){
			$message_new = $value->messageid;
		}
		if ($value->textanswer == $message) {
			$message_new = $value->messageid;		
		}
	}

	$body = json_decode(main($message_new, $user['id']));
}

if (!isset($user)) {
	newUser($user_id, $name, $messanger);
	$user = R::findOne('users', 'userid = ? AND messanger = ?', [$user_id, $messanger]);

	$body = json_decode(main(1, $user['id']));
}





$data = [
	'result' => 'success',
	'body' => $body
];
header('Content-Type: text/json; charset=utf-8');
echo json_encode($data);
exit();