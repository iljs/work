function startAnimationOpacity(element) {
	$(element).css("display", "block");
	$(element).animate({
		opacity: 1
	}, 500);
}

function endAnimationOpacity(element) {
	$(element).animate({
		opacity: 0
	}, 500);
	setTimeout(function(){
		$(element).css("display", "none");
	},500);
}



function startAnimationOpacityLoad(element) {
	$(element).animate({
		opacity: 0.5
	}, 200);
}

function endAnimationOpacityLoad(element) {
	$(element).animate({
		opacity: 1
	}, 200);
}



function startAnimationSlide(elementShow, elementHide) {
	$(elementShow).css("display", "block");
	$(elementShow).css("left", $(window).width());
	$(elementShow).css("opacity", "0");

	$(elementShow).animate({
		left: '0',
		opacity: 1
	}, 600);
	$(elementHide).animate({
		left: (0 - ($(window).width()/2)),
		opacity: 0
	}, 600);
}

function endAnimationSlide(elementShow, elementHide) {
	$(elementShow).css("display", "block");
	$(elementShow).css("left", (0 - ($(window).width()/2)));
	$(elementShow).css("opacity", "0");

	$(elementShow).animate({
		left: '0',
		opacity: 1
	}, 600);
	$(elementHide).animate({
		left: $(window).width(),
		opacity: 0
	}, 600);
}

function animationSlideHide(element) {
	$(element).animate({
		left: (0 - ($(window).width()/2)),
		opacity: 0,
		width: $(window).width()
	}, 600);
}

function animationSlideShow(element) {
	$(element).css("display", "block");
	$(element).css("left", (0 - ($(window).width()/2)));
	$(element).css("opacity", "0");

	$(element).animate({
		left: '0',
		opacity: 1,
		width: $(window).width()
	}, 600);
}





function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value) {
	var date = new Date();
	var days = 30;
	date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
	$.cookie(name, value, { expires: date });
}

function removeCookie(name) {
	$.removeCookie(name);
	window.location.reload();
}


function hideDefaultUI(argument) {
	$("#panel-1").css({
		opacity: 0,
		display: "none"
	});
	$("#panel-2").css({
		opacity: 0,
		display: "none"
	});
	$("#panel-3").css({
		opacity: 0,
		display: "none"
	});

	$("#panel-1_button").removeClass('active');
	$("#panel-2_button").removeClass('active');
	$("#panel-3_button").removeClass('active');
}







function animationTime(start, stop, progress) {
	let time = parseInt(stop, 10) - parseInt(start, 10);
	let animation = (time*progress/100);

	if (animation > (1300 * (100 - progress)/100)) {
		animation = 1300 * (100 - progress)/100;
	}
	if (animation < (500 * (100 - progress)/100)) {
		animation = 500 * (100 - progress)/100;
	}
	return animation;
}

function handleStart(event) {
	window['startX'] = event.changedTouches[0].clientX;
	window['startTime'] = new Date().getTime();

	
}

function handleMove(event) {
	moveX = event.changedTouches[0].clientX;

	let changeX = moveX - window['startX'];

	if (changeX > 0) {
		if (changeX < $(window).width()) {
			let blockNow = $("#info").attr('nowBlock');
			let blockLast = $("#info").attr('lastBlock');

			$(blockNow).css('left', (0 + changeX));
			$(blockLast).css('left', ((0 - ($(window).width()/2)) + changeX/2));

			$(blockNow).css('opacity', (1 - (changeX/($(window).width()/100)/100)));
			$(blockLast).css('opacity', (0 + (changeX/($(window).width()/100)/100)));

			if (blockLast == "#panel-1") {
				$(".menu").css('left', ((0 - ($(window).width()/2)) + changeX/2));
				$(".menu").css('opacity', (0 + (changeX/($(window).width()/100)/100)));
			}
			if (blockLast == "#panel-2") {
				$(".menu").css('left', ((0 - ($(window).width()/2)) + changeX/2));
				$(".menu").css('opacity', (0 + (changeX/($(window).width()/100)/100)));
			}
			if (blockLast == "#panel-3") {
				$(".menu").css('left', ((0 - ($(window).width()/2)) + changeX/2));
				$(".menu").css('opacity', (0 + (changeX/($(window).width()/100)/100)));
			}

			$(".panel-scroll").css("overflow-y", "hidden");
			$(".panel-content").css("overflow-y", "hidden");
		}
	}
}

function handleEnd(event) {
	endX = event.changedTouches[0].clientX;
	if((window['startX'] - endX) < ($(window).width()/-7)) {

		let blockNow = $("#info").attr('nowBlock');
		let blockLast = $("#info").attr('lastBlock');
		
		let block = 0;
		let progress = 100-($(window).width() + (window['startX'] - endX))/($(window).width()/100);
		let stopTime = (Math.round(new Date().getTime() / 1000)).toString(10) + (new Date().getMilliseconds()).toString(10);
		let animation = animationTime(window['startTime'], stopTime, progress);

		$(blockNow).animate({
			left: $(window).width(),
			opacity: 0
		},animation);
		$(blockLast).animate({
			left: 0,
			opacity: 1
		},animation);


		if (blockLast == "#panel-1") {
			$(".menu").animate({
				left: 0,
				opacity: 1
			},animation);

			$("#info").attr("lastBlock", "");
			$("#info").attr("nowBlock", "");
		}
		else if (blockLast == "#panel-2") {
			$(".menu").animate({
				left: 0,
				opacity: 1
			},animation);

			$("#info").attr("lastBlock", "");
			$("#info").attr("nowBlock", "");
		}
		else if (blockLast == "#panel-3") {
			$(".menu").animate({
				left: 0,
				opacity: 1
			},animation);

			$("#info").attr("lastBlock", "");
			$("#info").attr("nowBlock", "");
		}
		else{
			$("#info").attr("lastBlock", $(blockLast).attr("blockLast"));
			$("#info").attr("nowBlock", blockLast);
		}


		setTimeout(function() {
			$(blockNow).css('display', 'none');
			$(".panel-scroll").css("overflow-y", "scroll");
			$(".panel-content").css("overflow-y", "scroll");
		},animation);
		
	}else{
		let blockNow = $("#info").attr('nowBlock');
		let blockLast = $("#info").attr('lastBlock');

		let block = 0;
		let progress = 100-($(window).width() - (window['startX'] - endX))/($(window).width()/100);
		let stopTime = new Date().getTime();
		let animation = animationTime(window['startTime'], stopTime, progress)/2;

		$(blockNow).animate({
			left: 0,
			opacity: 1
		},animation, "linear");
		$(blockLast).animate({
			left: (0 - ($(window).width()/2)),
			opacity: 0
		},animation, "linear");


		if (blockLast == "#panel-1") {
			$(".menu").animate({
				left: (0 - ($(window).width()/2)),
				opacity: 0
			},animation, "linear");
		}
		if (blockLast == "#panel-2") {
			$(".menu").animate({
				left: (0 - ($(window).width()/2)),
				opacity: 0
			},animation, "linear");
		}
		if (blockLast == "#panel-3") {
			$(".menu").animate({
				left: (0 - ($(window).width()/2)),
				opacity: 0
			},animation, "linear");
		}
	}
}
