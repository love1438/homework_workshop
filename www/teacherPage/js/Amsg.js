function handleMsg($scope, dat) {
	$.post('/api/handleMsg', dat, function (res) {
		console.log('res', res);
		if (res.code == 1) {
			$scope.text = '处理成功';
			$scope.$apply();
			boxshow();
			$.get('/api/getUserMsg', function (res) {
				$scope.request = res.data;
				$scope.$apply();
			})
		} else {
			$scope.text = res.text
			$scope.$apply();
			boxshow();
		}
	})
}

function giveRole($scope, dat) {
	$.post('/api/giveRole', dat, function (res) {
		console.log(">>>>", res);
		if (res.code == 1) {
			$scope.text = '身份赋予成功';
			$scope.infomation.name = res.data.name;
			console.log("dsds", $scope.infomation.name)
			$scope.$apply();

			boxshow();
		} else {
			$scope.$apply(function () {
				$scope.text = res.text
			});
			boxshow();
		}
	})
}
app.controller('amsgcontroller', function ($scope, $rootScope) {
	$.get('/api/getUserMsg', function (res) {
		console.log("qingqiu", res);
		$scope.request = res.data;
		$scope.$apply();
		var msgid;
		var requestid;
		$scope.feedback = function (newid, newRequestid) {
			msgid = newid;
			requestid = newRequestid;
			console.log("newmsgid", msgid)
		}
		$scope.saveChange = function (flag) {
			if ($scope.query) {
				var dat = {
					feednick: $rootScope.nick,
					msgid: msgid,
					feedback: $scope.query
				}
				console.log("dat", dat);
				handleMsg($scope, dat);
				if (flag != 0) {
					var idDat = {
						aduserid: $rootScope.userid,
						userid: requestid,
						roleid: 2
					}
					giveRole($scope, idDat);
				}
			} else {
				$scope.text = '请输入处理结果'
				boxshow();
			}
		}
		$scope.confirm = function (flag, msgId, userid) {
			var msg = '同意';
			if (flag == 0) {
				msg = '拒绝'
			}
			var dat = {
				feednick: $rootScope.nick,
				msgid: msgId,
				feedback: msg
			}
			handleMsg($scope, dat);
			if (flag != 0) {
				var idDat = {
					aduserid: $rootScope.userid,
					userid: userid,
					roleid: 2
				}
				giveRole($scope, idDat);
			}
		}
		$scope.giveRole = function () {
			dat = {
				aduserid: $rootScope.userid,
				userid: $("#id").val(),
				roleid: $("#role").val()
			}
			console.log(">>>>role", dat);
			giveRole($scope, dat);

		};
		$scope.info = function () {
			console.log('ddat', dat)
			var dat = {
				userid: $scope.idvalue
			}
			console.log('ddat', dat)
			$.get('/api/role', dat, function (res) {
				console.log("res", res)
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
		}
	})
})
