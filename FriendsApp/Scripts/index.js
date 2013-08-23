var index = {
    fillList: function (id, name, imgSrc, age, email) {
        return '<li><a href="details.html" class="toDetails" data-id="'+ id +'" data-name="' + name + '" data-transition="flow"><img src="' + imgSrc + '" style="width:80px; height:80px;"><h1>' + name + '</h1><p>年龄 ' + age + ',邮箱 ' + email + '</p></li>';
    },
    eventBackButton: function () {
        navigator.notification.confirm('是否退出程序',
            function (button) {
                if (button == 1) {
                    navigator.app.exitApp();
                }
            },
            '退出程序', '确认,取消');
    },
    ulInit: function () {
        var ulHtml = '';
        if (FriendsApp) {
            var friends = FriendsApp.FriendDataAccess.getAll();
            if (friends) {
                for (var i = friends.length - 1; i >= 0; i--) {
                    var friend = friends[i];
                    ulHtml += index.fillList(friend.id, friend.name, friend.imgSrc, friend.age, friend.email);
                }
            }
        }
        $('#show').html(ulHtml);
    },
    init: function () {
        this.ulInit();
        $('.toDetails').click(function () {
            if (FriendsApp) {
                FriendsApp.currentFriendId = $(this).attr('data-id');
            }
        });
        document.addEventListener('deviceready',
                        function () {
                            document.addEventListener('backbutton', index.eventBackButton, false);
                        },
                        false);
    }
};
index.init();





