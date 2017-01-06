app.run(function ($rootScope) {
    $rootScope.navurl = 'controller/nav.html';
    $rootScope.alerturl = 'controller/alert.html';

});
app.controller("checkWork", function ($rootScope, $scope) {
    var str = window.location.search;
    var dat = {
        serianumber: str.substring(13)
    }

    console.log(">>>>>>dat", dat);
    $.post("/api/getWorkDet", dat, function (res) {
        var score = parseInt(res["data"][0].score);
        res["data"][0].creatdate = res["data"][0].creatdate.substring(0, 10);
        var Wid = res["data"][0].wid;
        console.log(">>>res", res["data"][0]);
        $scope.workinfo = res["data"][0];
        $scope.view = function () {
            var url = "http://api.idocv.com/view/url?url=" + encodeURIComponent(res.data[0].annex) + "&name=" + res.data[0].filename + "        ";
            $("#view").attr("src", url);
            $('#myModal1').modal()
        }
        $scope.saveIt = function () {
            var sc = {
                userid: $rootScope.userid,
                serianumber: str.substring(13),
                score: $("#ex6SliderVal").html(),
                comment: $("#comment").val()
            }
            console.log(">>>>>sc", sc);
            $.post("/api/saveComment", sc, function (res) {
                console.log("insertInfo", res);
                if (res.code == 1) {
                    $scope.$apply(function () {
                        $scope.text = '批改成功'
                    });
                    boxshow();
                    setTimeout(function () {
                        window.location.href = '__TWorkDetail.html?wid=' + Wid;
                    }, 1500);
                }
                //	发布失败，显示错误信息
                else {
                    $scope.$apply(function () {
                        $scope.text = res.text
                    });
                    boxshow();
                }
            });
        }
        $scope.back = function () {
            window.history.back();
        }
    });
});
