$.ajax({
	url:"/employee/checkRootLogin",
	async:"false",
	success:function(res){
		console.log(res)
		if(res.error && res.error==400){
			location.href="login.html"
		}
	}
})

$(function () {
	$(".login_out_bot").on("click", function () {
		$.ajax({
			url: "/employee/employeeLogout",
			type: "get",
			success: function (res) {
				console.log(res)
				if (res.success) {
					if (confirm("确认退出吗")) {
						location.href = "login.html"
					}
				} else {
					alert(res.message)
				}
			}
		})
	})



	var navLi = $('.navs li')

	navLi.on('click', function () {

		$(this).find('ul').slideToggle();

	});

});