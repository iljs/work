<?php

require '../../libs/connect.php';

$couples = R::findAll('couples');

foreach ($couples as $key => $value) {

    	$couplesData['id'][] = $value->id;
    	$couplesData['name'][] = $value->name;
    	$couplesData['procent'][] = $value->procent;

}

$data = [
	'result' => 'Success',
	'couples' => $couplesData
];
header('Content-Type: text/json; charset=utf-8');
echo json_encode($data);
exit();