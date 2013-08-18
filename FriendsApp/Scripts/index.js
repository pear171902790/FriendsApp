// JavaScript Document

            var strFriends = local.getItem('friends');
            var p = 'pppppppppppppppp';
            var fillList = function (name, img, age, email) {
                return '<li><a href="details.html" class="toDetails" data-name="' + name + '" data-transition="flow"><img src="' + img + '" style="width:80px; height:80px;"><h1>' + name + '</h1><p>年龄 ' + age + ',邮箱 ' + email + '</p></li>';
            };

            if (strFriends) {
                var friends = JSON.parse(strFriends);
                var ulHtml = '';
                for (var i = friends.length - 1; i >= 0; i--) {
                    var friend = friends[i];
                    ulHtml += fillList(friend.name, friend.img, friend.age, friend.email);
                }
                $('#show').html(ulHtml);
            }

            $('.toDetails').click(function () {
                currentFriend = $(this).attr('data-name');
            });


            var eventBackButton = function() {
                navigator.notification.confirm('是否退出程序',
                    function(button) {
                        if (button == 1) {
                            navigator.app.exitApp();
                        }
                    },
                    '退出程序', '确认,取消');
            };


            document.addEventListener('deviceready',
                                        function () {
                                            document.addEventListener('backbutton', eventBackButton, false);
                                        },
                                        false);