$(function() {
    var prov = $("#prov");
    var city = $("#city");
    var county = $("#county");

    var sub_tips = $(".sub_tips");
    var sub_menu = $(".sub_menu");

    var receiver = $("#receiver");
    var mobile = $("#mobile");
    var tel = $("#tel");
    var save = $("#save");
    var receive_address = $(".receive_address");

    getProv();
    provChange();
    cityChange();
    menuCollapse();
    saveAddressButton();
    deleteAddress();
    saveAddressToLocalstorage();


    function getProv() {
        var _prov = "";
        _prov = "<option value='0'>省/直辖市</option>";
        var l = PROV.length;
        for (var i = 0; i < l; i++) {
            _prov += "<option value='" + PROV[i].ProID + "'>" + PROV[i].name + "</option>";
        }
        prov.html(_prov);
    }

    function provChange() {
        prov.change(function () {
            var provId = prov.val();
            var len = CITY.length;
            var _city = "";
            _city = "<option value='0'>市</option>";
            for (var i = 0; i < len; i++) {
                if (CITY[i].ProID == provId) {
                    _city += "<option value='" + CITY[i].CityID + "'>" + CITY[i].name + "</option>";
                }
            }
            city.html(_city);
        })

    }

    function cityChange(){
        city.change(function () {
                var cityId = city.val();
                var len = COUNTY.length;
                var _county = "";
                _county = "<option value='0'>区/县</option>";
                for (var i = 0; i < len; i++) {
                    if (COUNTY[i].CityID == cityId) {
                        _county += "<option value='" + COUNTY[i].ID + "'>" + COUNTY[i].DisName + "</option>";
                    }
                    county.html(_county);
                }
            })
    }

/*左面菜单的折叠*/
    function menuCollapse(){
        sub_tips.click(function() {
            var index = sub_tips.index(this);
            sub_menu.eq(index).find("dd").slideToggle();
        })
    }

/*新增收货地址*/
    function saveAddressButton (){
        var mobileRegExp = /^(13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0|(5-9)])\d{8}$/;
        var telRegExp =   /^\d{7}$/
        save.click(function(){
            if(receiver.val() =="收货人姓名"){

                alert("请输入收货人姓名");
                return false;
            }
            if(!prov.val()){
                alert("请选择收货地址");
                return false;
            }
            if(!city.val()){
                alert("请选择收货地址");
                return false;
            }
            if(!county.val()){
                alert("请选择收货地址");
                return false;
            }
            if(!mobileRegExp.test(mobile.val())){
                alert("请输入正确的手机号码");
                return false;
            }
            if(tel.val() != "手机号/区号-固定电话"){
                if(!telRegExp.test(tel.val()) && !mobileRegExp.test(tel.val())){
                    alert("请输入正确的电话号码");
                    return false;
                }
            }
            alert("保存成功");
        })
    }

    /*删除地址*/

    function deleteAddress(){
        var delete_address = $(".delete_address");
        var receive_address = $(".receive_address");
        delete_address.click(function(){
            var index = delete_address.index(this);
            receive_address.eq(index).remove();
        })
    }

    /*把地址存进本地存储*/
    function saveAddressToLocalstorage(){
        var _address="";
        for(var i = 0, l = receive_address.length ; i < l ; i ++ ){
            _address += receive_address.eq(i).children("p:eq(1)").text();
            _address += "&";
        }
        localStorage.setItem("address",_address);
    }

});


