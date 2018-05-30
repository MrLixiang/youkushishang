$(function(){
    var sub_tips = $(".sub_tips");
    var sub_menu = $(".sub_menu");
    var delete_order = $(".order_details").find(":button");
    var orderItem = $(".order_details > div");




    sub_tips.click(function() {
        var index = sub_tips.index(this);
        sub_menu.eq(index).find("dd").slideToggle();
    })

    delete_order.click(function(){
        var index = delete_order.index(this);
        orderItem.eq(index).detach();
    })


});
