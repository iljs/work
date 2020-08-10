$("#auth_button").click(function(){
	let login = $("#auth_input_login").val();
	let password = $("#auth_input_password").val();
	var settings = {
		"async": true,
		"crossDomain": false,
		"url": "./php/auth.php?login=" + login + "&password=" + password,
		"method": "GET"
	}
	$.ajax(settings).done(function (data) {
		if(data.result == 'Success'){
			var date = new Date();
			var days = 30;
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			$.cookie("token", data.data.token, { expires: date }); 
			
			$("#user_info").attr("token", data.data.token);
			$("#auth").animate({
				opacity: 0
			},600);
			setTimeout(function(){
				$("#auth").css("display", "none");
				$("#main").css("display", "block");
				$("#main").animate({
					opacity: 1
				},600);
			},600);

			reports();
		}else{
			if (data.data.type == 1) {
				$("#auth_input_login").css("border-color", "red");
				setTimeout(function(){
					$("#auth_input_login").css("border-color", "white");
				},3000);
			}
			if (data.data.type == 2) {
				$("#auth_input_password").css("border-color", "red");
				setTimeout(function(){
					$("#auth_input_password").css("border-color", "white");
				},3000);
			}
		}
	});
});