<?php

require '../libs/connect.php';

$merchant_id = '209997';
$merchant_secret = 'wjqo009s';

function getIP() {
    if(isset($_SERVER['HTTP_X_REAL_IP'])) return $_SERVER['HTTP_X_REAL_IP'];
    return $_SERVER['REMOTE_ADDR'];
}

if (!in_array(getIP(), array('136.243.38.147', '136.243.38.149', '136.243.38.150', '136.243.38.151', '136.243.38.189', '136.243.38.108'))) {
    die("hacking attempt!");
}

$sign = md5($merchant_id.':'.$_REQUEST['AMOUNT'].':'.$merchant_secret.':'.$_REQUEST['MERCHANT_ORDER_ID']);

if ($sign != $_REQUEST['SIGN']) {
	//die('wrong sign');
	print_r($sign . '<br>');
	print_r($_REQUEST['SIGN'] . '<br>');
	print_r($merchant_id.':'.$_REQUEST['AMOUNT'].':'.$merchant_secret.':'.$_REQUEST['MERCHANT_ORDER_ID']);
}

$pay = R::findOne("pay", "payid = ?", [$_REQUEST['MERCHANT_ORDER_ID']]);

if (!isset($pay)) {
	die("No Find Payment");
	exit();
}

$user = R::load('users', $pay['user']);
$user->realBalance = $user->realBalance + $pay['sum'];
$user->pay = 1;
$user->newaction = 1;
$user->balanceType = 1;
$user->paysum = $user->paysum + $pay['sum'];
R::store($user);

$payment = R::load('pay', $pay['id']);
$payment->status = 1;
R::store($payment);

$user = R::findOne('users', 'id = ?', [$pay['user']]);
$userBot = R::findOne('botusers', 'user = ?', [$user['vkid']]);

$changeBot = R::load('botusers', $userBot['id']);
$changeBot->last_real_balance = $user['real_balance'];
R::store($changeBot);

die('YES');

?>