$(function(){

    var identify_code = $(".identify_code");
    var _str = "";
    var user_name = $("#user_name");
    var pwd = $("#pwd");
    var identify = $("#identify");
    var login = $("#login");

    showIdentifyCode();
    identifyCodeChange();
    loginClick();



    function loginClick(){
        login.click(function(e){
            var username = user_name.val();
            var _pwd = pwd.val();
            var _identify = identify.val();
            var usernameReg =/^([a-zA-Z0-9]|[\u4e00-\u9fa5]){2,6}$/;
            var pwdReg =/^[a-zA-Z0-9~!@#\$%\^&\*\(\)_\-\+=`]{6,12}$/;
            e.preventDefault();

            if(!usernameReg.test(username)){
                alert("请输入正确的用户名");
                user_name.focus();
                return false;
            }
            if(!pwdReg.test(_pwd)){
                alert("输入密码的长度必须是6-12位");
                pwd.focus();
                return false;
            }
            if(_identify != _str){
                alert("验证码输入错误");
                identify.focus().val("");
                showIdentifyCode();
                return false;
            }
            window.location = "index.html";
        });

    }


    function showIdentifyCode() {
        _str = "";
        var str = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
        for (var i = 0; i < 4; i++) {
            _str += str[Math.floor(Math.random() * 62)];
        }
        identify_code.text(_str);
    }
    function identifyCodeChange(){
        identify_code.next().click(function(e){
            e.preventDefault();
            showIdentifyCode();
        })
    }



});