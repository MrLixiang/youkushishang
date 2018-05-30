$(function(){
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
    var pic_sm = $(".pic_sm a img");



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
            backgroundPosition : -hx * be + 'px ' + (-hy * be) + 'px'
        })

    }).hover(function (e) {
        var _vm = $(this);
        var src = _vm.attr('data-big');
        top = _vm.get(0).getBoundingClientRect().top;
        left = _vm.get(0).getBoundingClientRect().left;
        target.css({
            display : 'block',
            width : bw + 'px',
            height : bh + 'px',
            left : left + bw +20+ 'px',
            top : top + 'px',
            backgroundImage : 'url("' + src + '")',
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
});