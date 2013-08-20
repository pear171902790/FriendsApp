var nearby = {
    getInfo: function(friend) {
        return '<div><img style="float:left;margin:4px" src="' + friend.img + '" width="50" height="50"/>' +
            '<h4>' + friend.name + '</h4><p>电话 <a href="tel:' + friend.tel + '">' + friend.tel + '</a>, 邮箱 ' + friend.email + '</p></div>';
    },

    addFriendsLabel: function(map, friend) {
        var point = new BMap.Point(friend.address.lng, friend.address.lat);
        var label = new BMap.Label(friend.name);
        var infoWindow = new BMap.InfoWindow(getInfo(friend), { width: 100, height: 100, enableMessage: false });
        var marker = new BMap.Marker(point);
        marker.setLabel(label);
        map.addOverlay(marker);
        marker.addEventListener('click', function() {
            this.openInfoWindow(infoWindow);
        });
    },

    onTranslateSuccess: function(point) {
        var map = new BMap.Map('n-container');
        map.centerAndZoom(point, 15);
        var label = new BMap.Label('您的当前位置');
        var marker = new BMap.Marker(point);
        marker.setLabel(label);
        map.addOverlay(marker);
        var friends = FriendsApp.FriendDataAccess.getAll();
        if (friends) {
            for (var i = 0; i < friends.length; i++) {
                var friend = friends[i];
                addFriendsLabel(map, friend);
            }
        }
    },
    
    onGetCurrentPositionSuccess: function (position) {
        var gpsPoint = new BMap.Point(position.coords.longitude, position.coords.latitude);
        BMap.Convertor.translate(gpsPoint, 0, onTranslateSuccess);
    },

    onGetCurrentPositionError: function (error) {
        alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
    },

    onDeviceReady: function () {
        navigator.geolocation.getCurrentPosition(onGetCurrentPositionSuccess, onGetCurrentPositionError);
    },

    init: function () {
        document.addEventListener("deviceready", onDeviceReady, false);
    }
};

nearby.init();


