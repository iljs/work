<?php

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

require '../../bots/' . $_REQUEST['id'] . '/libs/connect.php';

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

$filename = '../../bots/' . $_REQUEST['id'] . '/sys/other/bot.sql';

$templine = '';
// Read in entire file
$lines = file($filename);

foreach ($lines as $line)
{
	if (substr($line, 0, 2) == '--' || $line == '')
	    continue;

	// Add this line to the current segment
	$templine .= $line;
	// If it has a semicolon at the end, it the end of the query
	if (substr(trim($line), -1, 1) == ';')
	{
	    // Perform the query
	    R::exec($templine);
	    // Reset temp variable to empty
	    $templine = '';
	}
}

$data = [
	'result' => 'Success'
];
header('Content-Type: text/json; charset=utf-8');
echo json_encode($data);
exit();