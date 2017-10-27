import {Callback} from "../util/callback"
export var GameBox={
    init:function(){
        if (game_box.flag) {
            game_box.isLog?this.doLog():this.doNew();
        }
    },
    doNew:function(){
        var $div = document.createElement('div');
        $div.setAttribute('id', 'game_box');

        $div.innerHTML = ['<a  id="coverObject" href="'+game_box.url+'" target="_blank" style="text-indent:-9999px; position:absolute;top:0;left:0; z-index:10;display:block; width:' + game_box.width + 'px; height:' + game_box.height + 'px" >1</a>',
            '    <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="//fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="' + game_box.width + '" height="' + game_box.height + '" id="game" align="middle">',
            '        <param name="allowScriptAccess" value="sameDomain">',
            '        <param name="movie" value="' + game_box.src + '">',
            '        <param name="quality" value="high">',
            '        <param name="bgcolor" value="#000000">',
            '        <param name="wmode" value="transparent">',
            '        <embed src="' + game_box.src + '" quality="high" bgcolor="#000000" width="' + game_box.width + '" height="' + game_box.height + '" name="game" align="middle" allowscriptaccess="sameDomain" type="application/x-shockwave-flash" pluginspage="//www.macromedia.com/go/getflashplayer" wmode="transparent">',
            '    </object>'
        ].join("");
        document.body.appendChild($div);
        var urlFlag = true;
        var $coverDiv=document.getElementById("coverObject");
        $coverDiv.onclick=function(event) {
            if(game_box.flag&&!game_box.isLog){
                var event = event || window.event || arguments.callee.caller.arguments[0];
                if (event && event.stopPropagation) {
                    event.stopPropagation()
                } else {
                    window.event.cancelBubble = true
                }
                if (urlFlag && game_box.api != '') {
                    (new Image()).src = game_box.api + '&e1=' + gconfig.union_id + '&e2=' + gconfig.ad_param + '&e3=' + referer + '&e4=' + uid + '&e5=' + gconfig.game_id + '&e6=' + gconfig.game_server_id + '&e7=&e8=&e9=&e10=&e11=&e12=&e13=&e14=&e15=&e16=&e17=&e18=&e19=&e20=';
                    urlFlag = false;
                }
            }
        }
    },
    doLog:function(){
        Callback.doScript("/js/module/box/dlbox.min.js");
    }
}