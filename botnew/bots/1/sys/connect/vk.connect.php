<?php

$file = fopen("../other/path.txt", 'r') or die("не удалось открыть файл");
$path = fgets($file);
fclose($file);

$fd = fopen("../other/vk.token.php", 'w') or die("не удалось создать файл");
$str = '<?php class vkToken{public $token = "' . $_REQUEST['token'] . '";}';
fwrite($fd, $str);
fclose($fd);

unset($fd);

$fd = fopen("../other/vk.confirmation.token.php", 'w') or die("не удалось создать файл");
$str = '<?php class vkConfirmationToken{public $token = "' . $_REQUEST['confirmationToken'] . '";}';
fwrite($fd, $str);
fclose($fd);

unset($fd);

$fd = fopen("../other/vk.secret.key.php", 'w') or die("не удалось создать файл");
$str = '<?php class vkSecretKey{public $key = "' . $_REQUEST['secretKey'] . '";}';
fwrite($fd, $str);
fclose($fd);

$data = [
	'result' => 'success',
	'url' => $path . "/webhook/vk.webhook.php",
	'responce' => $result
];
header('Content-Type: text/json; charset=utf-8');
echo json_encode($data);
exit();