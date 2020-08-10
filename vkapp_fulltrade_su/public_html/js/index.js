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

function height() {
	$('#root').css({
        height: $(window).height() + 'px'
    });
    $('#terminal').css({
        height: $(window).height() + 'px'
    });
    $('#ui').css({
        height: $(window).height() + 'px'
    });
    $('#page').css({
        height: ($(window).height() - 44) + 'px'
    });
    $('#form').css({
        marginTop: ($(window).height()/2-300) + 'px'
    });
    $('#page_way').css({
        height: $(window).height() + 'px'
    });
}

$(document).ready(function() {
    height(); 
    signin();
/*
    setTimeout(function() {
        $("#animation").animate({
            opacity: 0
        }, {
          duration: 300,  // скорость анимации
          complete: function(){ // callback
            $("#animation").hide();
            $("#form").show();
            $("#form").animate({
                opacity: 1
            }, 400);
          }
        });
        $("#logo").animate({
            width: '70%',
            marginTop: '30px'
        },700);
    },2950);
    */
});

$("#signin_way").click(function() {
    $("#signin_way").removeClass('active');
    $("#signup_way").removeClass('active');
    $("#signup").toggleClass('disActive');
    $("#signin").toggleClass('disActive');

    $("#signin_way").toggleClass('active');
    $("#signin").removeClass('disActive');
});

$("#signup_way").click(function() {
    $("#signin_way").removeClass('active');
    $("#signup_way").removeClass('active');
    $("#signup").toggleClass('disActive');
    $("#signin").toggleClass('disActive');

    $("#signup_way").toggleClass('active');
    $("#signup").removeClass('disActive');
});

function signup() {
    let mail = $('#mail_r').val();
    let password = $('#password_r').val();
    let passwordReply = $('#password_replay_r').val();

    if (password == passwordReply) {
        var settings = {
            "async": true,
            "crossDomain": false,
            "url":"./php/index/signup.php?vkid=" + getAllUrlParams().vk_user_id + "&refer=admin",
            "method": "GET"
        }
        $.ajax(settings).done(function (data) {
            if (data.result == 'Error') {
                alert(data.data.type);
            }else{
                $("#trade_info").attr('token', data.data.token);
            }
        });
    }
};

function signin() {
    let mail = $('#mail_l').val();
    let password = $('#password_l').val();
    var settings = {
        "async": true,
        "crossDomain": false,
        "url":"./php/index/signin.php?vkid=" + getAllUrlParams().vk_user_id,
        "method": "GET"
    }
    $.ajax(settings).done(function (data) {
        if (data.result == 'Error') {
            signup();
        }else{
            $("#trade_info").attr('token', data.data.token);
        }
    });
};