<?php

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

require '../libs/connect.php';

if (!isset($_REQUEST)) {
	$data = [
		'result' => 'Error'
	];
	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}

if ($_REQUEST['token'] != 'd3a284b3d63b6f077d68825e8e5028c911d40c31') {
	$data = [
		'result' => 'Error'
	];
	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}

$date = date('U');
$token = sha1($_REQUEST['admin'] . " | " . $date . " | " . $_REQUEST['pay']);

$bots = R::dispense('groups');
$bots->admin = $_REQUEST['admin'];
$bots->editors = "";
$bots->pay = $_REQUEST['pay'];
$bots->botWork = 1;
$bots->token = $token;
$bots->date = $date;
$bots->endDate = $date + (3600 * 24 * 5);
$bots->vkLink = $_REQUEST['vkLink'];
$bots->telegramLink = $_REQUEST['telegramLink'];
$bots->whatsappLink = $_REQUEST['whatsappLink'];
R::store($bots);

$bot = R::findOne("groups", "date = ?", [$date]);


file_get_contents('https://ijbglobal.ru/botnew/sys/api/create.db.php?id=' . $bot['id'] . "&token=" . $_REQUEST['token']);
file_get_contents('https://ijbglobal.ru/botnew/sys/api/copy.files.php?id=' . $bot['id'] . "&token=" . $_REQUEST['token']);
file_get_contents('https://ijbglobal.ru/botnew/sys/api/copy.db.php?id=' . $bot['id'] . "&token=" . $_REQUEST['token']);


$data = [
	'result' => 'Success',
	'botId' => $bot['id'],
	'token' => $token
];
header('Content-Type: text/json; charset=utf-8');
echo json_encode($data);
exit();