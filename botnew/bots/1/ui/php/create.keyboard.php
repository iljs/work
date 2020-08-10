<?php

require "../../libs/connect.php";


$unix = date('U');

$config = R::dispense('config');
$config->unix = $unix;
R::store($config);

$keyboardId = R::findOne('config', 'unix = ?',  array($unix));

foreach ($_REQUEST['array'] as $key => $value) {
	$keyboard = R::dispense('keyboard' . $keyboardId['id']);
	$keyboard->numanswer = $_REQUEST['array'][$key]['numAnswer'];
	$keyboard->textanswer = $_REQUEST['array'][$key]['textAnswer'];
	$keyboard->messageid = $_REQUEST['array'][$key]['messageId'];
	$keyboard->row = $_REQUEST['array'][$key]['row'];
	$keyboard->color = $_REQUEST['array'][$key]['color'];
	R::store($keyboard);
}

$data = [
	'result' => 'Success'
];
header('Content-Type: text/json; charset=utf-8');
echo json_encode($data);
exit();

?>