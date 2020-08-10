<?php

require "../../libs/connect.php";

R::exec('DROP TABLE keyboard' . $_REQUEST['keyboardId']);

$keyboard = R::load("config", $_REQUEST['keyboardId']);
R::trash($keyboard);

$data = [
	'result' => 'Success'
];
header('Content-Type: text/json; charset=utf-8');
echo json_encode($data);
exit();
