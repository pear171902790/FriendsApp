﻿


var addFriend = {
    addressPoint: { lng: 0, lat: 0 },
    
    img: document.getElementById('af-img'),
    
    fillFields: function () {
        var obj = window.event.srcElement;
        $('#af-name').val($(obj).attr('data-name'));
        $('#af-tel').val($(obj).attr('data-tel'));
        $('#af-email').val($(obj).attr('data-email'));
        $("#closeContactList").trigger("click");
    },
    
    onGetAllContactsSuccess: function (contacts) {
        var contactListHtml = '';
        for (var i = 0; i < contacts.length; i++) {
            var contact = contacts[i];
            if (contact) {
                var name = contact.displayName ? contact.displayName : '';
                var tel = contact.phoneNumbers ? contact.phoneNumbers[0].value : '';
                var email = contact.emails ? contact.emails[0].value : '';
                contactListHtml += '<li data-theme="d" data-icon="check"><a href="#" class="fillFields" data-name="' +
                    name + '" data-tel="' + tel + '" data-email="' + email + '">' + name + '</a></li>';
            }
        }
        $('.fillFields').on('click', this.fillFields);
        $('#contactList').html(contactListHtml);
        $("#contactList").listview("refresh");
    },
    
    onGetAllContactsError: function () {
        alert('获取联系人失败');
    },

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

    initMap: function () {
        var map = new BMap.Map('af-container');
        map.centerAndZoom('西安', 15);
        map.addEventListener('click',
            function (e) {
                addFriend.addressPoint.lng = e.point.lng;
                addFriend.addressPoint.lat = e.point.lat;
                map.clearOverlays();
                var marker =
                    new BMap.Marker(
                        new BMap.Point(addFriend.addressPoint.lng, addFriend.addressPoint.lat));
                map.addOverlay(marker);
                alert('标注成功');
            });
    },

    init: function () {
		alert('aaa');
		var autoWidth=screen.availWidth/2;
		var autoHeight=screen.availHeight/2;
		
		
		alert(autoWidth+','+autoHeight);
		$('.auto-height-width').css({'width':autoWidth+'px','height':autoHeight+'px'});
		
        $('#selCity').change(function () {
            map.setCenter($(this).val());
        });

        $('#selectFromContacts').click(function () {
            var options = new ContactFindOptions();
            options.multiple = true;
            var filter = ["displayName", "phoneNumbers", "emails"];
            navigator.contacts.find(filter, addFriend.onGetAllContactsSuccess, addFriend.onGetAllContactsError, options);
        });

        $('#takePic').bind('click', function () {
            navigator.camera.getPicture(addFriend.showPicFromData, addFriend.onError, { quality: 50, destinationType: navigator.camera.DestinationType.DATA_URL });
        });
        $('#getPic').bind('click', function () {
            navigator.camera.getPicture(addFriend.showPicFromUrl, addFriend.onError, { quality: 50, destinationType: navigator.camera.DestinationType.FILE_URI, sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY });
        });

        $('#af-save').bind('click', function () {
            var name = $('#af-name').val()||'';
            var imgSrc = $('#af-img').attr('src') || '';
            var age = $('#af-age').val() || '';
            var email = $('#af-email').val() || '';
            var tel = $('#af-tel').val() || '';
            var id = FriendsApp.Common.newGuid();
            var friend = new FriendsApp.Friend(id, name, imgSrc, age, addFriend.addressPoint, email, tel);
            FriendsApp.FriendDataAccess.add(friend);
            alert('添加成功');
            window.location.href = 'index.html';
        });
    }
};

addFriend.init();





