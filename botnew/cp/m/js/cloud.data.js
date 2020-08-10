function loadInformation(isUpdate){
	let token = $("#info").attr('token');
	var settings = {
		"async": true,
		"crossDomain": false,
		"url": "./../php/get.user.php?token=" + token + "&isUpdate=" + isUpdate,
		"method": "GET",
	}
	$.ajax(settings).done(function (data) {
		if (data.result == 'success') {
			if (isUpdate == 1) {
				endAnimationOpacity("#loader");
				setTimeout(function(){
					startAnimationOpacity("#defaultUserUI");
					startAnimationOpacity("#panel-1");
					$("#panel-1_button").toggleClass("active");
				},500);
			}

			if (data.isUpdate == 1) {
				$("#profilMainInfoMail").html(data.userInfo.mail);
				$("p", "#profilLogo").html(data.userInfo.mail.substr(0,1));

				$("#changeName_firstName").val(data.userInfo.firstName);
				$("#changeName_lastName").val(data.userInfo.lastName);

				$("#profilNameP").html(data.userInfo.firstName + " " + data.userInfo.lastName);
				$("#profilEmailP").html(data.userInfo.mail);
				$("#profilPhoneP").html(data.userInfo.phone.substr(0,2) + " *** *** ** " + data.userInfo.phone.substr(-2));
			}
		}
	});
}

function updateInformation() {
	// body...
}


function loadStartInformation() {
	loadInformation(1);
}




function editName(){
	let token = $("#info").attr('token');
	let firstName = $("#changeName_firstName").val();
	let lastName = $("#changeName_lastName").val();

	startAnimationOpacityLoad("#changeName");

	var settings = {
		"async": true,
		"crossDomain": false,
		"url": "./../php/edit.name.php?token=" + token + "&firstName=" + firstName + "&lastName=" + lastName,
		"method": "GET",
	}
	$.ajax(settings).done(function (data) {
		if (data.result == 'success') {
			endAnimationOpacityLoad("#changeName");
			loadInformation(0);
			setTimeout(function(){
				endAnimationSlide("#profil", "#changeName");

				$("#info").attr("lastBlock", $("#profil").attr("blockLast"));
				$("#info").attr("nowBlock", "#profil");
			},200);
		}
	});
}


function editMail(){
	let token = $("#info").attr('token');
	let mail = $("#changeMail_mail").val();
	let password = $("#changeMail_password").val();

	startAnimationOpacityLoad("#changeMail");

	var settings = {
		"async": true,
		"crossDomain": false,
		"url": "./../php/edit.mail.php?token=" + token + "&mail=" + mail + "&password=" + password,
		"method": "GET",
	}
	$.ajax(settings).done(function (data) {
		if (data.result == 'success') {
			endAnimationOpacityLoad("#changeMail");
			loadInformation(0);
			setTimeout(function(){
				endAnimationSlide("#profil", "#changeMail");

				$("#info").attr("lastBlock", $("#profil").attr("blockLast"));
				$("#info").attr("nowBlock", "#profil");
			},200);
		}
		if (data.result == 'error') {
			endAnimationOpacityLoad("#changeMail");
			if (data.code == 1) {
				alert('Системный сбой! Попрбуйте зайти позже');
			}
			if (data.code == 4) {
				alert('Ошибка авторизации!');

				endAnimationOpacity("#defaultUserUI");
				setTimeout(function(){
					startAnimationOpacity("#sign");
				},500);
			}
			if (data.code == 3) {
				$("#changeMail_password").css('border-color', 'red');
				setTimeout(function(){
					$("#changeMail_password").css('border-color', 'rgba(255,255,255,0.05)');
				},4000);
			}
		}
	});
}

function editPhone(){
	let token = $("#info").attr('token');
	let phone = $("#changePhone_phone").val();
	let password = $("#changePhone_password").val();

	startAnimationOpacityLoad("#changePhone");

	var settings = {
		"async": true,
		"crossDomain": false,
		"url": "./../php/edit.phone.php?token=" + token + "&phone=" + phone + "&password=" + password,
		"method": "GET",
	}
	$.ajax(settings).done(function (data) {
		if (data.result == 'success') {
			endAnimationOpacityLoad("#changePhone");
			loadInformation(0);
			setTimeout(function(){
				endAnimationSlide("#profil", "#changePhone");

				$("#info").attr("lastBlock", $("#profil").attr("blockLast"));
				$("#info").attr("nowBlock", "#profil");
			},200);
		}
		if (data.result == 'error') {
			endAnimationOpacityLoad("#changePhone");
			if (data.code == 1) {
				alert('Системный сбой! Попрбуйте зайти позже');
			}
			if (data.code == 4) {
				alert('Ошибка авторизации!');

				endAnimationOpacity("#defaultUserUI");
				setTimeout(function(){
					startAnimationOpacity("#sign");
				},500);
			}
			if (data.code == 3) {
				$("#changePhone_password").css('border-color', 'red');
				setTimeout(function(){
					$("#changePhone_password").css('border-color', 'rgba(255,255,255,0.05)');
				},4000);
			}
		}
	});
}




function startSetting(firstName, lastName, phone) {
	$("#startSetting_firstName_input").val(firstName);
	$("#startSetting_lastName_input").val(lastName);
	$("#startSetting_phone_input").val(phone);


	if (firstName == "") {
		startAnimationOpacity("#startSetting");
	}
	else if(lastName == ""){
		startAnimationOpacity("#startSetting");
	}
	else if(phone == ""){
		startAnimationOpacity("#startSetting");
	}
	else{
		loadStartInformation();
	}
}

function startSettingRequest() {
	startAnimationOpacityLoad("#startSetting");

	let token = $("#info").attr('token');
	let firstName = $("#startSetting_firstName_input").val();
	let lastName = $("#startSetting_lastName_input").val();
	let phone = $("#startSetting_phone_input").val();

	var settings = {
		"async": true,
		"crossDomain": false,
		"url": "./../php/save.user.setting.php?token=" + token + "&firstName=" + firstName + "&lastName=" + lastName + "&phone=" + phone,
		"method": "GET",
	}
	$.ajax(settings).done(function (data) {
		if (data.result == 'success') {
			endAnimationOpacity("#startSetting");
			setTimeout(function(){
				startAnimationOpacity("#loader");
			},500);
			setTimeout(function(){
				loadStartInformation();
			},1000);
		}
		if (data.result == 'error') {
			if (data.code == 1) {
				alert('Системный сбой! Попрбуйте зайти позже');
				endAnimationOpacityLoad("#startSetting");
			}
			if (data.code == 4) {
				alert('Ошибка авторизации!');

				endAnimationOpacity("#startSetting");
				setTimeout(function(){
					startAnimationOpacity("#sign");
				},500);
			}
		}
	});
}



function signRequest() {
	startAnimationOpacityLoad("#sign");

	let login = $("#sign_login").val();
	let password = $("#sign_password").val();

	var settings = {
		"async": true,
		"crossDomain": false,
		"url": "./../php/signin.php?login=" + login + "&password=" + password,
		"method": "GET",
	}
	$.ajax(settings).done(function (data) {
		if (data.result == 'success') {
			$("#info").attr('token', data.body.token);
			setCookie('token', data.body.token);

			endAnimationOpacity("#sign");
			setTimeout(function(){
				startSetting(data.body.firstName, data.body.lastName, data.body.phone);
			},500);
		}
		if (data.result == 'error') {
			endAnimationOpacityLoad("#sign");
			if (data.code == 1) {
				alert('Системный сбой! Попрбуйте зайти позже');
			}
			if (data.code == 2) {
				$("#sign_login").css('border-color', 'red');
				setTimeout(function(){
					$("#sign_login").css('border-color', 'rgba(255,255,255,0.05)');
				},4000);
			}
			if (data.code == 3) {
				$("#sign_password").css('border-color', 'red');
				setTimeout(function(){
					$("#sign_password").css('border-color', 'rgba(255,255,255,0.05)');
				},4000);
			}
		}
	});
}