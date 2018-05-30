
//$(function(){
    var sort = $("#sort h3");
    var sub_nav = $(".sub_nav");
    var sortIsClick = 0;
    var body = $("body");
    var cart = $("#cart");
    var cartUrl = $("#cart a");




    cart.click(function(){
        var _cartUrl = cartUrl.attr("href");
        window.location= _cartUrl;

    });


    sub_nav.click(function(event){
        event.stopPropagation();
    });

    sort.click(function(event){
        event.stopPropagation();
        if(sortIsClick == 0){
            sortIsClick = 1;
            sub_nav.slideDown("fast");
            sort.find("span").css("transform","rotate(-90deg)");
        }
        else {
            sortIsClick = 0;
            sub_nav.slideUp("fast");
            sort.find("span").css("transform","rotate(90deg)");
        }
    });

   /* 点击其他位置商品分类的弹出菜单消失*/
    body.click(function() {
        if (sortIsClick == 1) {
            sortIsClick = 0;
            sub_nav.css("display", "none");
            sort.find("span").css("transform","rotate(90deg)");
        }
    });

    /*购物车上面的数字*/
    setShopCartNumFromLocalStorage();

    function setShopCartNumFromLocalStorage () {
        var cart_num = $(".cart_num");
        var shopCartReg = /^shop_cart/m;
        var num = 0;
        for(var key in localStorage){
            if (shopCartReg.test(key)) {
                num++;
            }
        }
        cart_num.text(num);
    }



//});