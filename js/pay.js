$(function(){
    var payment = $(".payment li");
    var radio = $(".payment input");
    var paymentSelectImg = $(".payment_select img");
    var paymentSelectRadio = $(".payment_select input");
    var pwdList = $(".pwd input");
    var confirm = $('#confirm');
    var pay = $(".pay");


    getMoney();
    confirmEvent();
    inputPwd();


    /*从localstorage拿到待支付金额*/
    function getMoney(){
        var _pay = localStorage.getItem("payStr");
        pay.text(_pay);
    }



    payment.click(function(){
        var index = payment.index(this);
        radio.eq(index).prop("checked",true);
        var imgSrc = payment.eq(index).find("img").attr("src");
        paymentSelectImg.attr("src",imgSrc);
        paymentSelectRadio.prop("checked",true);

    });

    /*输入密码*/
    function inputPwd(){
        pwdList.each(function (i) {
            var _this = $(this);
            if (i < 5) {
                _this.keyup(function () {
                    if ($(this).val()) {
                        $(this).next().focus();
                    }
                })
            }

            if (i > 0) {
                _this.focus(function () {
                    if (!$(this).prev().val() ) {
                        $(this).prev().focus();
                    }
                })
            }

            _this.keyup(function(){
                if(event.keyCode == 8){
                    /*space键*/
                    _this.val("");
                    _this.prev().focus();
                    /*数字键盘0-9 数字键0-9*/
                }else if(event.keyCode !=96 && event.keyCode !=97 && event.keyCode !=98 &&event.keyCode !=99 && event.keyCode !=100 &&event.keyCode !=101 && event.keyCode !=102 && event.keyCode !=103 && event.keyCode !=104 && event.keyCode !=105 && event.keyCode !=48 && event.keyCode !=49 && event.keyCode !=50 &&event.keyCode !=51 && event.keyCode !=52 &&event.keyCode != 53 && event.keyCode !=54 && event.keyCode !=55 && event.keyCode !=56 && event.keyCode !=57){
                    _this.val("");
                    _this.focus();
                }
            });
        });

        pwdList.eq(5).keyup(function(){
            $(this).blur();
            confirm.focus();
        });

        /*pwdList.eq(5).focus(function () {
            $(this).val('');
        });*/
    }




    function confirmEvent(){
        confirm.click(function(){
            if(paymentSelectRadio.prop("checked")){
                if(!pwdList.eq(5).val()){
                    window.open("payment_failed.html")
                }else{
                    window.open("payment_success.html");
                }
            }else{
                alert("请选择一种支付方式！");
                return false;
            }
        });

    }





});