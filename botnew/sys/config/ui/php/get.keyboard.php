<?php

require "../../libs/connect.php";

$keyboard = R::findAll("keyboard" . $_REQUEST['keyboardId']);

foreach ($keyboard as $key => $value) {
	$keyboardData[$key]['id'] = $value->id;
	$keyboardData[$key]['numAnswer'] = $value['numanswer'];
	$keyboardData[$key]['textAnswer'] = $value['textanswer'];
	$keyboardData[$key]['messageId'] = $value['messageid'];
	$keyboardData[$key]['row'] = $value['row'];
	$keyboardData[$key]['color'] = $value['color'];
}

$data = [
	'result' => 'Success',
	'data' => [
		'keyboard' => $keyboardData
	]
];
header('Content-Type: text/json; charset=utf-8');
echo json_encode($data);
exit();