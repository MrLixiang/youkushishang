;(function (win, $) {
    var star = function (obj) {
        this.obj = $(obj);
        this.num = 2;
        this.desc = this.obj.find('dd');
        this.start ();
        this.mouseMoveEvent ();
        this.resetBtn = $('#myreset');
        this.resetBtnEvent ();
    };
    star.prototype = {
        resetBtnEvent : function () {
            var _this = this;
            this.resetBtn.click(function (e) {
                _this.num = 2;
                _this.start ();
            });
        },
        mouseMoveEvent : function () {
            var _this = this;
            _this.desc.bind("mouseover",function(){
                var index = _this.desc.index(this);
                $(this).addClass("light_on");
                _this.desc.eq(index).prevAll().addClass("light_on").end().nextAll().removeClass("light_on");
            }).bind("click",function(){
                _this.num = _this.desc.index(this) + 1;
            }).bind('mouseout', function () {
                _this.desc.removeClass("light_on");
                _this.start(_this.num);
            })
        },
        start : function () {
            var _this = this;
            this.desc.each(function(i){
                if(i < _this.num ){
                    $(this).addClass("light_on");
                } else {
                    $(this).removeClass("light_on");
                }
            })
        }
    };
    star.init = function (obj) {
        var _vm = this;
        for (var i = 0, l = obj.length; i < l; i++) {
            new _vm(obj[i]);
            //new star(obj[i]);
        }
    };
    win['MyStar'] = star;
})(window, jQuery);

MyStar.init($('.desc'));

$(function () {
    var reset = $("input[type=reset]");
    var comment = $(".comment p");
    reset.click(function () {
    })
});



