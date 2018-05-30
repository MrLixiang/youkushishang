$(function(){
        var styleSelect = $(".style_select");
        var homeService = $(".home_service");
        var minute = $(".minute");
        var plus = $(".plus");
        var num = $(".num");
        var price = $(".price");
        var picLg = $(".pic_lg").find("a");
        var picSm = $(".pic_sm").find("a");
        var prev = $(".prev");
        var next = $(".next");
        var subMenu = $(".menu").find("li");
        var pic_sm = $(".pic_sm a img");
        var pic_lg = picLg.find("img");
        var pro_tab = $("#pro_tab li");
        var pro_toggle = $(".pro_toggle");
        var pic_scroll = $("#pic_scroll");
        var address = "重庆市南坪万象城B栋601室&重庆市江北五里店怡心花园1栋8-6&重庆市大学城康居西城1组团1栋31-2&";
        var receive_address = $("#receive_address");



        var imgSrc;
        var picLgSrc;
        var buynow = $(".buynow");
        var addshopcart = $(".addshopcart");



        selectSpot();
        orderSave();
        setPicEvent();
        addToShopCart();
        subMenuEvent();
        picInit();
        smallPicSwitch();
        proTebEvent();
        numReg();



        /*选择地址*/
        function selectSpot(){
            /*var address = localStorage.getItem("address");*/
            var _address = address.slice(0,address.length-1);
            var addressArr = address.split("&");
            var spotStr = '';
            for(var i = 0,len = addressArr.length; i < len ; i ++){
                spotStr += '<option value="">'+ addressArr[i] +'</option>';
            }
            receive_address.append(spotStr);
        }

        /*选择款式*/
        styleSelect.children("div").click(function(){
            $(this).addClass("current").siblings().removeClass();
        });
        homeService.click(function(){
            if($(this).hasClass("home_service")){
                $(this).removeClass("home_service");
            }
            else {
                $(this).addClass("home_service");
            }
        });
        /*购买数量加*/
        plus.click(function(){
            var _num = Number(num.val());
            _num ++;
            num.val(_num);
            if(_num > 1){
                minute.css("color","#000");
            }
        });

        /*购买数量减*/
        minute.click(function(){
            var _num = Number(num.val());
            if (_num > 1) {
                _num --;
            }
            num.val(_num);
            if(_num == 1){
                $(this).css("color","#999999");
            }
        });

        /*购买数量输入框正则验证非数字字符*/
        function numReg () {
            num.keyup(function(){
                var _num = num.val();
                if(!_num){
                    num.val("1");
                }
                if(_num = "0"){
                    num.val("1");
                }
                var numRegExp = /^\d*$/;
                if (!numRegExp.test(_num)) {
                    setTimeout(function () {
                        var numArr = [];
                        var filterNum;
                        for(var i = 0, l = _num.length; i < l ; i++) {
                            numArr[i] = _num.substr(i,1);
                            if(!numRegExp.test(numArr[i])){
                                numArr.splice(i,1);
                            }
                        }
                        filterNum = numArr.join("");
                        num.val(filterNum);
                    },1000);
                }
            })
        }



        /*放大镜小图片*/
        /*picSm.hover(function () {
         $(this).addClass("current").siblings().removeClass("current");
         var n = $(this).index();
         picLg.eq(n).css("display","block").siblings().css("display","none");
         imgSrc = pic_sm.eq(n).attr("src");
         $(".pic_lg a img").eq(n).attr("src",imgSrc);

         });*/
        picSm.hover(function () {
            var _vm= $(this);
            _vm.parent().addClass("current").siblings().removeClass("current");
            imgSrc = _vm.children("img").attr("src");
            pic_lg.attr("src",imgSrc);
            picLgSrc =  pic_lg.attr("src");
        });
        function smallPicSwitch () {
            var len = picSm.length;
            /*前一张*/
            prev.click(function(){
                if(parseInt(pic_scroll.css("left"))< 0){
                    if(!pic_scroll.is(":animated")){
                        pic_scroll.animate({left: "+=185px"})
                    }
                }
            });

            next.click(function(){
                if(parseInt(pic_scroll.css("left")) > -100*(len-3)){
                    if(!pic_scroll.is(":animated")){
                        pic_scroll.animate({left: "-=185px"})
                    }
                }
            });
        }

        /*商品详情 评价详情 成交记录切换*/
        subMenu.click(function(){
            $(this).addClass("current").siblings().removeClass("current");

        });

        function proTebEvent(){
            var hot_goods = $(".hot_goods");
            var relation_goods = $(".relation_goods");
            var tab_hot = $(".tab_hot");
            var tab_relative = $(".tab_relative");
            hot_goods.click(function(){
                if (!$(this).hasClass("current")){
                    $(this).addClass("current");
                    tab_relative.css("display","none");
                    tab_hot.css("display","block");
                    relation_goods.removeClass("current");
                }
            });
            relation_goods.click(function(){
                if (!$(this).hasClass("current")){
                    $(this).addClass("current");
                    tab_relative.css("display","block");
                    tab_hot.css("display","none");
                    hot_goods.removeClass("current");
                }
            })

        }



        /*放大镜*/
        function picInit(){
            for(var i = 0 ,l = picSm.length; i < l ; i++){
                if(picSm.parent().eq(i).hasClass("current")){
                    imgSrc = pic_sm.eq(i).attr("src");
                }
            }
            pic_lg.attr("src",imgSrc);
            picLgSrc =  pic_lg.attr("src");
        }
        function setPicEvent() {
            var box = $('#box');
            var target = $('<div class="target"></div>');
            var hbox = $('<div class="hbox"></div>');
            var body = $('body');
            var bw = box.width();
            var bh = box.height();
            var be = 2.5;
            var hw = bw / be;
            var hh = bh / be;
            var top = 0;
            var left = 0;

            body.append(target);
            hbox.appendTo(box);
            box.mousemove(function (e){
                var _vm = $(this);
                top = _vm.get(0).getBoundingClientRect().top;
                left = _vm.get(0).getBoundingClientRect().left;

                var cx = e.clientX - left;
                var cy = e.clientY - top;
                var hx = cx - hw / 2;
                var hy = cy - hh / 2;

                if (hx < 0) {
                    hx = 0;
                } else if (hx > bw - hw) {
                    hx = bw - hw;
                }
                if (hy < 0) {
                    hy = 0;
                } else if (hy > bh - hh) {
                    hy = bh - hh;
                }
                hbox.css({
                    left : hx + 'px',
                    top : hy + 'px'
                });
                target.css({
                    backgroundPosition : -hx * be + 'px ' + (-hy * be) + 'px',
                    backgroundImage: 'url("' + picLgSrc + '")'
                });
            }).hover(function (e) {
                var _vm = $(this);
                top = _vm.get(0).getBoundingClientRect().top;
                left = _vm.get(0).getBoundingClientRect().left;
                target.css({
                    display : 'block',
                    width : bw + 'px',
                    height : bh + 'px',
                    left : left + bw +20+ 'px',
                    top : top + 'px',
                    backgroundImage : 'url("' + picLgSrc + '")',
                    backgroundSize : bw * be + 'px ' + bh * be + 'px',
                    backgroundPosition : '0px 0px'
                });
                hbox.css({
                    display : 'block',
                    width : hw + 'px',
                    height : hh + 'px'
                })
            }, function (e) {
                target.css({'display' : 'none'});
                hbox.css({'display' : 'none'});
            });
        }

        /*加入购物车*/
        function addToShopCart(){
            addshopcart.click(function(){
                var key = localStorage.length;
                var proImgSrc = picSm.find("img").attr("src");
                var orderStr =
                    "<table data-key='"+(key+1)+"'>"
                    +"<tr>"
                    +"<td><input type='checkbox' class='check'></td>"
                    +"<td colspan='6' class='shop_name'>白色恋人官方旗舰店 <img src='img/pro_center08.png' alt=''></td>"
                    +"</tr>"
                    +"<tr>"
                    +"<td><input type='checkbox' class='check_item'></td>"
                    +"<td>"
                    +"<div><p><span>满减</span>活动商品已购满￥1000.00 (<span>已减￥200.00</span>)<a href='javascript:;'>>  去凑单 ></a></p></div>"
                    +"<div class='pro_info'>"
                    +"<a href='pro_details.html'><img src='"+proImgSrc+"' alt=''></a>"
                    +"<div>"
                    +"<p><a href='pro_details.html'>白色恋人浴室柜组合洗脸盆柜组合</a></p>"
                    +"<p><a href='pro_details.html'>洗手盆洗漱台洗手台 定制一体盆款 </a></p>"
                    +"<p><img src='img/cart03.png' alt=''>不支持7天无理由退货</p>"
                    +"</div>"
                    +"</div>"
                    +"<p>【送装服务】送货上门安装</p>"
                    +"</td>"
                    +"<td>颜色：定制一体盆款"
                    + "</td>"
                    +"<td class='price'>"+price.text()+"</td>"
                    +"<td><input type='text' value='"+num.val()+"' class='count'></td>"
                    +"<td class='sub_total'></td>"
                    +"<td class='remove'>删除</td>"
                    +"</tr>"
                    +"<tr>"
                    +"<td colspan='7'><span>运费</span>本组商品已免运费</td>"
                    +"</tr>"
                    +"</table>";

                localStorage.setItem("shop_cart"+(key+1),orderStr);
                setShopCartNumFromLocalStorage ();
                alert("此件商品已加入到购物车");
            })

        }

        /*立即购买*/
        function orderSave(){
            buynow.click(function(){
                var proImgSrc = picLg.find("img").attr("src");
                var key = localStorage.length;
                var _price = Number(price.text().replace("￥",""));
                _price = _price.toFixed(2);
                var _num = Number(num.text());
                var _subTotal = _num*_price;
                _subTotal = _subTotal.toFixed(2);
                var subTotalStr = "￥"+_subTotal;
                var orderStr =
                    "<table data-key='"+(key+1)+"'>"
                    +"<tr>"
                    +"<td>白色恋人官方旗舰店</td>"
                    +"<td>单价</td>"
                    +"<td>数量</td>"
                    +"<td>金额</td>"
                    +"</tr>"
                    +"<tr>"
                    +"<td>"
                    +"<img src='"+proImgSrc+"'alt=''>"
                    +"<div>"
                    +"<p>白色恋人浴室柜组合洗脸盆柜组合</p>"
                    +"<p>洗手盆洗漱台洗手台 定制一体盆款 </p>"
                    +"</div>"
                    +"</td>"
                    +"<td>"+price.text()+"</td>"
                    +"<td>"+num.text()+"</td>"
                    +"<td class='sub_total'>"+subTotalStr+"</tdsub_total>"
                    +"</tr>"
                    +"</table>";
                localStorage.setItem("buynow"+(key+1),orderStr);
                (function(){
                    var cart_num = $(".cart_num");
                    var l = localStorage.length;
                    cart_num.text(l);
                })();
            })
        }

        /*商品详情 评价详情 成交记录切换*/
        function subMenuEvent(){
            var prodetalis_toggle = $(".prodetalis_toggle");
            var comment_toggle = $(".comment_toggle");
            var pro_detalis = $("#pro_detalis");
            var comment_details = $("#comment_details");
            subMenu.click(function(){
                $(this).addClass("current").siblings().removeClass("current");
                /*if(pro_detalis.hasClass("current")){
                 prodetalis_toggle.css("display","block");
                 comment_toggle.css("display","none");
                 }
                 if(comment_details.hasClass("current")){
                 prodetalis_toggle.css("display","none");
                 comment_toggle.css("display","block");
                 }*/
            });
        }


    });

/*点赞*/
    ;(function (win,$){
        var like = function(obj){
            this.obj = $(obj);
            this.like = this.obj.find(".like");
            this.like_num = this.obj.find(".like_num");
            this.likeClick();
        };
    like.prototype = {
        likeClick: function(){
            var _this = this;
            _this.num = parseInt(this.like_num.text().replace("(","").replace(")",""));
            _this.like.click(function(){
                _this.num++;
                _this.like_num.text("("+ _this.num + ")");
            });
        }
    };
    like.init = function (obj){
        var _vm = this;
        for (var i = 0, l = obj.length; i < l; i++) {
            new _vm(obj[i]);
        }
    };
    win['MyLike'] = like;
    })(window,jQuery);

MyLike.init($('.commodity li'));

