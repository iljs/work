<?php

class getFunctions 
{
	public static function sendRequestBrain($user_id, $name, $message, $messanger)
	{
		$request_params = array(
            'user_id' => $user_id,
            'name' => $name,
            'message' => $message,
            'messanger' => $messanger
        );

        $get_params = html_entity_decode(http_build_query($request_params));

        $file = fopen("../sys/other/path.txt", 'r') or die("не удалось открыть файл");
		$path = fgets($file);
		fclose($file);
        
        $answer = file_get_contents($path . '/sys/main.php?' . $get_params);
        return $answer;
        
	}





	public static function getUserInfoVk($user_id, $token)
	{
		$request_params = array(
            'access_token' => $token,
            'user_ids' => $user_id,
            'fields' => 'photo_50,city,verified',
            'v' => 5.103
        );

        $get_params = http_build_query($request_params);
        $userInfo = json_decode(file_get_contents('https://api.vk.com/method/users.get?' . $get_params), true);
        return $userInfo['response'][0]['first_name'];
	}

	public static function sendMessageVk($user_id, $message, $keyboard, $attachment, $token)
	{
		$request_params = array(
            'user_id' => $user_id,
            'message' => $message,
            'keyboard' => $keyboard,
            'attachment' => $attachment,
            'access_token' => $token,
            'v' => '5.50'
	    );

	    $get_params = http_build_query($request_params);

	    file_get_contents('https://api.vk.com/method/messages.send?' . $get_params);
	}

	public static function keyboardGenerateVk($keyboard, $sort)
	{
		$keyboard = json_decode(json_encode($keyboard), true);

		$keyboard_new = [
	        'one_time'  => false,
	        'buttons'   => []
	    ];
	    $q = 1;
	    foreach ($sort as $key => $value) {
	        $buttons = [];
	        for ($i=0; $i < $value[1]; $i++) { 
	            $buttons []= [
	                'action'  => [
	                'type'  => 'text',
	                'payload' => '{"button": "' . ($i + 1). '"}', //
	                'label' => $keyboard[$q]['textanswer']
	                ],
	            'color' => $keyboard[$q]['color']
	            ];
	            $q++;
	        }
	        $keyboard_new['buttons'][] = $buttons;
	    }


	    return json_encode($keyboard_new);
	}

	public static function uploadPhotoVk($user_id, $file, $token)
	{
		$request_params = array(
			'access_token' => $token,
			'peer_id' => $user_id,
			'v' => 5.103
		);

		$response = json_decode(file_get_contents('https://api.vk.com/method/photos.getMessagesUploadServer?'. http_build_query($request_params)));

		$ch = curl_init();
        curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type:multipart/form-data"));
        curl_setopt($ch, CURLOPT_URL, $response->response->upload_url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, array("photo" => new CURLFile(dirname(__FILE__) .'/../media/' . $file)));
        curl_setopt($ch, CURLOPT_SAFE_UPLOAD, true);
        $result = json_decode(curl_exec($ch));
        curl_close($ch);

        unset($request_params);


        $request_params = array( 
            'hash' => $result->hash,
            'server' => $result->server,
            'photo' => $result->photo,
            'access_token' => $token,
            'v' => '5.92' 
        ); 

        $photo = json_decode(file_get_contents('https://api.vk.com/method/photos.saveMessagesPhoto?'. http_build_query($request_params)));

        return 'photo' . $photo->response[0]->owner_id . '_' . $photo->response[0]->id;
	}

	public static function uploadDocumentVk($user_id, $file, $token)
	{
		$request_params = array(
			'access_token' => $token,
			'peer_id' => $user_id,
			'v' => 5.103
		);

		$response = json_decode(file_get_contents('https://api.vk.com/method/docs.getMessagesUploadServer?'. http_build_query($request_params)));

		$ch = curl_init();
        curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type:multipart/form-data"));
        curl_setopt($ch, CURLOPT_URL, $response->response->upload_url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, array("file" => new CURLFile(dirname(__FILE__) .'/../media/' . $file)));
        curl_setopt($ch, CURLOPT_SAFE_UPLOAD, true);
        $result = json_decode(curl_exec($ch));
        curl_close($ch);

        unset($request_params);


        $request_params = array( 
            'title' => 'Прикрепленный документ',
            'tags' => 'tag',
            'file' => $result->file,
            'access_token' => $token,
            'v' => '5.92' 
        ); 

        $photo = json_decode(file_get_contents('https://api.vk.com/method/docs.save?'. http_build_query($request_params)));

        return 'doc' . $photo->response->doc->owner_id . '_' . $photo->response->doc->id;
	}

	public static function uploadFilesVk($user_id, $files_str, $token)
	{
		if (trim($files_str) == "") {
			return "";
		}

		$files_array = explode(';', $files_str);
		foreach ($files_array as $key => $file) {
			$format = explode('.', $file)[1];
			if ($format == 'jpg') {
				$response = self::uploadPhotoVk($user_id, $file, $token);
			}
			elseif ($format == 'png') {
				$response = self::uploadPhotoVk($user_id, $file, $token);
			}
			else{
				$response = self::uploadDocumentVk($user_id, $file, $token);
			}


			if (isset($files_result)) {
				$files_result .= ',' . $response;
			}

			if (!isset($files_result)) {
				$files_result = $response;
			}
		}

		return $files_result;
	}

	public static function saveFilesVk($object)
	{
		$file = "";
		if (isset($object->attachments)) {
			foreach ($object->attachments as $key => $value) {
				if ($value->type == 'photo') {
					$str = 'photo{' . $value->photo->photo_604;
				}
				if ($value->type == 'doc') {
					$str = 'doc{' . $value->doc->url;
				}


				if (isset($files)) {
					$files .= ";" . $str;
				}
				else {
					$files = $str;
				}
			}
		}

		return $files;
	}



	public static function keyboardGenerateTelegram($keyboard, $sort)
	{
		$keyboard = json_decode(json_encode($keyboard), true);

		$keyboard_new = [
	        "keyboard" => [], 
	        "one_time_keyboard" => true, // можно заменить на FALSE,клавиатура скроется после нажатия кнопки автоматически при True
	        "resize_keyboard" => true // можно заменить на FALSE, клавиатура будет использовать компактный размер автоматически при True
	    ];
	    $q = 1;
	    foreach ($sort as $key => $value) {
	        $buttons = [];
	        for ($i=0; $i < $value[1]; $i++) { 
	            $buttons []= [
	                "text" => $keyboard[$q]['textanswer']
	            ];
	            $q++;
	        }
	        $keyboard_new['keyboard'][] = $buttons;
	    }


	    return json_encode($keyboard_new);
	}

	public static function sendMessageTelegram($user_id, $message, $keyboard, $token)
	{
		$response = array(
	        'chat_id' => $user_id,
	        'text' => $message,
	        'reply_markup' => $keyboard
	    );

	    $ch = curl_init('https://api.telegram.org/bot' . $token . '/sendMessage');  
	    curl_setopt($ch, CURLOPT_POST, 1);  
	    curl_setopt($ch, CURLOPT_POSTFIELDS, $response);
	    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	    curl_setopt($ch, CURLOPT_HEADER, false);
	    $res = curl_exec($ch);
	    curl_close($ch);  
	}

	public static function sendPhotoTelegram($user_id, $message, $keyboard, $file, $token)
	{
		$response = array(
			'chat_id' => $user_id,
	        'caption' => $message,
	        'reply_markup' => $keyboard,
			'photo' => new CURLFile(dirname(__FILE__) .'/../media/' . $file)
		);	
				
		$ch = curl_init('https://api.telegram.org/bot' . $token . '/sendPhoto');  
		curl_setopt($ch, CURLOPT_POST, 1);  
		curl_setopt($ch, CURLOPT_POSTFIELDS, $response);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_HEADER, false);
		curl_exec($ch);
		curl_close($ch);
	}

	public static function sendDocumentTelegram($user_id, $message, $keyboard, $file, $token)
	{
		$response = array(
			'chat_id' => $user_id,
	        'caption' => $message,
	        'reply_markup' => $keyboard,
			'document' => new CURLFile(dirname(__FILE__) .'/../media/' . $file)
		);	
				
		$ch = curl_init('https://api.telegram.org/bot' . $token . '/sendDocument');  
		curl_setopt($ch, CURLOPT_POST, 1);  
		curl_setopt($ch, CURLOPT_POSTFIELDS, $response);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_HEADER, false);
		curl_exec($ch);
		curl_close($ch);
	}

	public static function controlSendMessagesTelegram($user_id, $message, $keyboard, $attachment, $token)
	{
		if (trim($attachment) == "") {
			self::sendMessageTelegram($user_id, $message, $keyboard, $token);
		}

		if (trim($attachment) != "") {
			$files = explode(';', $attachment);
			$files_count = (count($files) - 1);
			$message_other = "";

			foreach ($files as $key => $file) {
				$format = explode('.', $file)[1];
				if ($format == 'jpg') {
					if ($files_count != $key) {
						self::sendPhotoTelegram($user_id, $message_other, $keyboard, $file, $token);
					}else{
						self::sendPhotoTelegram($user_id, $message, $keyboard, $file, $token);
					}
				}
				elseif ($format == 'png') {
					if ($files_count != $key) {
						self::sendPhotoTelegram($user_id, $message_other, $keyboard, $file, $token);
					}else{
						self::sendPhotoTelegram($user_id, $message, $keyboard, $file, $token);
					}

				}
				else{
					if ($files_count != $key) {
						self::sendDocumentTelegram($user_id, $message_other, $keyboard, $file, $token);
					}else{
						self::sendDocumentTelegram($user_id, $message, $keyboard, $file, $token);
					}
				}
			}
		}
	}

	public static function saveFilesTelegram($object, $token)
	{	
		if (isset($object['message']['photo'])) {
			$photo = array_pop($object['message']['photo']);
			$ch = curl_init('https://api.telegram.org/bot' . $token . '/getFile');  
			curl_setopt($ch, CURLOPT_POST, 1);  
			curl_setopt($ch, CURLOPT_POSTFIELDS, array('file_id' => $photo['file_id']));
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_HEADER, false);
			$res = curl_exec($ch);
			curl_close($ch);
			
			$res = json_decode($res, true);
			if ($res['ok']) {
				$file = fopen("../sys/other/path.txt", 'r') or die("не удалось открыть файл");
				$path = fgets($file);
				fclose($file);

				$format = explode('.', $res['result']['file_path'])[1];


				$src  = 'https://api.telegram.org/file/bot' . $token . '/' . $res['result']['file_path'];
				$name = 'photo_' . date('U') . "." .$format;
				$dest = dirname(__DIR__) . '/media/' . $name;
				copy($src, $dest);

				$file = "photo{" . $path . "/media/" . $name;
				$message = $object['message']['caption'];
			}
		}
		elseif(isset($object['message']['document'])) {
			$document = $object['message']['document']['file_id'];
			$ch = curl_init('https://api.telegram.org/bot' . $token . '/getFile');  
			curl_setopt($ch, CURLOPT_POST, 1);  
			curl_setopt($ch, CURLOPT_POSTFIELDS, array('file_id' => $document));
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_HEADER, false);
			$res = curl_exec($ch);
			curl_close($ch);
			
			$res = json_decode($res, true);
			if ($res['ok']) {
				$file = fopen("../sys/other/path.txt", 'r') or die("не удалось открыть файл");
				$path = fgets($file);
				fclose($file);

				$format = explode('.', $res['result']['file_path'])[1];

				$src  = 'https://api.telegram.org/file/bot' . $token . '/' . $res['result']['file_path'];
				$name = 'doc_' . date('U') . "." .$format;
				$dest = dirname(__DIR__). '/media/' . $name;
				copy($src, $dest);

				$file = "doc{" . $path . "/media/" . $name;;
				$message = $object['message']['caption'];
			}
		}

		else{
			$file = "";
			$message = $object['message']['text'];
		}

		$result = [
			'message' => $message,
			'media' => $file
		];

		return json_encode($result);
	}




	public static function sendMessageWhatsApp($user_id, $message, $instanceId, $token)
	{
		$response = array(
	        'chatId' => $user_id,
	        'body' => $message
	    );

	    $ch = curl_init('https://eu157.chat-api.com/instance' . $instanceId . '/sendMessage?token=' . $token);  
	    curl_setopt($ch, CURLOPT_POST, 1);  
	    curl_setopt($ch, CURLOPT_POSTFIELDS, $response);
	    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	    curl_setopt($ch, CURLOPT_HEADER, false);
	    $res = curl_exec($ch);
	    curl_close($ch);  
	}

	public static function sendFileWhatsApp($user_id, $message, $file, $instanceId, $token)
	{
		$f = fopen("../sys/other/path.txt", 'r') or die("не удалось открыть файл");
		$path = fgets($f);
		fclose($f);


		$response = array(
			'chatId' => $user_id,
	        'caption' => $message,
			'body' => $path .'/media/' . $file,
			'filename' => $file
		);	
				
		$ch = curl_init('https://eu157.chat-api.com/instance' . $instanceId . '/sendFile?token=' . $token);  
		curl_setopt($ch, CURLOPT_POST, 1);  
		curl_setopt($ch, CURLOPT_POSTFIELDS, $response);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_HEADER, false);
		curl_exec($ch);
		curl_close($ch);
	}

	public static function controlSendMessagesWhatsApp($user_id, $message, $attachment, $instanceId, $token)
	{
		if (trim($attachment) == "") {
			self::sendMessageWhatsApp($user_id, $message, $instanceId, $token);
		}

		if (trim($attachment) != "") {
			$files = explode(';', $attachment);
			$files_count = (count($files) - 1);
			$message_other = "";

			foreach ($files as $key => $file) {
				if ($files_count != $key) {
					self::sendFileWhatsApp($user_id, $message_other, $file,  $instanceId, $token);
				}else{
					self::sendFileWhatsApp($user_id, $message, $file, $instanceId, $token);
				}
			}
		}	
	}

	public static function saveFilesWhatsApp($object)
	{	
		if ($object->type != 'chat') {
			if ($object->type == 'image') {
				$file = fopen("../sys/other/path.txt", 'r') or die("не удалось открыть файл");
				$path = fgets($file);
				fclose($file);

				$format = self::getStringBetween($object->body,".","?");

				$src  = $object->body;
				$name = 'photo_' . date('U') . "." .$format;
				$dest = dirname(__DIR__) . '/media/' . $name;
				copy($src, $dest);

				$file = "photo{" . $path . "/media/" . $name;
			}else{
				$file = fopen("../sys/other/path.txt", 'r') or die("не удалось открыть файл");
				$path = fgets($file);
				fclose($file);

				$format = self::getStringBetween($object->body,".","?");

				$src  = $object->body;
				$name = 'doc_' . date('U') . "." .$format;
				$dest = dirname(__DIR__) . '/media/' . $name;
				copy($src, $dest);

				$file = "doc{" . $path . "/media/" . $name;
				

			}
			if (isset($object->caption)) {
				$message = $object->caption;
			}else{
				$message = "";
			}
		}else{
			$file = "";
			$message = $object->body;
		}

		$result = [
			'message' => $message,
			'media' => $file
		];

		return json_encode($result);
	}





	public static function saveMessageFromChat($my_id, $message, $media){
		$user = R::dispense('chat');

	    $user ->myid = $my_id;
	    $user ->sender = 0;
	    $user ->checked = 0;
	    $user ->message = $message;
	    $user ->media = $media;
	    $user ->unix = date('U');

	    R::store($user);
	}

	public static function saveBuffer($my_id, $message)
	{
		$user = R::load('users', $my_id);
		$user ->buffer = $message;
		R::store($user);	
	}

	public static function keyboardToText($keyboard)
	{
		$message = "\n\nВарианты ответа:\n";
		foreach ($keyboard as $key => $value) {
            $message = $message . $value->numanswer . ". " . $value->textanswer . "\n";
        }

        return $message;
	}

	public static function customFunctions($my_id, $functions_str)
	{
		$functions_array = explode(';', $functions_str);
		foreach ($functions_array as $key => $function) {
			if ($function == 'bot') {
				$user = R::load('users', $my_id);
			    $user ->status = 1;
			    R::store($user);
			}
			if ($function == 'chat') {
				$user = R::load('users', $my_id);
			    $user ->status = 2;
			    R::store($user);
			}
			if ($function == 'buffer') {
				$user = R::load('users', $my_id);
			    $user ->status = 3;
			    R::store($user);
			}
			if ($function == 'afterBuffer') {
				$user = R::load('users', $my_id);
			    $user ->status = 1;
			    R::store($user);
			}
			if ($function == 'leed') {
				$user = R::findOne('users', 'id = ?', [$my_id]);

				$leed = R::dispense('leed');

			    $leed ->myid = $my_id;
			    $leed ->comment = $user['buffer'];
			    $leed ->checked = 0;
			    $leed ->unix = date('U');

			    R::store($leed);
			}
		}
	}

	public static function getStringBetween($str,$from,$to)
    {
        $sub = substr($str, strpos($str,$from)+strlen($from),strlen($str));
        
        $array = explode(".",substr($sub,0,strpos($sub,$to)));
        return $array[(count($array) - 1)];
    }
}