<?php


require "../libs/connect.php";
require '../sys/other/whatsapp.token.php';


$token = new whatsAppToken();

define('__WHATSAPP__', $token->token);


require '../sys/get.functions.php';

$data = json_decode(file_get_contents('php://input'));

if ($data->messages[0]->fromMe == true) {
	exit();
}

$token = __WHATSAPP__;
$user_id = $data->messages[0]->chatId;
$message = $data->messages[0]->body;
$name = $data->messages[0]->senderName;

$instanceId = $data->instanceId;

$allData = json_decode(getFunctions::sendRequestBrain($user_id, $name, $message, 'WhatsApp'));

if ($allData->body->type == 'bot') {
	$keyboard = getFunctions::keyboardToText($allData->body->keyboard->data);
	$message = $allData->body->message . $keyboard;
	$attachment = $allData->body->attachment;

	getFunctions::customFunctions($allData->body->my_id, $allData->body->functions);

	getFunctions::controlSendMessagesWhatsApp($user_id, $message, $attachment, $instanceId, $token);

}

if ($allData->body->type == 'buffer') {
	getFunctions::saveBuffer($allData->body->my_id, $message);

	$keyboard = getFunctions::keyboardToText($allData->body->keyboard->data);
	$message = $allData->body->message . $keyboard;
	$attachment = $allData->body->attachment;

	getFunctions::customFunctions($allData->body->my_id, $allData->body->functions);

	getFunctions::controlSendMessagesWhatsApp($user_id, $message, $attachment, $instanceId, $token);
}

if ($allData->body->type == 'chat') {

	$media = json_decode(getFunctions::saveFilesWhatsApp($data->messages[0]));
	getFunctions::saveMessageFromChat($allData->body->my_id, $media->message, $media->media);
}

echo "ok";