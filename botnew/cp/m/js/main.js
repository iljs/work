//
// Start
//

$(document).ready(function(){
	$(".panel-content").css("height", ($(window).height() - 48));
	$(".panel-scroll").css("height", $(window).height());

	setTimeout(function(){
		startAnimationOpacity("#loader");
	}, 500);

	setTimeout(function(){
		let token = getCookie('token');
		if (token == undefined) {
			endAnimationOpacity("#loader");
			setTimeout(function(){
				startAnimationOpacity("#sign");
			},500);
		}

		if (token != undefined) {
			$("#info").attr('token', token);
			loadStartInformation();
		}
	}, 3500);

	$("#panel-1").css("width", $(window).width());
	$("#panel-2").css("width", $(window).width());
	$("#panel-3").css("width", $(window).width());

	$(".menu").css("width", $(window).width());

	window['defaultLeft'] = $(window).width() * 0;

	document.addEventListener("touchstart", handleStart, false);
	document.addEventListener("touchend", handleEnd, false);
	document.addEventListener("touchmove", handleMove, false);
});



//
// Clicks
//


$("#sign_button").click(function(){
	signRequest();
});

$("#startSetting_button_save").click(function(){
	startSettingRequest();
});

$("#startSetting_button_skip").click(function(){
	endAnimationOpacity("#startSetting");
	setTimeout(function(){
		startAnimationOpacity("#loader");
	},500);
	setTimeout(function(){
		loadStartInformation();
	},1000);
});



//
// Menu Clicks
//

$("#panel-1_button").click(function(){
	hideDefaultUI();
	
	$("#panel-1").css({
		opacity: 1,
		display: "block"
	});
	$("#panel-1_button").toggleClass("active");

});

$("#panel-2_button").click(function(){
	hideDefaultUI();
	$("#panel-2").css({
		opacity: 1,
		display: "block"
	});
	$("#panel-2_button").toggleClass("active");
});

$("#panel-3_button").click(function(){
	hideDefaultUI();
	$("#panel-3").css({
		opacity: 1,
		display: "block"
	});
	$("#panel-3_button").toggleClass("active");
});




//
// Settings Clicks
//

$("#settingsProfil").click(function(){
	startAnimationSlide("#profil", "#panel-3");
	animationSlideHide(".menu");
	$("#info").attr("lastBlock", "#panel-3");
	$("#info").attr("nowBlock", "#profil");
});

$("#settingsAbout").click(function(){
	startAnimationSlide("#appInfo", "#panel-3");
	animationSlideHide(".menu");
	$("#info").attr("lastBlock", "#panel-3");
	$("#info").attr("nowBlock", "#appInfo");
});

$("#settingsExit").click(function(){
	removeCookie("token");
});






//
// Profil Settings Click
//

$("#profilName").click(function(){
	startAnimationSlide("#changeName", "#profil");
	$("#info").attr("lastBlock", "#profil");
	$("#info").attr("nowBlock", "#changeName");
});

$("#profilMail").click(function(){
	startAnimationSlide("#changeMail", "#profil");
	$("#info").attr("lastBlock", "#profil");
	$("#info").attr("nowBlock", "#changeMail");
});

$("#profilPhone").click(function(){
	startAnimationSlide("#changePhone", "#profil");
	$("#info").attr("lastBlock", "#profil");
	$("#info").attr("nowBlock", "#changePhone");
});



$("#changeName_save").click(function(){
	editName();
});

$("#changeMail_save").click(function(){
	editMail();
});

$("#changePhone_save").click(function(){
	editPhone();
});





//
// Exit
//

$(document).on("click", "#exit",function(){
	let blockNow = $("#info").attr('nowBlock');
	let blockLast = $("#info").attr('lastBlock');

	endAnimationSlide(blockLast, blockNow);

	if (blockLast == "#panel-1") {
		animationSlideShow(".menu");
		$("#info").attr("lastBlock", "");
		$("#info").attr("nowBlock", "");
	}
	else if (blockLast == "#panel-2") {
		animationSlideShow(".menu");
		$("#info").attr("lastBlock", "");
		$("#info").attr("nowBlock", "");
	}
	else if (blockLast == "#panel-3") {
		animationSlideShow(".menu");
		$("#info").attr("lastBlock", "");
		$("#info").attr("nowBlock", "");
	}else{
		$("#info").attr("lastBlock", $(blockLast).attr("blockLast"));
		$("#info").attr("nowBlock", blockLast);
	}
});

