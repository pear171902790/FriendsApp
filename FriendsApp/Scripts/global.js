// JavaScript Document

var FriendsApp = {};
FriendsApp.currentFriendId = '';
FriendsApp.Common = {
    newGuid: function () {
        var guid = "";
        for (var i = 1; i <= 32; i++) {
            var n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
            if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
                guid += "-";
        }
        return guid;
    }
};
FriendsApp.Friend = function (id, name, imgSrc, age, addressPoint, email, tel) {
    this.id = id;
    this.name = name;
    this.imgSrc = imgSrc;
    this.age = age;
    this.addressPoint = addressPoint;
    this.email = email;
    this.tel = tel;
};
FriendsApp.FriendDataAccess = {
    getCurrentFriend: function () {
        var sFriend = window.localStorage.getItem(FriendsApp.currentFriendId);
        if (sFriend) {
            return JSON.parse(sFriend);
        } else {
            return undefined;
        }
    },
    getAll: function () {
        var sFriends = localStorage.getItem('friends');
        if (sFriends) {
            var friends = JSON.parse(sFriends);
            return friends;
        } else {
            return undefined;
        }
    },
    add: function (friend) {
        var friends = this.getAll() || [];
        alert(friends + typeof (friends));
        friends[friends.length] = friend;
        var sFriends = JSON.stringify(friends);
        var sFriend = JSON.stringify(friend);
        alert(localStorage);
        localStorage.setItem(friend.id, sFriend);
        localStorage.setItem('friends', sFriends);
    },
    remove: function (friend) {
        var friends = this.getAll();
        var itemNumber = 0;
        if (friends) {
            for (var i = 0; i < friends.length; i++) {
                if (friends[i].id === friend.id) {
                    itemNumber = i;
                }
            }
            var sFriends=JSON.stringify(friends.splice(itemNumber, 1));
            localStorage.removeItem(friend.id);
            localStorage.setItem('friends', sFriends);
            return true;
        } else {
            return false;
        }
    },
    update: function(friend) {
        this.remove(friend);
        this.add(friend);
    }
};




