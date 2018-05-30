$(function(){
    var sub_tips = $(".sub_tips");
    var sub_menu = $(".sub_menu");


    sub_tips.click(function() {
        var index = sub_tips.index(this);
        sub_menu.eq(index).find("dd").slideToggle();
    })

    /*显示更多*/
    showMore();
    function showMore () {
        var showMore = $("#show_more");
        showMore.click(function () {
            $(".order_details li:gt(1)").css("display","block");
        })
    }

});
