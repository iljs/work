<?php

require '../libs/table.php';
/*

$arrayY = ['ПИК','Зубр', 'Антон Рынок Правило МСК', 'Прометей', 'Перекресток', 'Магнит', 'Пятерочка'];
$arrayX = ['Оплата покупателя','Оплата поставщику'];

$now = strtotime("01.01.2020");
$your_date = strtotime("01.08.2020");
$datediff = $your_date - $now + 86400;

$d = "01.01.2020";

$dayFor = floor($datediff / (60 * 60 * 24));

$wallet1 = 100000;
$wallet1Last = 100000;
$wallet2 = 100000;
$wallet2Last = 100000;
$wallet3 = 100000;
$wallet3Last = 100000;

for ($key=0; $key < $dayFor; $key++) { 
	$randCount = rand(1, 2);
	for ($i=0; $i < $randCount; $i++) { 
		$randArray = rand(0, 6);
		$randWho = rand(0, 1);
		$randWallet = rand(1, 3);
		$randSum = 0;
		$k = '';

		if ($randWho == 0) {
			$randSum = rand(0, 50000);
			$k = 'Приходный кассовый ордер ЦК000000150 от ';

		}
		if ($randWho == 1){
			$randSum = rand(-50000, 0);
			$k = 'Расходный кассовый ордер ЦК000000219 от ';
		}


		if ($randWallet == 1) {
			$wallet1 = $wallet1 + $randSum;
		}
		if ($randWallet == 2) {
			$wallet2 = $wallet2 + $randSum;
		}
		if ($randWallet == 3) {
			$wallet3 = $wallet3 + $randSum;
		}

		$date = $d . " " . ($i * 3) . ":00:00";

		$user = R::dispense('custom1');
		$user->contractor = $arrayY[$randArray];
		$user->type = $arrayX[$randWho];
		$user->wallet = $randWallet;
		$user->sum = $randSum;
		$user->date = $date;
		$user->reg = $k . $date;
		R::store($user);
	}

	for ($i=0; $i < 3; $i++) { 
		if ($wallet1Last != $wallet1) {
			$user = R::dispense('table1');
			$user->name = 1;
			$user->balance = $wallet1;
			$user->balance_last = $wallet1Last;
			$user->date = $d;
			R::store($user);

			$wallet1Last = $wallet1;
		}

		if ($wallet2Last != $wallet2) {
			$user = R::dispense('table1');
			$user->name = 2;
			$user->balance = $wallet2;
			$user->balance_last = $wallet2Last;
			$user->date = $d;
			R::store($user);

			$wallet2Last = $wallet2;
		}

		if ($wallet3Last != $wallet3) {
			$user = R::dispense('table1');
			$user->name = 3;
			$user->balance = $wallet3;
			$user->balance_last = $wallet3Last;
			$user->date = $d;
			R::store($user);

			$wallet3Last = $wallet3;
		}
	}

	$string = $d;
	$date = new DateTime($string);
	$date->modify('+1 days');
	$d = $date->format('d.m.Y');
}

*/

/*

$start = 100000;

$now = strtotime("01.01.2019");
$your_date = strtotime("01.08.2020");
$datediff = $your_date - $now + 86400;
$dayFor = floor($datediff / (60 * 60 * 24));

$d = "01.01.2019";

for ($key=0; $key < $dayFor; $key++) { 
	$rand = rand(-9000, 10000);

	$start = $start + $rand;

	$user = R::dispense('table2');
	$user->value = $start;
	$user->date = $d;
	R::store($user);

	$string = $d;
	$date = new DateTime($string);
	$date->modify('+1 days');
	$d = $date->format('d.m.Y');
}

*/


/*
$now = strtotime("01.01.2019");
$your_date = strtotime("01.08.2020");
$datediff = $your_date - $now + 86400;
$dayFor = floor($datediff / (60 * 60 * 24));

$d = "01.01.2019";

for ($key=0; $key < $dayFor; $key++) { 
	$rand = rand(1,4);
	for ($i=0; $i < $rand; $i++) { 
		$randInt = rand(4,8);
		$randValue = rand(0,10000);

		$user = R::dispense('table3');
		$user->name = $randInt;
		$user->value = $randValue;
		$user->date = $d;
		R::store($user);
	}

	$string = $d;
	$date = new DateTime($string);
	$date->modify('+1 days');
	$d = $date->format('d.m.Y');
}
*/