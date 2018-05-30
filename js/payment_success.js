$(function(){
    var balance = $(".balance");

    getMoney();
    /*从localstorage拿到支付金额*/
    function getMoney(){
        var l = localStorage.length;
        var money = "";
        for(var i = 0 ; i < l ; i++){
            if(localStorage.getItem("payStr")){
                 money = localStorage.getItem("payStr");
            }
        }
        var moneyStr = money + "元";
        balance.text(moneyStr);
    }
});