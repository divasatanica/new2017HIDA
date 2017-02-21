
    $(document).ready(function () {
	   var config = {
					authDomain: "senpai.wilddog.com",
					syncURL: "https://senpai.wilddogio.com"
					};	
    /*
	var ref = new Wilddog('https://senpai.wilddog.io/new2017HIDA');
	*/
	wilddog.initializeApp(config);
    
	var ref = wilddog.sync().ref();
	
    var arr = [];
    $('#dmSendButton').click(function () {
        var text = $('#dmText').val();
        ref.child('new2017HIDA').push(text);
        $('#dmText').val('');
    });
    $('#dmText').keypress(function (event) {
        if (event.keyCode == '13') {
            $('#dmSendButton').trigger('click');
        }
    });
    ref.child('new2017HIDA').on('child_added', function (snapshot) {
        var text = snapshot.val();
        arr.push(text);
        var textObj = $('<div class="dm_message"></div>');
        textObj.text(text);
        $('.dmScreen').append(textObj);
        moveObj(textObj);
    });
    var topMin = $('.dmMask').offset().top;
    var topMax = topMin + $('.dmMask').height();
    var _top = Math.floor(Math.random() * (topMax - topMin + 1)) + topMin;
    var moveObj = function (obj) {
        var _left = $('.dmMask').width() - obj.width();
		
		var randomCoordinate = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
		_top = _top + randomCoordinate;
        if (_top > topMax - randomCoordinate) {
            _top = topMin;
        }
        obj.css({
            left: _left,
            top: _top,
            color: getRandomColor()
        });
        var time = 20000 + 10000 * Math.random();
        obj.animate({ left: '-' + _left + 'px' }, time, function () {
            obj.remove();
        });
    };
    var getRandomColor = function () {
        return '#' + function (h) {
            return new Array(7 - h.length).join('0') + h;
        }((Math.floor(Math.random() * 100001) << 0).toString(16));
    };
    var getAndRun = function () {
        if (arr.length > 0) {
            var n = Math.floor(Math.random() * (arr.length));
            var textObj = $('<div>' + arr[n] + '</div>');
            $('.dmScreen').append(textObj);
            moveObj(textObj);
        }
        setTimeout(getAndRun, 3000);
    };
    jQuery.fx.interval = 50;
    getAndRun();
});
  //# sourceURL=pen.js
  