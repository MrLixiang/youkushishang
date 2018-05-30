$(function(){
    var brand = $("#brand li");
    var material = $("#material li");
    var fix_method = $("#fix_method li");
    var brand_selected = $(".brand_selected");
    var material_selected = $(".material_selected");
    var shut_down = $(".shut_down");
    var select_more = $(".select_more");
    var flag1 = 0;
    var flag2 = 0;
    var min_price = $(".min_price input");
    var max_price = $(".max_price input");
    var pro_item = $(".pro_list li");
    var inputKeyword = $("#inputKeyword");
    var searchKeyword = $("#searchKeyword");
    var sequence_item = $(".sequence_item li");
    var sequence_price = $(".sequence_price");
    var show_more = $("#show_more");
    var fixmethod_selected = $(".fixmethod_selected");
    var spot = $("#spot");
    var address = "重庆市南坪万象城B栋601室&重庆市江北五里店怡心花园1栋8-6&重庆市大学城康居西城1组团1栋31-2&";



    itemSequence();
    brandSelect();
    materialSelect();
    fixMethodSelect();
    selectShutDown();
    selectMoreSwitch();
    priceSelect();
    showMore();
    selectSpot();

    /*排序*/
    function itemSequence(){
        sequence_item.click(function(){
            $(this).addClass("active").siblings().removeClass("active");
            sequence_price.removeClass("active");
            sequence_price.css({"backgroundColor":"transparent","border-left":"1px solid #777777"})
        });
        sequence_price.click(function(){
            $(this).css({"backgroundColor":"#ff0000","border-left":"none"}).addClass("active");
            sequence_item.removeClass("active");
        })
    }
    /*选择品牌*/
    function brandSelect(){
        brand.click(function(){
            var _brand = $(this).text();
            if(flag1 == 0){
                brand_selected.text(_brand);
                brand_selected.parent().css("display","block");
            }else{
                if($(".brand_selected:contains('"+_brand+"')").length == 0){
                    var brandSelectedMore = brand_selected.parent();
                    brandSelectedMore.clone(true).find(".brand_selected").text(_brand).end().insertAfter(brandSelectedMore);
                }
            }
        })
    }
    /*选择材质*/
    function materialSelect(){
        material.click(function(){
            var _material = $(this).text();
            if(flag2 == 0){
                material_selected.text(_material);
                material_selected.parent().css("display","block");
            }else{
                if($(".material_selected:contains('"+_material+"')").length == 0){
                    var materialSelectedMore = material_selected.parent();
                    materialSelectedMore.clone(true).find(".material_selected").text(_material).end().insertAfter(materialSelectedMore);
                }
            }

        })
    }

    /*选择安装方式*/
    function fixMethodSelect(){
        fix_method.click(function(){
            var _fix_method = $(this).text();
            fixmethod_selected.text(_fix_method);
        })
    }

    /*关闭按钮*/
    function selectShutDown(){
        shut_down.click(function(){
            $(this).parent().css("display","none");
        })
    }

    /*多选*/
    function selectMoreSwitch(){
        select_more.eq(0).click(function(){
            if(flag1 == 0){
                flag1 = 1;
                $(this).css("background-color","#cecece");
            }else{
                flag1 = 0;
                $(this).css("background-color","#f4f4f4");
                brand_selected.parent().siblings(":contains(品牌)").detach();
            }
        });
        select_more.eq(1).click(function(){
            if(flag2 == 0){
                flag2 = 1;
                $(this).css("background-color","#cecece");
            }else{
                flag2 = 0;
                $(this).css("background-color","#f4f4f4");
                material_selected.parent().siblings(":contains(材质)").detach();
            }
        })
    }

    /*显示更多*/
    function showMore(){
        var fl = 0;
        $("#brand li:gt(10)").css("display","none");
        show_more.click(function(){
            if(fl == 0){
                fl = 1;
                $(this).css("background-color","#cecece");
                $("#brand li:gt(10)").css("display","block");
            }else{
                fl = 0;
                $(this).css("background-color","#f4f4f4");
                $("#brand li:gt(10)").css("display","none");
            }
        })
    }

    /*价格筛选*/
    function priceSelect() {
        var minprice;
        var maxprice;
        var price = $(".price");

        priceMinSelect();
        priceMaxSelect();

        function priceMinSelect() {
            min_price.blur(function () {
                minprice = Number(min_price.val());
                maxprice = Number(max_price.val());
                price.each(function (i) {
                    var _price = parseInt(price.eq(i).text().replace("￥", ""));
                    if (!maxprice) {
                        if (minprice > 0) {
                            if (_price < minprice) {
                                $(this).parent().css("display", "none");
                            } else {
                                $(this).parent().css("display", "block");
                            }
                        } else {
                            return false;
                        }
                    } else if (maxprice > minprice) {
                        if (_price > minprice && _price < maxprice) {
                            $(this).parent().css("display", "block");
                        } else {
                            $(this).parent().css("display", "none");
                        }
                    } else {
                        return false;
                    }

                })
            });
        }
        function priceMaxSelect() {
            max_price.blur(function () {
                minprice = Number(min_price.val());
                maxprice = Number(max_price.val());
                price.each(function (i) {
                    var _price = parseInt(price.eq(i).text().replace("￥", ""));
                    if (!minprice) {
                        if (maxprice > 0) {
                            if (_price > maxprice) {
                                $(this).parent().css("display", "none");
                            } else {
                                $(this).parent().css("display", "block");
                            }
                        } else {
                            return false;
                        }
                    } else if (minprice < 0) {
                        return false
                    } else {
                        if (minprice < maxprice) {
                            if (_price < maxprice && _price > minprice) {
                                $(this).parent().css("display", "block");
                            } else {
                                $(this).parent().css("display", "none");
                            }
                        } else {
                            return false
                        }

                    }
                });
            });
        }
    }

    /*选择地址*/
    function selectSpot(){
        /*var address = localStorage.getItem("address");*/
        address = address.slice(0,address.length-1);
        var addressArr = address.split("&");
        var spotStr = '';
        for(var i = 0,len = addressArr.length; i < len ; i ++){
            spotStr += '<option value="">'+ addressArr[i] +'</option>';
        }
        spot.append(spotStr);
    }

    /*存储需要拿到pro_center内的数据*/


    /*关键字搜索*/

    searchKeyword.click(function(e){
        e.preventDefault();
    })


});