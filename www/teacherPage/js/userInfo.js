/**
 * Created by asus on 2016/10/26.
 */
var userid;

//var content, content1;
$("input").focus(function () {
	content = $(this).val();
	$(this).select();
})
var userid;
var nick;



var app = angular.module("app", []);
app.config(function ($controllerProvider) {
	app.controller = $controllerProvider.register;
});
app.controller("info", function ($rootScope, $scope) {
	$rootScope.navurl = 'controller/nav.html';
	$rootScope.alerturl = 'controller/alert.html';
	$.post('/api/getMyInfo', function (res) {
		if (res.text == '没找到您的登录信息，请重新登陆或注册.') {
			alert("没找到您的登录信息，请重新登陆或注册.");
			window.location.href = 'http://m.xmgc360.com/start/web/account/'
		}
		userid = res.data['id'];
		$scope.userid = res.data['id'];
		$scope.nick = res.data['nick'];
		var dat = {
			userid: $scope.userid,
			nick: $scope.nick
		}
		$.post("/api/setInfo", dat, function (res) {
			console.log("sex", res.data);
			if (res.data.user.sex == "women") {
				$("input[value='women']").attr("checked", "checked");
			}
			console.log(">>>>>Res", res.data.user);
			$scope.info = res.data.user;


			userid = res.data.user.userid;
			//			$scope.$apply()
		});

		$scope.save = function () {
			var dat = {
				userid: $scope.userid,
				sex: $("input:checked").val(),
				job: $("input:eq(2)").val(),
				autograph: $("input:eq(3)").val(),
				self: $("input:eq(5)").val(),
				company: $("input:eq(6)").val(),
				email: $("input:eq(7)").val()
			}
			console.log(">>>>dat", dat);

			var Reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			console.log("?>>>>", Reg.test(dat.email));
			if (dat.email != "") {
				if (!Reg.test(dat.email)) {
					$scope.text = "邮箱格式错误";
					boxshow();
					return 0;
				}
			}
			$.post("/api/userInfo", dat, function (res) {
				console.log("?>>>>", res);
				if (res.data.affectedRows == 1) {
					$scope.text = "保存成功！";
					$.post("/api/setInfo", dat, function (res) {
						console.log("sex", res.data.user.sex);
						if (res.data.user.sex == "women") {
							$("input[value='women']").attr("checked", "checked");
						}
						console.log(">>>>>Res", res.data.user);
						$scope.info = res.data.user;
						//						$scope.$apply();


					});

					$scope.$apply();
					boxshow();
				} else {
					$scope.text = res.text
						//				});
					$scope.$apply();
					boxshow();
				}
			});
		};
		$scope.reset = function () {
			$("input:gt(1)").val("");
			$("input:eq(0),input:eq(1)").removeAttr("checked");
			$("input:eq(0)").attr("checked", "checked");
		}
		$scope.sureTeacher = function () {

			if (confirm('确认申请为老师么，需要管理员确认。')) {

				var dat = {
					userid: $scope.userid,
					request: '请求申请为老师'
				}
				console.log('id', dat);
				$.post("/api/pushMsg", dat, function (res) {

					if (res.code == 1) {

						$scope.text = '请求发送成功，请等待确认';
						$scope.$apply();
						boxshow();
					} else {
						$scope.text = res.text;
						$scope.$apply();
						boxshow();
					}
				})
			}
		}
	});
});

function uploadpic() {
	_fns.uploadFile2(2, $('#myImg'), function (f) {
		console.log('>>>>before:', f);
	}, function (f) {

	}, function (f) {
		console.log('>>>>successXXXX:', f);
		var dat = {
			userid: userid,
			src: f.url
		}
		console.log(">>>>>>", dat);
		$.get('/api/upUserimg', dat, function (res) {
			console.log("?????", res);
			$('#myImg').attr('src', dat.src);
		})
	});

}
