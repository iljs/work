<?php

require "../../libs/connect.php";

$message = R::dispense('message');
$message->text = $_REQUEST['text'];
$message->keyboard = $_REQUEST['keyboard'];
$message->functions = $_REQUEST['functions'];
$message->media = $_REQUEST['media'];
R::store($message);


$data = [
	'result' => 'Success'
];
header('Content-Type: text/json; charset=utf-8');
echo json_encode($data);
exit();