<?php

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

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


function recurse_copy($src,$dst) { 
    $dir = opendir($src); 
    @mkdir($dst); 
    while(false !== ( $file = readdir($dir)) ) { 
        if (( $file != '.' ) && ( $file != '..' )) { 
            if ( is_dir($src . '/' . $file) ) { 
                recurse_copy($src . '/' . $file,$dst . '/' . $file); 
            } 
            else { 
                copy($src . '/' . $file,$dst . '/' . $file); 
            } 
        } 
    } 
    closedir($dir); 
} 

$src = "../config/";
$dst = "../../bots/" . $_REQUEST['id'] . "/";

recurse_copy($src, $dst);




$fd = fopen("../../bots/" . $_REQUEST['id'] . "/sys/other/path.txt", 'w') or die("не удалось создать файл");
$str = 'https://ijbglobal.ru/botnew/bots/' . $_REQUEST['id'];
fwrite($fd, $str);
fclose($fd);

unset($fd);

$fd = fopen("../../bots/" . $_REQUEST['id'] . "/libs/bot.id.php", 'w') or die("не удалось создать файл");
$str = '<?php class botId{public $id = "' . $_REQUEST['id'] . '";}';
fwrite($fd, $str);
fclose($fd);


$data = [
	'result' => 'Success'
];
header('Content-Type: text/json; charset=utf-8');
echo json_encode($data);
exit();