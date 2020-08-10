<?php

require "../../libs/connect.php";

$message = R::load('message', $_REQUEST['messageId']);
R::trash($message);

$data = [
	'result' => 'Success'
];
header('Content-Type: text/json; charset=utf-8');
echo json_encode($data);
exit();

