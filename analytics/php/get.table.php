<?php

require '../libs/table.php';


function custom_1($table, $custom, $sample)
{
	$tableAll = R::findAll($table);
	$customData = R::findAll($custom);

	$d = $_REQUEST['p1'];
	$unixD1 = strtotime($_REQUEST['p1'] . " 00:00:00");
	$unixD2 = strtotime($_REQUEST['p2'] . " 23:59:59");

	$now = strtotime($_REQUEST['p1']);
	$your_date = strtotime($_REQUEST['p2']);
	$datediff = $your_date - $now + 86400;

	$dayFor = floor($datediff / (60 * 60 * 24));

	if ((int)$unixD1 > (int)date('U')) {
		$data = [
		    'result' => 'Error',
		    'code' => 1
		];

		header('Content-Type: text/json; charset=utf-8');
		echo json_encode($data);
		exit();
	}
	
	foreach ($customData as $key => $value) {
		$date = strtotime($value->date);
		if ((int)$unixD1 <= (int)$date) {
			if ((int)$unixD2 >= (int)$date) {
				if ((isset($_REQUEST['p3'])) && (isset($_REQUEST['p4']))) {
					if ($_REQUEST['p3'] == $value->contractor) {
						if ($_REQUEST['p4'] == $value->type) {
							$history['id'][] = $value->id;
							$history['contractor'][] = $value->contractor;
							$history['wallet'][] = $value->wallet;
							$history['sum'][] = $value->sum;
							$history['date'][] = $value->date;
						}
					}
				}else if(isset($_REQUEST['p3'])){
					if ($_REQUEST['p3'] == $value->contractor) {
						$history['id'][] = $value->id;
						$history['contractor'][] = $value->contractor;
						$history['wallet'][] = $value->wallet;
						$history['sum'][] = $value->sum;
						$history['date'][] = $value->date;
					}
				}else if(isset($_REQUEST['p4'])){
					if ($_REQUEST['p4'] == $value->type) {
						$history['id'][] = $value->id;
						$history['contractor'][] = $value->contractor;
						$history['wallet'][] = $value->wallet;
						$history['sum'][] = $value->sum;
						$history['date'][] = $value->date;
					}
				}else{
					$history['id'][] = $value->id;
					$history['contractor'][] = $value->contractor;
					$history['wallet'][] = $value->wallet;
					$history['sum'][] = $value->sum;
					$history['date'][] = $value->date;
				}
			}
		}

		if (isset($contractorArray)) {
			$checkBox = 0;
			foreach ($contractorArray as $key => $v) {
				if ($value->contractor == $v) {
					$checkBox = 1;
				}
			}

			if ($checkBox == 0) {
				$contractorArray[] = $value->contractor;
			}
		}else{
			$contractorArray[] = $value->contractor;
		}

		if (isset($typeOrderArray)) {
			$checkBox = 0;
			foreach ($typeOrderArray as $key => $v) {
				if ($value->type == $v) {
					$checkBox = 1;
				}
			}

			if ($checkBox == 0) {
				$typeOrderArray[] = $value->type;
			}
		}else{
			$typeOrderArray[] = $value->type;
		}

		
	}

	foreach ($tableAll as $key => $value) {
		if (isset($walletsArray)) {
			$checkBox = 0;
			foreach ($walletsArray as $key => $v) {
				if ($value->name == $v) {
					$checkBox = 1;
				}
			}

			if ($checkBox == 0) {
				$walletsArray[] = $value->name;
			}
		}else{
			$walletsArray[] = $value->name;
		}
	}

	for ($j = 0; $j < count($walletsArray) - 1; $j++){
	    for ($i = 0; $i < count($walletsArray) - $j - 1; $i++){
	        // если текущий элемент больше следующего
	        if ($walletsArray[$i] > $walletsArray[$i + 1]){
	            // меняем местами элементы
	            $tmp_var = $walletsArray[$i + 1];
	            $walletsArray[$i + 1] = $walletsArray[$i];
	            $walletsArray[$i] = $tmp_var;
	        }
	    }
	}


	foreach ($tableAll as $key => $value) {
		if ($_REQUEST['p1'] == $value->date) {
			$nameBD = R::load('names', $value->name);
			$tableData[$value->name] = [
				'name' => $value->name,
				'nameAll' => $nameBD->name,
				'balance' => $value->balance,
				'balanceLast' => $value->balance_last
			];

			foreach ($walletsArray as $key => $v) {
				if ($v == $value->name) {
					unset($walletsArray[$key]);
				}
			}
		}
	}

	foreach ($walletsArray as $key => $value) {
		$tableData[$value] = [
			'balanceLast' => 0
		];

		$d = $_REQUEST['p1'];
		$check = 0;
		for ($i=0; $i < 1000; $i++) { 
			$tableDataArray = R::findOne($table, 'date=? AND name=?', [$d, $value]);

			if (isset($tableDataArray)) {
				$nameBD = R::load('names', $value);
				$tableData[$value] = [
					'name' => $value,
					'nameAll' => $nameBD->name,
					'balance' => $tableDataArray['balance'],
					'balanceLast' => $tableDataArray['balance_last']
				];

				$check = 1;

				break;
			}

			$string = $d;
			$date = new DateTime($string);
			$date->modify('-1 days');
			$d = $date->format('d.m.Y');
		}

		if ($check == 0) {
			$nameBD = R::load('names', $value);
			$tableData[$value] = [
				'name' => $value,
				'nameAll' => $nameBD->name,
				'balance' => 0,
				'balanceLast' => 0
			];
		}
	}

	$dateStart = $_REQUEST['p1'];

	for ($k=0; $k < $dayFor; $k++) { 
		foreach ($tableAll as $key => $value) {
			if ($dateStart == $value->date) {
				$tableData[$value->name]['balance'] = $value->balance;
			}
		}

		
		$string = $dateStart;
		$date = new DateTime($string);
		$date->modify('+1 days');
		$dateStart = $date->format('d.m.Y');
	}

	$data = [
		'result' => 'Success',
		'data' => [
			'table' => $tableData,
			'history' => $history,
			'contractor' => $contractorArray,
		    'orderType' => $typeOrderArray,
			'sample' => $sample
		]
	];
		

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();

}


function chart($table, $sample){
	$tableDataStart = R::findOne($table, 'date = ?', [$_REQUEST['p1']]);
	$tableDataEnd = R::findOne($table, 'date = ?', [$_REQUEST['p2']]);
	$tableAll = R::findAll($table);

	$d = $_REQUEST['p1'];
	$unixD1 = strtotime($_REQUEST['p1'] . " 00:00:00");
	$unixD2 = strtotime($_REQUEST['p2'] . " 23:59:59");

	$now = strtotime($_REQUEST['p1']);
	$your_date = strtotime($_REQUEST['p2']);
	$datediff = $your_date - $now + 86400;

	$dayFor = floor($datediff / (60 * 60 * 24));

	$type = 0;

	if (isset($_REQUEST['p3'])) {
		$type = $_REQUEST['p3'];
	}

	if ((int)$unixD1 > (int)date('U')) {
		$data = [
		    'result' => 'Error',
		    'code' => 1
		];

		header('Content-Type: text/json; charset=utf-8');
		echo json_encode($data);
		exit();
	}

	for ($key=0; $key < $dayFor; $key++) {

		$tableDataArray = R::findOne($table, 'date = ?', [$d]);

		$tableDataDefault['value'][$key] = $tableDataArray['value'];
		$tableDataDefault['date'][$key] = $d;

		$string = $d;
		$date = new DateTime($string);
		$date->modify('+1 days');
		$d = $date->format('d.m.Y');
	}

	if ($type == 0) {
		$interval = ceil($dayFor / 11);
		$count = 0;
		for ($i=0; $i < 11; $i++) { 
			$sum = 0;
			for ($q=0; $q < $interval; $q++) { 
				$sum = $sum + $tableDataDefault['value'][($i * $interval + $q)];
				if (is_null($tableDataDefault['value'][($i * $interval + $q)])) {
					$count++;
				}
			}

			if (($interval - $count) != 0) {
				$tableDataConvert['value'][$i] = $sum/($interval - $count);
			}else{
				$tableDataConvert['value'][$i] = $sum;
			}

			$tableDataConvert['date'][$i] = $tableDataDefault['date'][($i * $interval)];
		}

		for ($i=0; $i < 11; $i++) { 
			if ($tableDataConvert['value'][$i] == 0) {
				unset($tableDataConvert['value'][$i]);
			}
			if (is_null($tableDataConvert['date'][$i])) {
				unset($tableDataConvert['date'][$i]);
			}
		}

		foreach ($tableDataDefault['value'] as $k => $value) {
			if (is_null($tableDataDefault['value'][$k])) {
				unset($tableDataDefault['value'][$k]);
			}
		}

		$data = [
			'result' => 'Success',
			'data' => [
			    'tableConvert' => $tableDataConvert,
			    'tableAll' => $tableDataDefault,
			    'interval' => $interval,
			    'type' => 'intervals',
			    'sample' => $sample
			]
		];

		header('Content-Type: text/json; charset=utf-8');
		echo json_encode($data);
		exit();
	}

	if ($type == 1) {
		foreach ($tableDataDefault['value'] as $k => $value) {
			if (is_null($tableDataDefault['value'][$k])) {
				unset($tableDataDefault['value'][$k]);
			}
		}

		$data = [
			'result' => 'Success',
			'data' => [
			    'tableConvert' => $tableDataDefault,
			    'type' => 'allData',
			    'sample' => $sample
			]
		];

		header('Content-Type: text/json; charset=utf-8');
		echo json_encode($data);
		exit();
	}

}



function pie($table, $sample){
	$tableAll = R::findAll($table);

	$d = $_REQUEST['p1'];
	$unixD1 = strtotime($_REQUEST['p1'] . " 00:00:00");
	$unixD2 = strtotime($_REQUEST['p2'] . " 23:59:59");

	$now = strtotime($_REQUEST['p1']);
	$your_date = strtotime($_REQUEST['p2']);
	$datediff = $your_date - $now + 86400;

	$dayFor = floor($datediff / (60 * 60 * 24));

	if ((int)$unixD1 > (int)date('U')) {
		$data = [
		    'result' => 'Error',
		    'code' => 1
		];

		header('Content-Type: text/json; charset=utf-8');
		echo json_encode($data);
		exit();
	}

	foreach ($tableAll as $key => $value) {
		if (isset($walletsArray)) {
			$checkBox = 0;
			foreach ($walletsArray as $key => $v) {
				if ($value->name == $v) {
					$checkBox = 1;
				}
			}

			if ($checkBox == 0) {
				$walletsArray[] = $value->name;
			}
		}else{
			$walletsArray[] = $value->name;
		}
	}

	for ($j = 0; $j < count($walletsArray) - 1; $j++){
	    for ($i = 0; $i < count($walletsArray) - $j - 1; $i++){
	        // если текущий элемент больше следующего
	        if ($walletsArray[$i] > $walletsArray[$i + 1]){
	            // меняем местами элементы
	            $tmp_var = $walletsArray[$i + 1];
	            $walletsArray[$i + 1] = $walletsArray[$i];
	            $walletsArray[$i] = $tmp_var;
	        }
	    }
	}

	foreach ($walletsArray as $key => $value) {
		$nameBD = R::load('names', $value);
		$tableData[$value] = [
			'id' => $value,
			'name' => $nameBD->name,
			'value' => 0
		];
	}

	for ($k=0; $k < $dayFor; $k++) { 
		foreach ($walletsArray as $key => $value) {
			$tableDataArray = R::findOne($table, 'date=? AND name=?', [$d, $value]);
			if (isset($tableDataArray)) {
				$tableData[$value]['value'] = $tableData[$value]['value'] + $tableDataArray['value'];
			}
		}

		$string = $d;
		$date = new DateTime($string);
		$date->modify('+1 days');
		$d = $date->format('d.m.Y');
	}

	$data = [
		'result' => 'Success',
		'data' => [
			'table' => $tableData,
			'sample' => $sample
		]
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}




if (!isset($_REQUEST)) {

	$data = [
	    'result' => 'Error'
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}




$result = json_decode(file_get_contents(("https://ijbglobal.ru/dev/analytics/php/auth.token.php?token=" . $_REQUEST['token'] . "&table=" . $_REQUEST['table'])));

if ($result->result != 'Success') {
	$data = [
	    'result' => 'Error'
	];

	header('Content-Type: text/json; charset=utf-8');
	echo json_encode($data);
	exit();
}

if ($result->tableData->sample == 'custom_1') {
	$tableName = "table" . $result->tableData->id;
	$customName = "custom" . $result->tableData->id;
	custom_1($tableName, $customName, $result->tableData->sample);
}

if ($result->tableData->sample == 'chart') {
	$tableName = "table" . $result->tableData->id;
	chart($tableName, $result->tableData->sample);
}

if ($result->tableData->sample == 'pie') {
	$tableName = "table" . $result->tableData->id;
	pie($tableName, $result->tableData->sample);
}



