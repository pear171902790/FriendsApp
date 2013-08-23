var edit = {
    addressPoint: { lng: 0, lat: 0 },
    img: document.getElementById('e-img'),

    showPicFromUrl: function (imgUrl) {
        this.img.style.display = 'block';
        this.img.src = imgUrl;
    },

    showPicFromData: function (picData) {
        this.img.style.display = 'block';
        this.img.src = 'data:image/jpeg;base64,' + picData;
    },

    onError: function (msg) {
        alert(msg);
    },

    initMap: function (lng,lat) {
        var point = new BMap.Point(lng,lat);
        var map = new BMap.Map('e-container');
        map.centerAndZoom(point, 15);
        var marker = new BMap.Marker(point);
        map.addOverlay(marker);
        var x = $('#d-container').width() / 2;
        var y = $('#d-container').height() / 2;
        map.panBy(x, y);
        map.addEventListener('click',
            function (e) {
                edit.addressPoint.lng = e.point.lng;
                edit.addressPoint.lat = e.point.lat;
                map.clearOverlays();
                var marker =
                    new BMap.Marker(
                        new BMap.Point(edit.addressPoint.lng, edit.addressPoint.lat));
                map.addOverlay(marker);
                alert('标注成功');
            });
    },

    init: function () {
        //填充数据
        var friend = FriendsApp.FriendDataAccess.getCurrentFriend();
        if (friend) {
            $('#e-name').val(friend.name ? friend.name : '');
            $('#e-pic').attr('src', friend.imgSrc ? friend.imgSrc : '');
            $('#e-age').val(friend.age ? friend.age : '');
            $('#e-email').val(friend.email ? friend.email : '');
            $('#e-tel').val(friend.tel ? friend.tel : '');
            this.initMap(friend.addressPoint.lng, friend.addressPoint.lat);
        }

        $('#selCity').change(function () {
            map.setCenter($(this).val());
        });
       

        $('#takePic').bind('click', function () {
            navigator.camera.getPicture(edit.showPicFromData, edit.onError, { quality: 50, destinationType: navigator.camera.DestinationType.DATA_URL });
        });
        
        $('#getPic').bind('click', function () {
            navigator.camera.getPicture(edit.showPicFromUrl, edit.onError, { quality: 50, destinationType: navigator.camera.DestinationType.FILE_URI, sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY });
        });

        $('#e-save').bind('click', function () {
            friend.name = $('#e-name').val();
            friend.imgSrc = $('#e-img').attr('src');
            friend.age = $('#e-age').val();
            friend.email = $('#e-email').val();
            friend.tel = $('#e-tel').val();
            friend.addressPoint = edit.addressPoint;
            FriendsApp.FriendDataAccess.update(friend);
            $("#toDetails").trigger("click");
        });
    }
};

edit.init();





