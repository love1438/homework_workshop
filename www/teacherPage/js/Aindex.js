$(function () {
	$("#clear").click(function () {
		$("#notice").val('');
	});

	$("#quit").click(function () {
		window.close()
	});

});

app.run(function ($rootScope) {
	$rootScope.navurl = 'controller/nav.html';
	$rootScope.alerturl = 'controller/alert.html';
	//老师数量
	$.get("/api/getNumber", function (res) {
		console.log("....", res.data);
		$rootScope.number = res.data;
	});


});
app.controller('adminController', function ($scope, $rootScope) {
	var guiju = /^[0-9A-Za-z]{4,10}$/;
	$scope.giveRole = function () {
		dat = {
			aduserid: $rootScope.userid,
			userid: $("#id").val(),
			roleid: $("#role").val()
		}
		console.log(">>>>role", dat);
		$.post('/api/giveRole', dat, function (res) {
			console.log(">>>>", res);
			if (res.code == 1) {
				$scope.$apply(function () {
					$scope.text = '身份赋予成功';
					$scope.infomation.name = res.data.name;
					console.log("dsds", $scope.infomation.name)
				});
				boxshow();
			} else {
				$scope.$apply(function () {
					$scope.text = res.text
				});
				boxshow();
			}
		})
	};
	$scope.check = function () {
		var myDate = new Date();
		var mouth = '';
		var day = '';
		var hour = '';
		var minutes = '';
		if (myDate.getMonth() + 1 < 10) {
			mouth = "0";
		}
		if (myDate.getDate() < 10) {
			day = "0";
		}
		if (myDate.getHours() < 10) {
			hour = "0";
		}
		if (myDate.getMinutes() < 10) {
			minutes = "0";
		}
		var creatdate = myDate.getFullYear() + "-" + mouth + (myDate.getMonth() + 1) + "-" + day + myDate.getDate() + " " + hour + myDate.getHours() + ":" + minutes + myDate.getMinutes();
		var dat = {
			creatdate: creatdate,
			userid: $rootScope.userid,
			content: $("#notice").val()
		}
		console.log(">>>", dat)
		$.get("/api/addNotice", dat, function (res) {
			console.log(res);
			if (res.code == 1) {
				$scope.$apply(function () {
					$scope.text = '公告发布成功'
				});
				boxshow();
			} else {
				$scope.$apply(function () {
					$scope.text = res.text
				});
				boxshow();
			}
		});

	};
	$scope.info = function () {
		var dat = {
			userid: $scope.value
		}
		$.get('/api/role', dat, function (res) {
			if (res.code == 1) {
				console.log("res is", res.data.nick);
				$scope.infomation = res.data;
				$("#information").fadeIn();
			} else {
				$("#information").fadeOut();
			}
			$scope.$apply();
			//			console.log('changdu', $scope.infomation.length)
		})
	};
	$scope.addClass = function () {
		console.log('class', $scope.className);
		var dat = {
			aduserid: $rootScope.userid,
			name: $scope.className
		}
		$.get('/api/addClass', dat, function (res) {
			console.log("dsd", res);
			if (res.code == 1) {
				$scope.$apply(function () {
					$scope.text = '添加成功';
				});
				boxshow();
			} else {
				$scope.$apply(function () {
					$scope.text = res.text
				});
				boxshow();
			}
		})
	};
	$scope.changePs = function () {
		var oldPs = $scope.oldPs;
		var newPsOne = $scope.newPsOne;
		var newPsTwo = $scope.newPsTwo;
		if (oldPs == undefined || newPsOne == undefined || newPsTwo == undefined) {
			$scope.text = '请输入密码'
			boxshow();
			return 0;
		}
		if (newPsOne != newPsTwo) {
			$scope.text = '两次新密码不一致';
			boxshow();
			return 0;
		}
		if (!guiju.test(oldPs) || !guiju.test(newPsOne) || !guiju.test(newPsTwo)) {

			$scope.text = '密码格式错误'

			boxshow();
			return 0;
		}
		if (oldPs == newPsOne) {
			$scope.text = '新密码不能与旧密码相同';
			boxshow();
			return 0;
		}
		var dat = {
			aduserid: $rootScope.userid,
			oldPs: hex_md5(oldPs),
			newPs: hex_md5(newPsOne),
		}
		console.log("dat is ", dat);
		$.post('/api/adChangePs', dat, function (res) {
			console.log('res is ', res);
			if (res.code == 1) {
				$scope.$apply(function () {
					$scope.text = '修改成功';
				});
				boxshow();
			} else {
				$scope.$apply(function () {
					$scope.text = res.text
				});
				boxshow();
			}
		})

	}

})
$('input[type="text"],input[type="number"],textarea,input[type="password"]').click(function () {
	$(this).select();
})
