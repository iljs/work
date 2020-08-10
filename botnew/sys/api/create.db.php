<?php

if (!isset($_REQUEST)) {
	$data = [
	    'result' => 'Error',
	    'type' => 1
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}

if ($_REQUEST['token'] != 'd3a284b3d63b6f077d68825e8e5028c911d40c31') {
	$data = [
	    'result' => 'Error',
	    'type' => 2
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}


$conn = new mysqli('localhost', 'admin', 'gaepeY7Mu8ee');

if ($conn->connect_error) {
    $data = [
	    'result' => 'Error',
	    'type' => 3,
	    'message' => $conn->connect_error
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);

	$conn->close();
	exit();
}

$sql = "CREATE DATABASE botnew" . $_REQUEST['id'];
if ($conn->query($sql) === TRUE) {
    $data = [
	    'result' => 'Success'
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);

	$conn->close();
	exit();
}else{
    $data = [
	    'result' => 'Error',
	    'type' => 3,
	    'message' => $conn->error
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);

	$conn->close();
	exit();
}