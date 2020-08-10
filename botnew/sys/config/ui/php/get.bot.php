<?php

require "../../libs/connect.php";

$message = R::findAll('message');
$config = R::findAll('config');

foreach ($message as $key => $value) {
	$messageData[$key]['id'] = $value->id;
	$messageData[$key]['text'] = $value->text;
	$messageData[$key]['keyboard'] = $value->keyboard;
	$messageData[$key]['functions'] = $value->functions;
	$messageData[$key]['media'] = $value->media;
}

foreach ($config as $key => $value) {
	$keyboard = R::findAll('keyboard' . $value->id);
	foreach ($keyboard as $k => $v) {
		$keyboardData[$key][$k]['id'] = $value->id;
		$keyboardData[$key][$k]['numAnswer'] = $v['numanswer'];
		$keyboardData[$key][$k]['textAnswer'] = $v['textanswer'];
		$keyboardData[$key][$k]['messageId'] = $v['messageid'];
		$keyboardData[$key][$k]['row'] = $v['row'];
		$keyboardData[$key][$k]['color'] = $v['color'];
	}
}

$data = [
	'result' => 'Success',
	'data' => [
		'message' => $messageData,
		'keyboard' => $keyboardData
	]
];
header('Content-Type: text/json; charset=utf-8');
echo json_encode($data);
exit();