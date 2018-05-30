$(function(){
    var new_picture = $("#new_picture");
    var newUrl =  $("#new_picture a");
    var hot_picture = $("#hot_picture");
    var hotUrl = $("#hot_picture a");
    var high_pic = $("#high_pic");
    var highUrl = $("#high_pic a");
    new_picture.click(function(){
        var _newUrl = newUrl.attr("href");
        location.href = _newUrl;
    });
    hot_picture.click(function(){
        var _hotUrl = hotUrl.attr("href");
        location.href = _hotUrl;
    });
    high_pic.click(function(){
        var _highUrl = highUrl.attr("href");
        location.href = _highUrl;
    });


});
