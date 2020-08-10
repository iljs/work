let balanceType = ['УЧЕБНЫЙ СЧЕТ', 'РЕАЛЬНЫЙ СЧЕТ'];
let verify = ['Подтвердить','Да'];
let verifyStatus = ['Новичок','Профессионал'];

function twoDigits(num) {
  return ('0' + num).slice(-2);
}

function copyToClipboard(text) {
    var copytext = document.createElement('input');
    copytext.value = text;
    document.body.appendChild(copytext);
    copytext.select();
    document.execCommand('copy');
    document.body.removeChild(copytext);
}

function getAllUrlParams(url) {
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  var obj = {};
  if (queryString) {
    queryString = queryString.split('#')[0];
    var arr = queryString.split('&');

    for (var i=0; i<arr.length; i++) {
      var a = arr[i].split('=');
      var paramNum = undefined;
      var paramName = a[0].replace(/\[\d*\]/, function(v) {
        paramNum = v.slice(1,-1);
        return '';
      });

      var paramValue = typeof(a[1])==='undefined' ? true : a[1];

      paramName = paramName.toLowerCase();
      paramValue = paramValue.toLowerCase();

      if (obj[paramName]) {
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        }
        if (typeof paramNum === 'undefined') {
          obj[paramName].push(paramValue);
        }else {
          obj[paramName][paramNum] = paramValue;
        }
      }else {
        obj[paramName] = paramValue;
      }
    }
  }

  return obj;
}

function timeConverter(UNIX_timestamp){
	  var a = new Date(UNIX_timestamp * 1000);
	  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	  var year = a.getFullYear();
	  var month = months[a.getMonth()];
	  var date = a.getDate();
	  var hour = a.getHours();
	  var min = a.getMinutes();
	  var sec = a.getSeconds();
	  var time =  hour + ':' + twoDigits(min);
	  return time;
}

function timeConverterFull(UNIX_timestamp){
	  var a = new Date(UNIX_timestamp * 1000);
	  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	  var year = a.getFullYear();
	  var month = (a.getMonth() + 1);
	  var date = a.getDate();
	  var hour = a.getHours();
	  var min = a.getMinutes();
	  var sec = a.getSeconds();
	  var time = twoDigits(hour) + ':' + twoDigits(min) + ":00 " +  year + "." + twoDigits(month) + "." + twoDigits(date);
	  return time;
}

function timeConverterFullAll(UNIX_timestamp){
	  var a = new Date(UNIX_timestamp * 1000);
	  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	  var year = a.getFullYear();
	  var month = (a.getMonth() + 1);
	  var date = a.getDate();
	  var hour = a.getHours();
	  var min = a.getMinutes();
	  var sec = a.getSeconds();
	  var time = twoDigits(hour) + ':' + twoDigits(min) + ":" + twoDigits(sec) + " " +  year + "." + twoDigits(month) + "." + twoDigits(date);
	  return time;
}

function timeConverterDate(UNIX_timestamp){
	  var a = new Date(UNIX_timestamp * 1000);
	  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	  var year = a.getFullYear();
	  var month = (a.getMonth() + 1);
	  var date = a.getDate();
	  var hour = a.getHours();
	  var min = a.getMinutes();
	  var sec = a.getSeconds();
	  var time = twoDigits(date) + "." + twoDigits(month) + "." + year;
	  return time;
}

function userInfo(){
    let token = $("#trade_info").attr('token');
	var settings = {
		"async": true,
		"crossDomain": false,
		"url": "./php/terminal/get.vk.php?token=" + token + "&userid=" + getAllUrlParams().vk_user_id,
		"method": "GET",
	}
	$.ajax(settings).done(function (data) {
	    if(data.result == 'Success'){
	        $("img", "#setUserInfo").attr('src', data.data.photo);
	        $("h2", "#setUserInfo").html(data.data.name);
	        $("h4", "#setUserInfo").html(data.data.domain);
	        $("h5", "#setUserInfo").html(verifyStatus[data.data.status]);
	        $("h2", "#setApiKey").html(data.data.key);
	        
	        if(data.data.mail == 0){
	            $("#setMailBlock").show();
	            $("h2", "#setMail").hide();
	        }else{
	            $("#setMailBlock").hide();
	            $("h2", "#setMail").show();
	        }
	        
	        if(data.data.status == 0){
	            $("#setVerifyBlock").show();
	            $("h2", "#setVerify").hide();
	        }else{
	            $("#setVerifyBlock").hide();
	            $("h2", "#setVerify").show();
	        }
	    }
	});
}

function trade(index) {
    console.log('tradeGraphic');
	var widget = window.tvWidget = new TradingView.widget({
		width: ($(window).width()-20),
		height: ($(window).height()-410-window['heightIphone']),
		symbol: "FOREXCOM:" + index,
		interval: "1",
		timezone: "Europa/Moscow",
		theme: "dark",
		style: "1",
		locale: "ru",
		hide_top_toolbar: false, 
		hide_legend: true, 
		enable_publishing: true, 
		container_id: "tradingview-widget-container",
	});
}

function couples(array, obj, a) {
    $('#page_way_couples').html("<h1>Пары</h1>");
	for (var x = 0; x < array.id.length; x++) {
		$('#page_way_couples').append('\
			<div id="page_way_couples_block">\
				<h2>' + array.name[x] + '</h2>\
				<h3>' + array.procent[x] + '%</h3>\
			</div>'
		);
	}
	
	$("h2", "#trade_couples").html(array.name[0]);
	$("h3", "#trade_couples").html(array.procent[0] + "%");
	
	$("#trade_info").attr('activecouples',array.name[0]);
}


function history(array) {
	$(".history").html('<h1>История<h1><h5 style="display: none;">Истории нет</h5>');

	if (array.active) {
	    
		for (var i = array.active.id.length - 1; i >= 0; i--) {
			$(".history").append('\
				<div id="history_block" key="-1" class="page_block">\
				    <div class="page_block_header">\
        	           <p>АКТИВНАЯ</p>\
        	           <img src="./img/svg/next.svg" height="7">\
        	        </div>\
					<h2>' + timeConverter(parseInt(array.active.time[i],10) + 60)+ '</h2>\
					<h3>' + array.active.sum[i] + '₽</h3>\
				</div>'
			);
		}
	}

	if (array.history) {
	    var time = Date.now();
	    var date = timeConverterDate(time);
	    var last = date;

		for (var i = array.history.id.length - 1; i >= 0; i--) {
			let win = 0;
			if (array.history.status[i] == 'win') {
				win = (parseInt(array.history.procent[i],10)/100 * parseInt(array.history.sum[i],10) + parseInt(array.history.sum[i],10)).toFixed(2);
			}
			
			var dateNow = timeConverterDate(array.history.time[i]);
			if(dateNow == date){
			    $(".history").append('\
		            <h4>Сегодня</h4>\
		        ');
			}
		    if(dateNow != last){
		        if(dateNow == date){
		            $(".history").append('\
    		            <h4>Сегодня</h4>\
    		        ');
		        }else{
    		        $(".history").append('\
    		            <h4>' + dateNow + '</h4>\
    		        ');
		        }
		    }

			$(".history").append('\
				<div id="history_block" key="' + array.history.id[i] + '" class="page_block">\
				    <div class="page_block_header">\
        	           <p>ПРОШЕДШАЯ</p>\
        	           <img src="./img/svg/next.svg" height="7">\
        	        </div>\
					<h2>' + timeConverter(parseInt(array.history.time[i],10) + 60)+ '</h2>\
					<h3 class="history_bet_result_' + array.history.status[i] + '">' + win + '₽</h3>\
				</div>'
			);
			last = dateNow;
		}
	}
	
	if(typeof array.active === 'undefined'){
	    if(typeof array.history === 'undefined'){
	        $("h5", ".history").show();
	    }
	}
}



function DetectIphone(){
    var uagent = navigator.userAgent.toLowerCase();
    if (uagent.search("iphone") > -1){
        if(parseInt($(window).height(), 10) == 896){
            $( 'div[id="page"]' ).css({
                height: ($(window).height() - 99) + 'px',
                marginTop: 40 + "px"
            });
            $( '#page_way' ).css({
                height: ($(window).height() - 40) + 'px',
                marginTop: 40 + "px"
            });
            $('#menu_blocks').css({
                paddingBottom: 15 + "px"
            });
            window['heightIphone'] = 65;
        }
        if(parseInt($(window).height(), 10) == 812){
            $( 'div[id="page"]' ).css({
                height: ($(window).height() - 99) + 'px',
                marginTop: 40 + "px"
            });
            $('#menu_blocks').css({
                paddingBottom: 15 + "px"
            });
            $( '#page_way' ).css({
                height: ($(window).height() - 40) + 'px',
                marginTop: 40 + "px"
            });
            window['heightIphone'] = 65;
        }
        $("#message").css('top', '115px');
    }
}

function start(){
    userInfo();
    let token = $("#trade_info").attr('token');
	var settings = {
		"async": true,
		"crossDomain": false,
		"url": "./php/terminal/get.userdata.php?update=1&token=" + token,
		"method": "GET",
	}
	$.ajax(settings).done(function (data) {
		if (data.result != 'Success') {
			$("#root").show();
            $("#terminal").hide();
		}else{
		    couples(data.couples, data.data.couples, 0);
		    history(data.data);
		    
		    let balance = 0;
		    
		    if(data.data.balance == 0){
		        balance = data.data.demoBalance;
		    }
		    if(data.data.balance == 1){
		        balance = data.data.realBalance;
		    }
		    
		    $("p", "#trade_balance").html(balanceType[data.data.balance]);
		    $("h2", "#trade_balance").html(balance + "₽");
		    
		    $("h2", ".page_way_account_demo").html(data.data.demoBalance + "₽");
    		$("h2", ".page_way_account_real").html(data.data.realBalance + "₽");
    		
    		$("h2", "#order_balance").html(data.data.realBalance + "₽");
    		$("h2", "#setMail").html(data.data.mail);
    		
    		$("#trade_info").attr('balance', data.data.balance);
		}
	});
}

function update(){
    userInfo();
    let token = $("#trade_info").attr('token');
	var settings = {
		"async": true,
		"crossDomain": false,
		"url": "./php/terminal/get.userdata.php?update=1&token=" + token,
		"method": "GET",
	}
	$.ajax(settings).done(function (data) {
		if (data.result != 'Success') {
			$("#root").show();
            $("#terminal").hide();
		}else{
		    if (data.change == 1) {
		        history(data.data);
		        
		        let balance = 0;
		    
    		    if(data.data.balance == 0){
    		        balance = data.data.demoBalance;
    		    }
    		    if(data.data.balance == 1){
    		        balance = data.data.realBalance;
    		    }
    		    
    		    $("p", "#trade_balance").html(balanceType[data.data.balance]);
    		    $("h2", "#trade_balance").html(balance + "₽");
    		    
    		    $("h2", ".page_way_account_demo").html(data.data.demoBalance + "₽");
    		    $("h2", ".page_way_account_real").html(data.data.realBalance + "₽");
    		    
    		    $("h2", "#order_balance").html(data.data.realBalance + "₽");
    		    $("h2", "#setMail").html(data.data.mail);
    		    
    		    $("#trade_info").attr('balance', data.data.balance);
		    }
		}
	});
}

function bet(type) {
    $("#message").show();
    $("#waitBet").show();
            
    $("#message").animate({
        right: '0'
    },500);
    $("#ui").animate({
        opacity: 0.5
    },500);
    $("#menu").css('display', 'absolute');
    
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
                
	let token = $("#trade_info").attr('token');
	let bet = $("#trade_info").attr('tradebet');
	let couples = $("#trade_info").attr('activecouples');
	let time = $("#trade_info").attr('tradetime');

	var settings = {
		"async": true,
		"crossDomain": false,
		"url": "./php/terminal/send.bet.php?token=" + token + "&bet=" + bet + "&time=" + time + "&couples=" + couples + "&type=" + type,
		"method": "GET",
	}
	$.ajax(settings).done(function (data) {
	    clearInterval(loadingInterval);
		if (data.result == 'Success') {
		    update();
		    
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
                    $("#ui").animate({
                        opacity: 1
                    },500);
                    $("#message").animate({
                        right: '-150px'
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

                    setTimeout(function(){
                        $("#message").hide();
                        $("#errorBet").hide();
                        $("#errorBet").css('opacity', '0');
                        $("#menu").css('display', 'fixed');
                    },500);
                    
                    if(typeof data.message !== 'undefined'){
                        $("#big_message").animate({
                            opacity: 1
                        },500);
                        $("#big_message").show();
                        $("#big_message_title").html("Ошибка");
                        $("#big_message_text").html(data.message);
                    }else{
                        $("#ui").animate({
                            opacity: 1
                        },500);
                    }
                }, 1500);
            },200);
		}
	});
}

$(document).ready(function(){
    let checker = setInterval(function(){
        let token = $("#trade_info").attr('token');
        if (token !== "") {
            window['heightIphone'] = 0;
            
            DetectIphone();
            trade('EURUSD');
            
            start();
            
            clearInterval(checker);
            
            setInterval(function() {
        		update();
        	},1000);
        }
    }, 1000);
});



$("#trade_up").click(function() {
	bet('up');
});
$("#trade_down").click(function() {
	bet('down');
});





$("#trade_couples").click(function(){
    $("#page_way").show();
    $("#page_way_couples").show();
    
    $( "#page_way" ).css( "overflow-y", "scroll" );
    //$( "#page_way_couples" ).css( "color", "red" );
    
    
    $("#page_way").animate({
        left: '0'
    },500);
    $("#ui").animate({
        right: '50%',
        opacity: 0
    },500);
});

$(document).on('click',"#page_way_couples_block", function(){
	let couples = $("h2", this).html();
	let procent = $("h3", this).html();
	
	$("h2", "#trade_couples").html(couples);
	$("h3", "#trade_couples").html(procent);
	
	$("#trade_info").attr('activecouples', couples);
	
	DetectIphone()
	trade(couples);
	
	$("#page_way").animate({
        left: '100%'
    },500);
    $("#ui").animate({
        right: '0',
        opacity: 1
    },500);
    setTimeout(function(){
        $("#page_way").hide();
        $("#page_way_couples").hide();
        
        $( "#page_way" ).css( "overflow-y", "hidden" );
    },500);
});

$("#trade_balance").click(function(){
    $("#page_way").show();
    $("#page_way_account").show();

    $("#page_way").animate({
        left: '0'
    },500);
    $("#ui").animate({
        right: '50%',
        opacity: 0
    },500);
});

$(document).on('click',"#page_way_account_block", function(){
    let balance = $("#trade_info").attr('balance');
    let balanceTypeNumber = [1, 0];
    
    if(balance != $(this).attr('key')){
        let token = $("#trade_info").attr('token');
    	var settings = {
    		"async": true,
    		"crossDomain": false,
    		"url": "./php/terminal/update.balance.type.php?token=" + token,
    		"method": "GET",
    	}
    	$.ajax(settings).done(function (data) {
    	    update();
    	});
    	
    	$("#trade_info").attr('balance', parseInt(balance, 10));
    }
    
	$("#page_way").animate({
        left: '100%'
    },500);
    $("#ui").animate({
        right: '0',
        opacity: 1
    },500);
    setTimeout(function(){
        $("#page_way").hide();
        $("#page_way_account").hide();
    },500);
});


$(document).on('click',"#history_block", function(){
	let token = $("#trade_info").attr('token');
	let key = $(this).attr("key");
	if (key != -1) {
		var settings = {
			"async": true,
			"crossDomain": false,
			"url": "./php/terminal/get.history.php?key=" + key + "&token=" + token,
			"method": "GET",
		}
		$.ajax(settings).done(function (data) {
			if (data.result == 'Success') {

				let result = {
					"lose": "Проигрыш",
					"win": "Победа"
				};

				let type = {
					"up": "Выше",
					"down": "Ниже"
				};

				let account = ['Учебный', 'Реальный'];

				let win = 0;
				if (data.data.status == 'win') {
					win = (parseInt(data.data.procent,10)/100 * parseInt(data.data.sum,10) + parseInt(data.data.sum,10)).toFixed(2);
				}

				$("h2","#page_way_betinfo_time").html(timeConverterFull(parseInt(data.data.time,10) + 120));
				$("h2","#page_way_betinfo_startTime").html(timeConverterFullAll(parseInt(data.data.time,10)));
				$("h2","#page_way_betinfo_couples").html(data.data.couples);
				$("h2","#page_way_betinfo_result").html(result[data.data.status]);
				$("h2","#page_way_betinfo_sum").html(data.data.sum + "₽");
				$("h2","#page_way_betinfo_procent").html(data.data.procent + "%");
				$("h2","#page_way_betinfo_pay").html(win + "₽");
				$("h2","#page_way_betinfo_typeBet").html(type[data.data.type]);
				$("h2","#page_way_betinfo_startPrice").html(data.data.price);
				$("h2","#page_way_betinfo_endPrice").html(data.data.endprice);
				$("h2","#page_way_betinfo_accaunt").html(account[data.data.account]);
				
				$("#page_way").show();
                $("#page_way_betinfo").show();
            
                $("#page_way").animate({
                    left: '0'
                },500);
                $("#ui").animate({
                    right: '50%',
                    opacity: 0
                },500);
			}
		});
	}
});

$("#page_way_betinfo_exit").click(function(){
    $("#page_way").animate({
        left: '100%'
    },500);
    $("#ui").animate({
        right: '0',
        opacity: 1
    },500);
    setTimeout(function(){
        $("#page_way").hide();
        $("#page_way_betinfo").hide();
    },500);
});

$("#page_way_new_submit").click(function(){
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
    let token = $("#trade_info").attr('token');
    let mail = $("#page_way_mail_new_input_mail").val();
    let password = $("#page_way_mail_new_input_password").val();
	var settings = {
		"async": true,
		"crossDomain": false,
		"url": "./php/terminal/add.mail.php?mail=" + mail +"&password=" + password + "&token=" + token,
		"method": "GET",
	}
	$.ajax(settings).done(function (data) {
	    if (data.result == 'Success') {
			$("#waitBet").animate({
                opacity: 0
            },200);
            setTimeout(function(){
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
});

$("#page_way_connect_submit").click(function(){
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
    let token = $("#trade_info").attr('token');
    let mail = $("#page_way_mail_connect_input_mail").val();
    let password = $("#page_way_mail_connect_input_password").val();
	var settings = {
		"async": true,
		"crossDomain": false,
		"url": "./php/terminal/connect.mail.php?mail=" + mail +"&password=" + password + "&token=" + token,
		"method": "GET",
	}
	$.ajax(settings).done(function (data) {
	    if (data.result == 'Success') {
	        signin();
			$("#waitBet").animate({
                opacity: 0
            },200);
            setTimeout(function(){
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
});

$("#big_message_button").click(function(){
    $("#ui").animate({
        opacity: 1
    },500);
    $("#big_message").animate({
        opacity: 0
    },500);
    setTimeout(function(){
        $("#big_message").hide();
    },500);
});

$("#setApiKey").click(function(){
    copyToClipboard($("h2","#setApiKey").html());
    $("#message").show();
    $("#copy").show();
            
    $("#message").animate({
        right: '0'
    },500);
    $("#ui").animate({
        opacity: 0.5
    },500);
    $("#copy").animate({
        opacity: 1
    },200);
    setTimeout(function(){
        $("#message").animate({
            right: '-150px'
        },500);
        
        $("#copy").animate({
            opacity: 0
        },200);
        setTimeout(function(){
            $("#message").hide();
            $("#copy").hide();
            $("#menu").css('display', 'fixed');
            $("#ui").animate({
                opacity: 1
            },500);
        },500);
    }, 1500);
});

$("#setVerifyBlock").click(function(){
    $("#ui").animate({
        opacity: 0.5
    },500);
    $("#big_message").animate({
        opacity: 1
    },500);
    $("#big_message").show();
    $("#big_message_title").html("Верификация");
    $("#big_message_text").html("Для подтверждения личности требуется отослать скан паспорта и сделать селфи со своим лицом и паспортом на почту: support@fulltrade.su");
});