<?php
/*
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
*/

require "../libs/connect.php";
require '../sys/other/vk.token.php';
require '../sys/other/vk.confirmation.token.php';
require '../sys/other/vk.secret.key.php';


$token = new vkToken();
$confirmation = new vkConfirmationToken();
$secret = new vkSecretKey();

define('__VK__', $token->token);


require '../sys/get.functions.php';

$confirmationToken = $confirmation->token;
$token = __VK__;
$secretKey = $secret->key;

$data = json_decode(file_get_contents('php://input'));

if((strcmp($data->secret, $secretKey) !== 0) && (strcmp($data->type, 'confirmation') !== 0)){
 	return;
}

if($data->type == "message_new"){
	$user_id = $data->object->user_id;
	$message = trim($data->object->body);

	$name = getFunctions::getUserInfoVk($user_id, $token);
	$allData = json_decode(getFunctions::sendRequestBrain($user_id, $name, $message, 'VK'));

	if ($allData->body->type == 'bot') {
		$message = $allData->body->message;
		$keyboard = getFunctions::keyboardGenerateVk($allData->body->keyboard->data, $allData->body->keyboard->sort);
		$attachment = getFunctions::uploadFilesVk($user_id, $allData->body->attachment, $token);

		getFunctions::customFunctions($allData->body->my_id, $allData->body->functions);

		getFunctions::sendMessageVk($user_id, $message, $keyboard, $attachment, $token);
	}

	if ($allData->body->type == 'buffer') {
		getFunctions::saveBuffer($allData->body->my_id, $message);

		$message = $allData->body->message;
		$keyboard = getFunctions::keyboardGenerateVk($allData->body->keyboard->data, $allData->body->keyboard->sort);
		$attachment = getFunctions::uploadFilesVk($user_id, $allData->body->attachment, $token);

		getFunctions::customFunctions($allData->body->my_id, $allData->body->functions);

		getFunctions::sendMessageVk($user_id, $message, $keyboard, $attachment, $token);
	}

	if ($allData->body->type == 'chat') {
		$media = getFunctions::saveFilesVk($data->object);
		getFunctions::saveMessageFromChat($allData->body->my_id, $message, $media);
	}

	echo "ok";
}

if($data->type == "confirmation"){
	echo $confirmationToken;
}
