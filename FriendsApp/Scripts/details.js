var details = {
    init: function () {
      var friend = FriendsApp.FriendDataAccess.getCurrentFriend();
      if (friend) {
          $('#d-name').html(friend.name ? friend.name : '');
          $('#d-pic').attr('src', friend.img ? friend.img : '');
          $('#d-call').attr('href', friend.tel ? 'tel:' + friend.tel : '#');
          $('#d-sms').attr('href', friend.tel ? 'sms:' + friend.tel : '#');
          $('#d-age').html(friend.age ? friend.age : '');
          $('#d-email').html(friend.email ? friend.email : '');
          $('#d-tel').html(friend.tel ? friend.tel : '');

          var point = new BMap.Point(friend.address.lng, friend.address.lat);
          var map = new BMap.Map('d-container');
          map.centerAndZoom(point, 15);
          var marker = new BMap.Marker(point);
          map.addOverlay(marker);
          var x = $('#d-container').width() / 2;
          var y = $('#d-container').height() / 2;
          map.panBy(x, y);
          
          $('#d-delete').click(function () {
              navigator.notification.confirm('是否删除这个朋友？',
              function (button) {
                  if (button == 1) {
                      FriendsApp.FriendDataAccess.remove(friend);
                      location.href = 'index.html';
                  }
              },
              '确认删除', '确认,取消');
          });
      }
  }
};

details.init();