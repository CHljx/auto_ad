import {LifeCycle} from "../lifecycle/index";
export var Iframe={
    init:function(){
        var _self = this;
        LifeCycle.add("bodyLoaded",function(){
            if (window.new_iframe&&new_iframe.flag && new_iframe.show == 'reach') {
                _self.createIframe();
            }
        });
        LifeCycle.add("registShow",function(){
            if (window.new_iframe&&new_iframe.flag && new_iframe.show == 'click') {
                _self.createIframe();
            }
        });
        LifeCycle.add("enterGame",function(){
            if (window.new_iframe&&new_iframe.flag && new_iframe.show == 'success') {
                _self.createIframe();
            }
        });
    },
    createIframe:function(){
        var $div = document.createElement('div');
        $div.setAttribute('id', 'iframe_warp');
        $div.innerHTML = '<div id="new_iframe_warp">' +
            '<iframe src="' + new_iframe.src + '" allowtransparency="true" style="background-color=transparent"  frameborder="0" width="' + new_iframe.width + '" height="' + new_iframe.height + '" scrolling="no">' +
            '</iframe>' +
            '</div>';
        if (document.body) {
            document.body.appendChild($div);
        } else {
            document.documentElement.appendChild($div);
        }
        var $tem = document.getElementById("new_iframe_warp")
        var h = document.body.clientHeight || document.documentElement.clientHeight;
        $div.style.height = h + 'px';
        if ($tem) {
            $tem.style.marginLeft = '-' + new_iframe.width / 2 + 'px';
            $tem.style.marginTop = '-' + new_iframe.height / 2 + 'px';
        }
    }
}