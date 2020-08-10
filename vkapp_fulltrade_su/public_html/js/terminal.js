function withdrawCheck(){
    // withdraw_block_form - 320px
    //
    let token = $("#trade_info").attr('token');
	var settings = {
		"async": true,
		"crossDomain": false,
		"url": "./php/terminal/get.withdraw.php?token=" + token,
		"method": "GET",
	}
	$.ajax(settings).done(function (data) {
		if (data.result == 'Success') {
			if (data.message == 'NoPay') {
			    $("#withdraw_blocks").show();
			    $("#withdraw_block_pay").show();
			    $("#withdraw_method").animate({
                    opacity: 0
                },400);
                $("#withdraw_header").animate({
                    opacity: 0
                },400);
                $("#withdraw").animate({
                    height: (($("h4","#withdraw_block_pay").height() + 25) + 'px')
                },400);
                setTimeout(function(){
                    $("#withdraw_method").hide();
                    $("#withdraw_header").hide();
                    $("#withdraw").animate({
                        height: (($("h4","#withdraw_block_pay").height() + 25) + 'px')
                    },200);
                    $("#withdraw_blocks").animate({
                        opacity: 1
                    },400);
                },400);
			}else{
			    $("#withdraw").animate({
                    height: '300px'
                },400);
			    $("#withdraw_blocks").show();
			    $("#withdraw_block_form").show();
			    setTimeout(function(){
			        $("#withdraw_blocks").animate({
                        opacity: 1
                    },200);
			    },400);
			}
		}
	});	
}

function tradeTime() {
	var CurrentTime = new Date();
	CurrentTime.setMinutes(CurrentTime.getMinutes() + (parseInt($("#trade_info").attr('tradetime'), 10) + 1));
	$("h2","#trade_way_time_main").html(CurrentTime.getHours()+":"+CurrentTime.getMinutes().toString().padStart(2,0));
	$("h2",".page_way_time_now").html(CurrentTime.getHours()+":"+CurrentTime.getMinutes().toString().padStart(2,0));
	$("input",".page_way_time_now").val($("#trade_info").attr('tradetime'));

	var CurrentTime = new Date();
	CurrentTime.setMinutes(CurrentTime.getMinutes() + 2);
	$("h2", ".page_way_time1").html(CurrentTime.getHours()+":"+CurrentTime.getMinutes().toString().padStart(2,0));

	CurrentTime.setMinutes(CurrentTime.getMinutes() + 1);
	$("h2", ".page_way_time2").html(CurrentTime.getHours()+":"+CurrentTime.getMinutes().toString().padStart(2,0));

	CurrentTime.setMinutes(CurrentTime.getMinutes() + 1);
	$("h2", ".page_way_time3").html(CurrentTime.getHours()+":"+CurrentTime.getMinutes().toString().padStart(2,0));

	CurrentTime.setMinutes(CurrentTime.getMinutes() + 2);
	$("h2", ".page_way_time5").html(CurrentTime.getHours()+":"+CurrentTime.getMinutes().toString().padStart(2,0));

	CurrentTime.setMinutes(CurrentTime.getMinutes() + 5);
	$("h2", ".page_way_time10").html(CurrentTime.getHours()+":"+CurrentTime.getMinutes().toString().padStart(2,0));
	
	CurrentTime.setMinutes(CurrentTime.getMinutes() + 20);
	$("h2", ".page_way_time30").html(CurrentTime.getHours()+":"+CurrentTime.getMinutes().toString().padStart(2,0));

	CurrentTime.setMinutes(CurrentTime.getMinutes() + 30);
	$("h2", ".page_way_time60").html(CurrentTime.getHours()+":"+CurrentTime.getMinutes().toString().padStart(2,0));

	CurrentTime.setMinutes(CurrentTime.getMinutes() + 60);
	$("h2", ".page_way_time120").html(CurrentTime.getHours()+":"+CurrentTime.getMinutes().toString().padStart(2,0));

	CurrentTime.setMinutes(CurrentTime.getMinutes() + 120);
	$("h2", ".page_way_time240").html(CurrentTime.getHours()+":"+CurrentTime.getMinutes().toString().padStart(2,0));
	
}


function tradeBet() {
	$("h2","#trade_way_bet_main").html($("#trade_info").attr('tradebet'));
	$("#page_way_bet_now_input").val($("#trade_info").attr('tradebet'));
}

$(document).ready(function(){
    let checker = setInterval(function(){
        let token = $("#trade_info").attr('token');
        if (token !== "") {
            window['heightIphone'] = 0;
            
            
            $("#root").animate({
                opacity: '0'
            },500);
            setTimeout(function(){
                $("#root").hide();
                $("#terminal").show();
                $("#terminal").animate({
                    opacity: '1'
                },500);
            }, 500);
            
            clearInterval(checker);
            tradeBet();
            
            setInterval(function() {
        		tradeTime();
        	},1000);
        }
    }, 1000);
});

$(document).on('click',"#menu_button", function(){
    
    $(".trade").removeClass('active');
    $(".history").removeClass('active');
    $(".order").removeClass('active');
    $(".settings").removeClass('active');
    $(".trade_button").removeClass('active');
    $(".history_button").removeClass('active');
    $(".order_button").removeClass('active');
    $(".settings_button").removeClass('active');
    
    let key = $(this).attr('key');
    if(key == "1"){
        $(".trade").toggleClass('active');
        $(".trade_button").toggleClass('active');
        $("#ui").css('overflow-y', 'hidden');
        $("#menu").css('position', 'absolute');
    }
    if(key == "2"){
        $(".history").toggleClass('active');
        $(".history_button").toggleClass('active');
        $("#ui").css('overflow-y', 'scroll');
        $("#menu").css('position', 'fixed');
    }
    if(key == "3"){
        $(".order").toggleClass('active');
        $(".order_button").toggleClass('active');
        $("#ui").css('overflow-y', 'hidden');
        $("#menu").css('position', 'absolute');
    }
    if(key == "4"){
        $(".settings").toggleClass('active');
        $(".settings_button").toggleClass('active');
        $("#ui").css('overflow-y', 'hidden');
        $("#menu").css('position', 'absolute');
    }
});

$("#trade_way_time_main").click(function(){
    $("#page_way").show();
    $("#page_way_time").show();
    $("#page_way").animate({
        left: '0'
    },500);
    $("#ui").animate({
        right: '50%',
        opacity: 0
    },500);
});




$(document).on('click',"#page_way_time_block", function(){
	var key = parseInt($(this).attr('key'), 10);
	if (key >= 1) {
		$("#trade_info").attr('tradetime', key);
		tradeTime();
		$("#page_way").animate({
            left: '100%'
        },500);
        $("#ui").animate({
            right: '0',
            opacity: 1
        },500);
        setTimeout(function(){
            $("#page_way").hide();
            $("#page_way_time").hide();
        },500);
	}
});

$("#trade_way_time_plus").click(function() {
	var tradetime = parseInt($("#trade_info").attr('tradetime'), 10);
	if (tradetime != 300) {
		$("#trade_info").attr('tradetime', tradetime+1);
		tradeTime();
	}
});

$("#trade_way_time_mines").click(function() {
	var tradetime = parseInt($("#trade_info").attr('tradetime'), 10);
	if (tradetime != 1) {
		$("#trade_info").attr('tradetime', tradetime-1);
		tradeTime();
	}
});




$("#trade_way_bet_main").click(function(){
    $("#page_way").show();
    $("#page_way_bet").show();
    $("#page_way").animate({
        left: '0'
    },500);
    $("#ui").animate({
        right: '50%',
        opacity: 0
    },500);
});

$(document).on('click',"#page_way_bet_block", function(){
	var bet = parseInt($('h2', this).html(), 10);
	if (bet >= 60) {
		$("#trade_info").attr('tradebet', bet);
		tradeBet();
		$("#page_way").animate({
            left: '100%'
        },500);
        $("#ui").animate({
            right: '0',
            opacity: 1
        },500);
        setTimeout(function(){
            $("#page_way").hide();
            $("#page_way_bet").hide();
        },500);
	}
});

$("#trade_way_bet_plus").click(function() {
	var tradebet = parseInt($("#trade_info").attr('tradebet'), 10);
	if (tradebet != 50000) {
		$("#trade_info").attr('tradebet', tradebet+20);
		tradeBet();
	}
});

$("#trade_way_bet_mines").click(function() {
	var tradebet = parseInt($("#trade_info").attr('tradebet'), 10);
	if (tradebet != 60) {
		$("#trade_info").attr('tradebet', tradebet-20);
		tradeBet();
	}
});

$("#page_way_bet_now_input").keyup(function(e){
    $("#page_way_bet_now_input").removeClass("keyup");
	if ($(this).val() >= 60) {
	    if ($(this).val() <= 25000) {
	        $("#page_way_bet_now_input").toggleClass("keyup");
	        $("#page_way_bet_now_submit").show();
	        
    		$("#trade_info").attr('tradebet', $(this).val());
    		tradeBet();
	    }
	}
	if (e.which == 13) {
		$("#page_way_bet_now_input").removeClass("keyup");
    	$("#page_way_bet_now_submit").hide();
    	
    	tradeBet();
		$("#page_way").animate({
            left: '100%'
        },500);
        $("#ui").animate({
            right: '0',
            opacity: 1
        },500);
        setTimeout(function(){
            $("#page_way").hide();
            $("#page_way_bet").hide();
        },500);
	}
});

$("#page_way_bet_now_submit").click(function(){
    $("#page_way_bet_now_input").removeClass("keyup");
	$("#page_way_bet_now_submit").hide();
	$("#page_way").animate({
        left: '100%'
    },500);
    $("#ui").animate({
        right: '0',
        opacity: 1
    },500);
    setTimeout(function(){
        $("#page_way").hide();
        $("#page_way_bet").hide();
    },500);
});

$(document).on('click','#deposit_block',function(){
    $("#deposit_block[key='card']").removeClass('active');
	$("#deposit_block[key='qiwi']").removeClass('active');
	$("#deposit_block[key='yandex']").removeClass('active');
	$("#deposit_block[key='other']").removeClass('active');
	
    $(this).toggleClass('active');
    $("#trade_info").attr('deposit', $(this).attr('key'));
    $("#deposit").animate({
        height: '224px'
    },400);
    setTimeout(function(){
        $("#page_order_deposit_way").show();
        $("#page_order_deposit_way").animate({
            opacity: 1
        },200);
    },400);
    
    $("#withdraw_method").animate({
        opacity: 0
    },400);
    $("#withdraw_blocks").animate({
        opacity: 0
    },400);
    $("#withdraw_header").animate({
        opacity: 0
    },400);
    $("#withdraw").animate({
        height: '25px'
    },400);
    
    setTimeout(function(){
        $("#withdraw_blocks").hide();
        $("#withdraw_method").hide();
        $("#withdraw_header").hide();
        $("#withdraw_open").show();
        $("#withdraw_open").animate({
            opacity: 1
        },200);
    },400);
});

$(document).on('click','#withdraw_block',function(){
    withdrawCheck();
    $("#withdraw_block[key='card']").removeClass('active');
	$("#withdraw_block[key='qiwi']").removeClass('active');
	$("#withdraw_block[key='yandex']").removeClass('active');
	$("#withdraw_block[key='paypal']").removeClass('active');
	
    $(this).toggleClass('active');
    $("#trade_info").attr('withdraw', $(this).attr('key'));
    $("#withdraw_block_pay").hide();
    
    $("#deposit_method").animate({
        opacity: 0
    },400);
    $("#deposit_header").animate({
        opacity: 0
    },400);
    $("#page_order_deposit_way").animate({
        opacity: 0
    },400);
    $("#deposit").animate({
        height: '25px'
    },400);
    
    
    setTimeout(function(){
        $("#deposit_method").hide();
        $("#deposit_header").hide();
        $("#page_order_deposit_way").hide();
        $("#deposit_open").show();
        $("#deposit_open").animate({
            opacity: 1
        },200);
        
    },400);
    
    
    let key = $(this).attr('key');
	if (key == "card") {
		$("#withdraw_comission").html("Коммисия 80 рублей + 3%");
	}

	if (key == "qiwi") {
		$("#withdraw_comission").html("Коммисия 3%");
	}

	if (key == "yandex") {
		$("#withdraw_comission").html("Коммисия 3%");
	}
	
	if (key == "paypal") {
		$("#withdraw_comission").html("Коммисия 4%");
	}
});

$("#withdraw_open").click(function(){
    $("#deposit_block[key='card']").removeClass('active');
	$("#deposit_block[key='qiwi']").removeClass('active');
	$("#deposit_block[key='yandex']").removeClass('active');
	$("#deposit_block[key='other']").removeClass('active');
	
    $("#withdraw").animate({
        height: '152px'
    },400);
    $("#withdraw_open").animate({
        opacity: 0
    },200);
    
    
    
    $("#deposit_method").animate({
        opacity: 0
    },400);
    $("#deposit_header").animate({
        opacity: 0
    },400);
    $("#page_order_deposit_way").animate({
        opacity: 0
    },400);
    $("#deposit").animate({
        height: '25px'
    },400);
    
    
    setTimeout(function(){
        $("#deposit_method").hide();
        $("#deposit_header").hide();
        $("#page_order_deposit_way").hide();
        $("#deposit_open").show();
        $("#deposit_open").animate({
            opacity: 1
        },200);
        
        
        $("#withdraw_method").show();
        $("#withdraw_header").show();
        $("#withdraw_open").hide();
        $("#withdraw_method").animate({
            opacity: 1
        },400);
        $("#withdraw_header").animate({
            opacity: 1
        },400);
    },400);
});

$("#deposit_open").click(function(){
    
    $("#withdraw_block[key='card']").removeClass('active');
	$("#withdraw_block[key='qiwi']").removeClass('active');
	$("#withdraw_block[key='yandex']").removeClass('active');
	$("#withdraw_block[key='paypal']").removeClass('active');
	
    $("#deposit").animate({
        height: '152px'
    },400);
    $("#deposit_open").animate({
        opacity: 0
    },200);
    
    $("#withdraw_method").animate({
        opacity: 0
    },400);
    $("#withdraw_header").animate({
        opacity: 0
    },400);
    $("#withdraw").animate({
        height: '25px'
    },400);
    $("#withdraw_blocks").animate({
        opacity: 0
    },400);
    setTimeout(function(){
        $("#withdraw_blocks").hide();
        $("#withdraw_method").hide();
        $("#withdraw_header").hide();
        $("#withdraw_open").show();
        $("#withdraw_open").animate({
            opacity: 1
        },200);
        
        $("#deposit_method").show();
        $("#deposit_header").show();
        $("#deposit_open").hide();
        $("#deposit_method").animate({
            opacity: 1
        },400);
        $("#deposit_header").animate({
            opacity: 1
        },400);
    },400);
});

$("#page_order_submit_deposit").click(function(){
	if ($("#page_order_input_deposit").val() >= 500) {
		let key = $("#trade_info").attr('deposit');
		let token = $("#trade_info").attr('token');
		window.location.replace("https://fulltrade.su/payment/redirect.php?token=" + token + "&sum=" + $("#page_order_input_deposit").val() + "&key=" + key);
	}
});

$("#withdraw_form_data").focus(function(){
    $("#withdraw_method").hide();
    $("#withdraw_header").hide();
    $("#withdraw").animate({
        height: '162px'
    },0);
});

$("#withdraw_form_data").blur(function(){
    $("#withdraw_method").show();
    $("#withdraw_header").show();
    $("#withdraw").animate({
        height: '300px'
    },0);
});

$("#withdraw_form_sum").focus(function(){
    $("#withdraw_method").hide();
    $("#withdraw_header").hide();
    $("#withdraw").animate({
        height: '162px'
    },0);
});

$("#withdraw_form_sum").blur(function(){
    $("#withdraw_method").show();
    $("#withdraw_header").show();
    $("#withdraw").animate({
        height: '300px'
    },0);
});

$("#page_order_submit_withdraw").click(function(){
	if ($("#withdraw_form_sum").val() >= 500) {
	    $("#message").show();
        $("#waitBet").show();
                
        $("#message").animate({
            right: '0'
        },500);
	    let i = 0;
        let loadingInterval = setInterval(function(){
            if(i != 2){
                if(i == 1){
                    $("p", "#waitBet").html("Загрузка..");
                }else{
                    $("p", "#waitBet").html("Загрузка.");
                }
                i++;
            }else{
                $("p", "#waitBet").html("Загрузка...");
                i = 0;
            }
        }, 700);
        $("#ui").animate({
            opacity: 0.7
        },500);

		let key = $("#trade_info").attr('withrdraw');
		let sum = parseInt($("#withdraw_form_sum").val(), 10);
		let token = $("#trade_info").attr('token');
		let data = $("#withdraw_form_data").val();
			
		var settings = {
			"async": true,
			"crossDomain": false,
			"url": "./php/terminal/new.withdraw.php?key=" + key + "&sum=" + sum + "&token=" + token + "&data=" + data,
			"method": "GET",
		}
		$.ajax(settings).done(function (data) {
			if (data.result == 'Success') {
				$("#waitBet").animate({
                    opacity: 0
                },200);
                setTimeout(function(){
                    $("#waitBet").hide();
                    $("#successBet").show();
                    $("#successBet").animate({
                        opacity: 1
                    },200);
                    
                    setTimeout(function(){
                        $("#message").animate({
                            right: '-150px'
                        },500);
                        $("#ui").animate({
                            opacity: 1
                        },500);
                        setTimeout(function(){
                            $("#message").hide();
                            $("#successBet").hide();
                            $("#successBet").css('opacity', '0');
                            $("#menu").css('display', 'fixed');
                        },500);
                    }, 1500);
                },200);
			}
			if (data.result == 'Error') {
				$("#waitBet").animate({
                    opacity: 0
                },200);
                setTimeout(function(){
                    $("#waitBet").hide();
                    $("#errorBet").show();
                    $("#errorBet").animate({
                        opacity: 1
                    },200);
                    
                    setTimeout(function(){
                        $("#message").animate({
                            right: '-150px'
                        },500);
                        $("#ui").animate({
                            right: '0',
                            opacity: 1
                        },500);
                        setTimeout(function(){
                            $("#message").hide();
                            $("#errorBet").hide();
                            $("#errorBet").css('opacity', '0');
                            $("#menu").css('display', 'fixed');
                        },500);
                    }, 1500);
                },200);
			}
		});
	}
});

$("#setMailBlock").click(function(){
    $("#page_way").show();
    $("#page_way_mail").show();
    $("#page_way").animate({
        left: '0'
    },500);
    $("#ui").animate({
        right: '50%',
        opacity: 0
    },500);
});

$("#page_way_mail_exit").click(function(){
    $("#page_way").animate({
        left: '100%'
    },500);
    $("#ui").animate({
        right: '0',
        opacity: 1
    },500);
    setTimeout(function(){
        $("#page_way").hide();
        $("#page_way_mail").hide();
    },500);
});

$("#page_way_mail_new_button").click(function(){
    $("#page_block_mail_new").animate({
        height: '161px'
    },400);
    $("#page_way_mail_connect").animate({
        opacity: 0
    },200);
    $("#page_block_mail_connect").animate({
        height: '29px'
    },400);
    setTimeout(function(){
        $("#page_way_mail_connect").hide();
        $("#page_way_mail_new").show();
        $("#page_way_mail_new").animate({
            opacity: 1
        },200);
    },400);
});

$("#page_way_mail_connect_button").click(function(){
    $("#page_block_mail_connect").animate({
        height: '161px'
    },400);
    $("#page_way_mail_new").animate({
        opacity: 0
    },200);
    $("#page_block_mail_new").animate({
        height: '29px'
    },400);
    setTimeout(function(){
        $("#page_way_mail_new").hide();
        $("#page_way_mail_connect").show();
        $("#page_way_mail_connect").animate({
            opacity: 1
        },200);
    },400);
});