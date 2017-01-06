console.log('>>>>1222222');
var userid;
app.controller('myc', function ($scope) {
		$.get('/api/getMyInfo', function (res) {
			$scope.$apply(function () {
				$scope.userinfo = {
					nick: res.data['nick'],
					userid: res.data['id']
				}
				userid = res.data['id']
				var dat = {
					userid: res.data['id']
				}
				$.get('/api/userimg', dat, function (res) {
					$('#img').attr('src', res.data.img['img']);
				})
				$.post("/api/setInfo", dat, function (res) {
					console.log(">>>>>>nick", res);
					$scope.$apply(function () {
						$scope.userinfo.autograph = res.data.user.autograph;
					});
				});
			})
		})
	})
	//	侧边栏样式，动画设置
$(function () {
	$('#pull').click(function () {

		$('#drawer').css({
			display: 'block'
		});
		$('#drawer1').animate({
			left: 0
		}, 'slow')
	});
	$('#drawer').click(function () {
		$('#drawer').css({
			display: 'none'
		})
		$('#drawer1').animate({
			left: -80 + '%'
		})

	});
	//    $('#img').click(function () {
	//        _fns.uploadFile2(1, $('#img'), function (f) {
	//
	//        }, function (f) {
	//
	//        }, function (f) {
	//            console.log('>>>>success2:', f);
	//            var dat = {
	//                userid: userid,
	//                src: f.url
	//            }
	//            $.post('/api/upUserimg', dat, function (res) {
	//                console.log(">>>>", res);
	//                $('#img').attr('src', f.url);
	//            })
	//        });
	//    });
});
