<?php

$file = fopen("../other/path.txt", 'r') or die("не удалось открыть файл");
$path = fgets($file);
fclose($file);

$url = "https://eu157.chat-api.com/instance" . $_REQUEST['instanceId'] . "/";
$token = $_REQUEST['token'];
$webhook = $path . "/webhook/whatsapp.webhook.php";

$ch = curl_init($url . 'webhook?token=' . $token);  
curl_setopt($ch, CURLOPT_POST, 1);  
curl_setopt($ch, CURLOPT_POSTFIELDS, array('webhookUrl' => $webhook));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, false);
$res = curl_exec($ch);
curl_close($ch);


$fd = fopen("../other/whatsapp.token.php", 'w') or die("не удалось создать файл");
$str = '<?php class whatsAppToken{public $token = "' . $_REQUEST['token'] . '";}';
fwrite($fd, $str);
fclose($fd);


$data = [
	'result' => 'success',
	'responce' => json_decode($res)
];
header('Content-Type: text/json; charset=utf-8');
echo json_encode($data);
exit();