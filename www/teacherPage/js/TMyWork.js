app.controller('worklist', function ($scope) {
	$.get('/api/kecheng', function (res) {
		console.log(">>>cid", res)
			//		$scope.$apply(function () {
		$scope.classes = res;

		//		})
		$.get('/api/getMyInfo', function (res) {
			dat = {
				userid: res.data['id']
			}
			console.log(">>>dat", dat)
			$.get('/api/worklist', dat, function (res) {
				console.log('>>>>12', res);
				//				$scope.$apply(function () {
				$scope.worklists = res;
				$scope.$apply();
				//				})
			})
		})

	})
})
