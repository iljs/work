<?php

require '../libs/connect.php';

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

$date = date('U');

$user = R::dispense('pay');

$user->user = $userData['id'];
$user->payid = $date;
$user->sum = $_REQUEST['sum'];
$user->status = 0;

R::store($user);

$merchant_id = '209997';
$secret_word = 'y0ry8unf';
$order_id = $date;
$order_amount = $_REQUEST['sum'];
$sign = md5($merchant_id.':'.$order_amount.':'.$secret_word.':'.$order_id);
if ($_REQUEST['key'] == 'card') {
    $code = 160;
}
else if ($_REQUEST['key'] == 'yandex') {
    $code = 45;
}
else if ($_REQUEST['key'] == 'qiwi') {
    $code = 63;
}else{
    $params = [
		'm' => $merchant_id,
		'oa' => $order_amount,
		'o' => $order_id,
		's' => $sign
	];

	$site = 'https://www.free-kassa.ru/merchant/cash.php?' . urldecode(http_build_query($params));
	header('location: ' . $site);	
}

$params = [
	'm' => $merchant_id,
	'oa' => $order_amount,
	'o' => $order_id,
	's' => $sign,
	'i' => $code
];

$site = 'https://www.free-kassa.ru/merchant/cash.php?' . urldecode(http_build_query($params));
header('location: ' . $site);

?>