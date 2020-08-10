<?php

$file = fopen("../other/path.txt", 'r') or die("не удалось открыть файл");
$path = fgets($file);
fclose($file);

$token = $_REQUEST['token'];
$url = $path . "/webhook/telegram.webhook.php";

$result = json_decode(file_get_contents("https://api.telegram.org:443/bot" . $token . "/setwebhook?url=" . $url));

$fd = fopen("../other/telegram.token.php", 'w') or die("не удалось создать файл");
$str = '<?php class telegramToken{public $token = "' . $_REQUEST['token'] . '";}';
fwrite($fd, $str);
fclose($fd);

$data = [
	'result' => 'success',
	'responce' => $result
];
header('Content-Type: text/json; charset=utf-8');
echo json_encode($data);
exit();