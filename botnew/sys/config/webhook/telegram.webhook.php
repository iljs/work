<?php

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

require "../libs/connect.php";
require '../sys/other/telegram.token.php';


$token = new telegramToken();

define('__TELEGRAM__', $token->token);


require '../sys/get.functions.php';


$data = json_decode(file_get_contents('php://input'), true);

if (empty($data['message']['chat']['id'])) {
    exit();
}

$token = __TELEGRAM__;
$user_id = $data['message']['chat']['id'];
$message = trim($data['message']['text']);
$name = $data['message']['chat']['first_name'];

$allData = json_decode(getFunctions::sendRequestBrain($user_id, $name, $message, 'Telegram'));

if ($allData->body->type == 'bot') {
	$message = $allData->body->message;
	$keyboard = getFunctions::keyboardGenerateTelegram($allData->body->keyboard->data, $allData->body->keyboard->sort);
	$attachment = $allData->body->attachment;

	getFunctions::customFunctions($allData->body->my_id, $allData->body->functions);

	getFunctions::controlSendMessagesTelegram($user_id, $message, $keyboard, $attachment, $token);
}

if ($allData->body->type == 'buffer') {
	getFunctions::saveBuffer($allData->body->my_id, $message);

	$message = $allData->body->message;
	$keyboard = getFunctions::keyboardGenerateTelegram($allData->body->keyboard->data, $allData->body->keyboard->sort);
	$attachment = $allData->body->attachment;

	getFunctions::customFunctions($allData->body->my_id, $allData->body->functions);

	getFunctions::controlSendMessagesTelegram($user_id, $message, $keyboard, $attachment, $token);
}

if ($allData->body->type == 'chat') {

	$media = json_decode(getFunctions::saveFilesTelegram($data, $token));
	getFunctions::saveMessageFromChat($allData->body->my_id, $media->message, $media->media);
}

