$(function(){
    var orderList = $(".shop_list form");
    getData();
    withdrawBuyNowEvent();
    var address = $(".receive_address >div:not(:last-child)");
    var sub_total = $(".sub_total");
    var total = $(".total");
    var discount = $(".discount");
    var pay = $(".pay");
    var submit = $("[type=submit]");
    var receipt_checkbox = $(".receipt input[type=checkbox]");
    var receipt_radio = $(".receipt input[type=radio]");
    var savereceiptinfo = $("#savereceiptinfo");



    chooseAddress();
    addSpot();
    calTotal();
    setSubmitEvent();
    receiptChoose();
    saveReceiptButton();



    /*选择发货地址*/
    function chooseAddress(){
        address.click(function(){
            $(this).addClass("select").siblings().removeClass("select");
        });
    }

    /*添加收货地址*/

    function addSpot(){
        var addSpot = $(".add_spot");
        addSpot.click(function(){
            window.open("address.html");
        })
    }

    /*获取LocalStorage中的内容*/

    function getData(){
        var l = localStorage.length;
        var orderStr="";
        for(var i = 0; i < l ;i++){
            if(localStorage.getItem(i+1)){
                orderStr += localStorage.getItem(i+1);
            }
        }
        orderList.prepend(orderStr);
    }

    /*计算总价*/
    function calTotal() {
        var l = localStorage.length;
        var subTotal = 0;
        var _discount =parseInt(discount.text().replace("￥",""));
        for (var i = 0; i < l; i++) {
            subTotal += Number(sub_total.eq(i).text().replace("￥", ""));
        }
        var _subTotal = subTotal.toFixed(2);
        var totalStr = "￥"+ _subTotal;
        total.text(totalStr);
        if(_subTotal != "0.00"){
            var _pay = (subTotal + _discount).toFixed(2) ;
        }else{
            _pay = _subTotal;
        }
        payStr = "￥"+ _pay;
        pay.text(payStr);

    }


   /*提交订单*/

    function setSubmitEvent(){

        submit.click(function(e){
            e.preventDefault();
            localStorage.clear();
            localStorage.setItem("payStr",payStr);
            location.href = "pay.html";
        })
    }

    /*收取从立即购买过来的数据*/

    function withdrawBuyNowEvent(){
        var key = localStorage.length;
        for(var i =0 ;i < key ; i++){
            if(localStorage.getItem("buynow"+(i+1))){
                var buyNowStr = localStorage.getItem("buynow"+(i+1))
                orderList.prepend(buyNowStr);
        }


        }
    }

    /*选择开具发票的方式*/
    function receiptChoose() {
        receipt_checkbox.click(function () {
            if (!receipt_checkbox.prop("checked")) {
                receipt_radio.attr("disabled","disabled");
            }else{
                receipt_radio.removeAttr("disabled");
            }
        });
    }

    function saveReceiptButton(){
        savereceiptinfo.click(function(e){
            if (receipt_checkbox.prop("checked")) {
                alert("发票信息已保存");
                e.preventDefault();
            }else{
                alert("请选择“开具发票”");
                return false;
            }
        })
    }


});