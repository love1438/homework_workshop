function getimg($scope) {
	$.get('/api/getImg', function (res) {
		console.log('.....', res);
		$scope.bgImg = res.data;
		$scope.$apply();
	})
}


app.controller('imgcontroller', function ($scope, $rootScope) {
	getimg($scope);

	$scope.shangchuan = function () {
		_fns.uploadFile2(2, $('#shangchuan'), function (f) {}, function (f) {
			$('#wancheng').css('width', f.percent + '%');
			$('#wancheng').html(f.percent + '%');
		}, function (f) {
			console.log("dizhi", f.url);
			var dat = {
				src: f.url,
				name: f.name,
				userid: $rootScope.userid,
				link: $scope.link,
			}
			$.post('/api/upImg', dat, function (res) {
				console.log('dsds', res)
				if (res.code == 1) {
					$scope.text = '添加成功！'
					$scope.$apply();
					boxshow();
					getimg($scope);
				} else {
					$scope.text = res.text
					$scope.$apply();
					boxshow();
				}
			})

		});

	};

	$scope.delect = function (id) {
		var dat = {
			imgid: id,
			userid: $rootScope.userid
		}
		console.log('dsds', dat)
		$.post('/api/delectImg', dat, function (res) {
			console.log('dsds', res)
			if (res.code == 1) {
				$scope.text = '删除成功！'
				$scope.$apply();
				boxshow();
				getimg($scope);
			} else {
				$scope.text = res.text
				$scope.$apply();
				boxshow();
			}
		})
	}

	$scope.changeImgFlag = function (id, flag) {
		var dat = {
			userid: $rootScope.userid,
			imgid: id,
			flag: flag
		}
		$.post('/api/changeImgFlag', dat, function (res) {
			console.log('changeImgFlag', res);
			if (res.code == 1) {
				$scope.text = '修改成功！'
				$scope.$apply();
				boxshow();
				getimg($scope);
			} else {
				$scope.text = res.text
				$scope.$apply();
				boxshow();
			}
		})
	}
})
$("input:text").click(function () {
	$(this).select();
});
