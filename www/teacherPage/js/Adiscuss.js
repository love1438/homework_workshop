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
    $.get("/api/getDiscuss", function (res) {
        console.log(">>>>>>Res", res);
        $scope.$apply(function () {
            $scope.filteredNotes = [], $scope.currentPage = 1, $scope.numPerPage = 20, $scope.maxSize = 3;
            $scope.discuss = res.data;
            $scope.length = Math.ceil(res.data.length / $scope.numPerPage) + "0";
            console.log($scope.length);
            $scope.$watch('currentPage + numPerPage', function () {
                var begin = (($scope.currentPage - 1) * $scope.numPerPage),
                    end = begin + $scope.numPerPage;
                $scope.filteredNotes = $scope.discuss.slice(begin, end);

            });
            $scope.delete = function (chatid) {
                var dat = {
                    chatid: chatid
                }
                var a = confirm("您确定要删除吗？");
                if (a) {
                    console.log($scope.filteredNotes);
                    $scope.filteredNotes.splice($.inArray(this.v, $scope.filteredNotes), 1);
                    $.post("/api/delete", dat, function (res) {

                    });
                };
            }
        })
    })
})
