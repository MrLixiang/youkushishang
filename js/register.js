$(function(){
    var user_name = $("#user_name");
    var pwd = $("#pwd");
    var repwd = $("#repwd");
    var email = $("#email");
    var tel_num = $("#tel_num");
    var identify = $("#identify");
    var checkbox = $(":checkbox");
    var register = $("#register");

    var userName = /^([a-zA-Z0-9]|[\u4e00-\u9fa5]){3,8}$/;
    var _email = /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/;
    var telNum = /^(13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0|(5-9)])\d{8}$/;
    var pwdReg =/^[a-zA-Z0-9~!@#\$%\^&\*\(\)_\-\+=`]{6,20}$/;


    usernameTest();
    pwdTest();
    emailTest();
    repwdTest();
    tel_numTest();
    isCheckboxChecked();
    submitClick();



    function usernameTest(){
        user_name.blur(function(){
            if(!userName.test(user_name.val())){
                $(this).next().text("用户名的长度必须为3-8位");
                return false;
            }else{
                $(this).next().text("");
            }
        });
    }

    function pwdTest(){
        pwd.click(function(){
            $(this).removeAttr("placeholder");
        });
        pwd.blur(function(){
            $(this).attr("placeholder","建议至少使用两组字符组合");
            if(!pwdReg.test(pwd.val())){
                $(this).next().text("密码长度必须为6-20位");
                return false;
            }else{
                $(this).next().text("");
            }
        })
    }
    function emailTest(){
        email.blur(function(){
            if(!_email.test(email.val())){
                $(this).next().text("邮箱格式有误！");
                return false;
            }else{
                $(this).next().text("");
            }
        });
    }

    function repwdTest(){
        repwd.click(function(){
            $(this).removeAttr("placeholder");
        });
        repwd.blur(function(){
            $(this).attr("placeholder","请再次输入密码");
            if(pwd.val() != repwd.val()){
                $(this).next().text("两次密码输入不一致！");
                return false;
            }else{
                $(this).next().text("");
            }
        });
    }

    function tel_numTest(){
        tel_num.blur(function(){
            if(!telNum.test(tel_num.val())){
                $(this).next().text("请输入正确的手机号！");
                return false;
            }else{
                $(this).next().text("");
            }
        });
    }

   /* var str1 ="";
    identify.next().click(function(e){
        var str = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
        var _str ="";
        for(var i = 0; i < 4 ;i ++){
            _str += str[Math.floor(Math.random()*62)];
        }
        str1 = _str;
        e.preventDefault();
        $(this).text(_str);

   })

    identify.blur(function(){
        if($(this).val() != str1){
            alert("验证码输入不正确！");
        }
    })
*/

    function isCheckboxChecked(){
        checkbox.click(function(){
            if(checkbox.prop("checked")){
                register.removeAttr("disabled");
            }else{
                register.attr("disabled","disabled");
            }
        })

    }

    function submitClick(){
        register.click(function(){
            if(!pwdReg.test(pwd.val())) {
                alert("密码长度必须为6-20位");
                return false;
            }
            if(!userName.test(user_name.val())){
                alert("请输入正确的用户名！");
                return false;
            }
            if(!_email.test(email.val())){
                alert("请输入正确的邮箱！");
                return false;
            }
            if(pwd.val() != repwd.val()){
                alert("两次密码输入不一致");
                return false;
            }
            if(!telNum.test(tel_num.val())){
                alert("请输入正确的手机号！");
                return false;
            }
            window.location.href = "index.html";
        })
    }


});