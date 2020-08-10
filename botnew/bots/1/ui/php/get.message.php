<?php

require "../../libs/connect.php";

$message = R::load('message', $_REQUEST['messageId']);

$dataMessage = [
	"id" => $message->id,
	"text" => $message->text,
	"keyboard" => $message->keyboard,
	"functions" => $message->functions,
	"media" => $message->media
];

$data = [
	'result' => 'Success',
	'data' => [
		'message' => $dataMessage
	]
];
header('Content-Type: text/json; charset=utf-8');
echo json_encode($data);
exit();
