// JavaScript Document
var index = {
    fillList: function (name, img, age, email) {
        return '<li><a href="details.html" class="toDetails" data-name="' + name + '" data-transition="flow"><img src="' + img + '" style="width:80px; height:80px;"><h1>' + name + '</h1><p>年龄 ' + age + ',邮箱 ' + email + '</p></li>';
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
        if (FriendsApp && FriendsApp.FriendDataAccess) {
            var friends = FriendsApp.FriendDataAccess.getAll();
            if (friends) {
                for (var i = friends.length - 1; i >= 0; i--) {
                    var friend = friends[i];
                    ulHtml += fillList(friend.name, friend.img, friend.age, friend.email);
                }
            }
        }
        $('#show').html(ulHtml);
    },
    init: function () {
        ulInit();
        $('.toDetails').click(function () {
            if (FriendsApp && FriendsApp.currentFriendId) {
                FriendsApp.currentFriendId = $(this).attr('data-name');
            }
        });
        document.addEventListener('deviceready',
                        function () {
                            document.addEventListener('backbutton', eventBackButton, false);
                        },
                        false);
    }
};
index.init();





