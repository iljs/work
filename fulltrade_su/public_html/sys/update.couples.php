<?php
include '/home/f/flysitegro/fulltrade_su/public_html/libs/connect.php';

function check()
{
	$bets = R::findAll('bet');

	$date = date('U');

	foreach ($bets as $key => $value) {
		if ($value->account == 1) {
			if ($value->status == 'active') {
				if ($value->time <= (((int)$date)-1)) {
					$price = R::findOne('couples', 'name = ?', [$value->couples]);
					if ($price['price'] > $value->price) {
						if ($value->type == 'up') {
							$change = R::load('users', $value->user);
							$change->newaction = 1;
							$change->real_balance = $change->real_balance+($value->sum * $value->procent/100) + $value->sum;
							R::store($change);

							$refer = R::findOne('users', 'refcode = ?', [$change->refer]);

							$refer = R::load('users', $refer->id);
							$refer->newaction = 1;
							$refer->real_balance = $refer->real_balance-(($value->sum * $value->procent/100)*0.7);
							R::store($refer);

							$x = R::load('bet', $value->id);
							$x->status = 'win';
							$x->endprice = $price['price'];
							R::store($x);

						}
					}
					if ($price['price'] <= $value->price) {
						if ($value->type == 'up') {
							$change = R::load('users', $value->user);
							$change->newaction = 1;
							R::store($change);

							$refer = R::findOne('users', 'refcode = ?', [$change->refer]);

							$refer = R::load('users', $refer->id);
							$refer->newaction = 1;
							$refer->real_balance = $refer->real_balance+($value->sum*0.7);
							R::store($refer);

							$x = R::load('bet', $value->id);
							$x->status = 'lose';
							$x->endprice = $price['price'];
							R::store($x);
						}
					}
					if ($price['price'] < $value->price) {
						if ($value->type == 'down') {
							$change = R::load('users', $value->user);
							$change->newaction = 1;
							$change->real_balance = $change->real_balance+($value->sum * $value->procent/100) + $value->sum;
							R::store($change);

							$refer = R::findOne('users', 'refcode = ?', [$change->refer]);

							$refer = R::load('users', $refer->id);
							$refer->newaction = 1;
							$refer->real_balance = $refer->real_balance-(($value->sum * $value->procent/100)*0.7);
							R::store($refer);

							$x = R::load('bet', $value->id);
							$x->status = 'win';
							$x->endprice = $price['price'];
							R::store($x);
						}
					}
					if ($price['price'] >= $value->price) {
						if ($value->type == 'down') {
							$change = R::load('users', $value->user);
							$change->newaction = 1;
							R::store($change);

							$refer = R::findOne('users', 'refcode = ?', [$change->refer]);

							$refer = R::load('users', $refer->id);
							$refer->newaction = 1;
							$refer->real_balance = $refer->real_balance+($value->sum*0.7);
							R::store($refer);

							$x = R::load('bet', $value->id);
							$x->status = 'lose';
							$x->endprice = $price['price'];
							R::store($x);
						}
					}
				}
			}
		}else{
			if ($value->status == 'active') {
				if ($value->time <= $date) {
					$price = R::findOne('couples', 'name = ?', [$value->couples]);
					if ($price['price'] > $value->price) {
						if ($value->type == 'up') {
							$change = R::load('users', $value->user);
							$change->newaction = 1;
							$change->demo_balance = $change->demo_balance+($value->sum * $value->procent/100) + $value->sum;
							R::store($change);

							$x = R::load('bet', $value->id);
							$x->status = 'win';
							$x->endprice = $price['price'];
							R::store($x);
							}
					}
					if ($price['price'] <= $value->price) {
						if ($value->type == 'up') {
							$change = R::load('users', $value->user);
							$change->newaction = 1;
							R::store($change);

							$x = R::load('bet', $value->id);
							$x->status = 'lose';
							$x->endprice = $price['price'];
							R::store($x);
						}
					}
					if ($price['price'] < $value->price) {
						if ($value->type == 'down') {
							$change = R::load('users', $value->user);
							$change->newaction = 1;
							$change->demo_balance = $change->demo_balance+($value->sum * $value->procent/100) + $value->sum;
							R::store($change);

							$x = R::load('bet', $value->id);
							$x->status = 'win';
							$x->endprice = $price['price'];
							R::store($x);
						}
					}
					if ($price['price'] >= $value->price) {
						if ($value->type == 'down') {
							$change = R::load('users', $value->user);
							$change->newaction = 1;
							R::store($change);

							$x = R::load('bet', $value->id);
							$x->status = 'lose';
							$x->endprice = $price['price'];
							R::store($x);
						}
					}
				}
			}
		}
	}
}
//for ($i=0; $i < 1; $i++) { 

$c = json_decode(file_get_contents("https://api.1forge.com/quotes?pairs=EUR/USD,USD/JPY,GBP/USD,USD/CHF,EUR/CHF,AUD/USD,USD/CAD,NZD/USD,EUR/GBP,EUR/JPY,GBP/JPY,CHF/JPY,GBP/CHF,EUR/AUD,EUR/CAD,AUD/CAD,AUD/JPY,CAD/JPY,NZD/JPY,GBP/CAD,GBP/NZD,GBP/AUD,AUD/NZD,USD/SEK,EUR/SEK,EUR/NOK,USD/NOK,USD/MXN,AUD/CHF,EUR/NZD,USD/ZAR,ZAR/JPY,USD/TRY,EUR/TRY,NZD/CHF,CAD/CHF,NZD/CAD,TRY/JPY,USD/CNH,XAU/USD&api_key=WyiNf1i8Rp72YyBX5RL080WK4wO8kIvp"));
foreach ($c as $key => $value) {

	$couples = R::load('couples', ($key+1));
	$couples->price = $value->p;
	R::store($couples);
}

$users = R::findAll('users');
foreach ($users as $key => $value) {
	$u = R::load('users', $value->id);
	$u->newaction = 1;
	R::store($u);
}

check();

sleep(19);

$c = json_decode(file_get_contents("https://api.1forge.com/quotes?pairs=EUR/USD,USD/JPY,GBP/USD,USD/CHF,EUR/CHF,AUD/USD,USD/CAD,NZD/USD,EUR/GBP,EUR/JPY,GBP/JPY,CHF/JPY,GBP/CHF,EUR/AUD,EUR/CAD,AUD/CAD,AUD/JPY,CAD/JPY,NZD/JPY,GBP/CAD,GBP/NZD,GBP/AUD,AUD/NZD,USD/SEK,EUR/SEK,EUR/NOK,USD/NOK,USD/MXN,AUD/CHF,EUR/NZD,USD/ZAR,ZAR/JPY,USD/TRY,EUR/TRY,NZD/CHF,CAD/CHF,NZD/CAD,TRY/JPY,USD/CNH,XAU/USD&api_key=WyiNf1i8Rp72YyBX5RL080WK4wO8kIvp"));
foreach ($c as $key => $value) {

	$couples = R::load('couples', ($key+1));
	$couples->price = $value->p;
	R::store($couples);
}

$users = R::findAll('users');
foreach ($users as $key => $value) {
	$u = R::load('users', $value->id);
	$u->newaction = 1;
	R::store($u);
}

sleep(19);

$c = json_decode(file_get_contents("https://api.1forge.com/quotes?pairs=EUR/USD,USD/JPY,GBP/USD,USD/CHF,EUR/CHF,AUD/USD,USD/CAD,NZD/USD,EUR/GBP,EUR/JPY,GBP/JPY,CHF/JPY,GBP/CHF,EUR/AUD,EUR/CAD,AUD/CAD,AUD/JPY,CAD/JPY,NZD/JPY,GBP/CAD,GBP/NZD,GBP/AUD,AUD/NZD,USD/SEK,EUR/SEK,EUR/NOK,USD/NOK,USD/MXN,AUD/CHF,EUR/NZD,USD/ZAR,ZAR/JPY,USD/TRY,EUR/TRY,NZD/CHF,CAD/CHF,NZD/CAD,TRY/JPY,USD/CNH,XAU/USD&api_key=WyiNf1i8Rp72YyBX5RL080WK4wO8kIvp"));
foreach ($c as $key => $value) {

	$couples = R::load('couples', ($key+1));
	$couples->price = $value->p;
	R::store($couples);
}

$users = R::findAll('users');
foreach ($users as $key => $value) {
	$u = R::load('users', $value->id);
	$u->newaction = 1;
	R::store($u);
}