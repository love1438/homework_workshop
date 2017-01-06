console.log(">>>>>>>>>>>I am working")
app.run(function ($rootScope) {
	$rootScope.navurl = 'controller/nav.html';
	$rootScope.alerturl = 'controller/alert.html';
	$.post('/api/getMyInfo', function (res) {
		if (res.text == '没找到您的登录信息，请重新登陆或注册.') {
			alert("没找到您的登录信息，请重新登陆或注册.");
			window.location.href = 'http://m.xmgc360.com/start/web/account/'
		}
	})

});
app.controller("kzq", function ($scope) {
	$.get("/api/getClass", function (res) {
		console.log(">>>>>>Res1", res.data);
		$scope.class = res.data;
		$scope.$apply();
		console.log(">>>>>>Res", $scope.class);
		$scope.delete = function (cid) {
			var dat = {
				cid: cid
			}
			console.log('>>>>>', dat)
			var a = confirm("您确定要删除吗？与之相关的一切都会被删除。");
			if (a) {
				$scope.class.splice($.inArray(this.v, $scope.class), 1);
				$.post("/api/delete", dat, function (res) {
					console.log(res)
				});
			};
		}
	})
})
