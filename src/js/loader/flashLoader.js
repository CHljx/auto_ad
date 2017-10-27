import {Global} from "../global/index";
import {LifeCycle} from "../lifecycle/index";
export var FlashLoader={
    $Container:null,
    eStage:document.getElementById("Stage"),
    eApp:document.getElementById("app"),
    init:function(){
        var _self = this;
        _self.eApp.style.width= _self.eStage.style.width=gconfig.reg_scale==1?"100%":(gconfig.width+"px");
       _self.eApp.style.height=_self.eStage.style.height="auto";

        _self.eApp.innerHTML='<div id="flash" width="'+gconfig.height +'" height="'+gconfig.height +'" ' +
            'style="width:'+gconfig.width +'px;height:'+gconfig.height +'px;display: block; background: transparent;"></div>'
        _self.addGlobalFn();
        _self.loadFlash();
        _self.$Container=_self.getFlash("flash_obj")
    },
    addGlobalFn:function(){
        var _self = this;
        Global.addGlobalFn("loadAdTrack",function(){
            var centerH=gconfig.center_h||1;
            var centerW=gconfig.center_v||2;
            var adScale=gconfig.ad_scale||2;
            LifeCycle.trigger("adLoadEnd");
            document.body.style.background="#000";
            _self.$Container=_self.getFlash("flash_obj");
            _self.setHeight();
            if(centerH==1||centerW==1){
                if(adScale==2){
                    setTimeout(function(){
                        var eBody=document.documentElement||document.body;
                        scrollTo(centerH==1&&gconfig.width>eBody.clientWidth?(gconfig.width-eBody.clientWidth)/2:0,centerW==1&gconfig.height>=eBody.scrollHeight?(eBody.scrollHeight-eBody.clientHeight)/2:0)
                    },200);
                }
            }
        });
    },
    loadFlash:function(){
        var _self = this;
        var eApp=document.getElementById("flash");
        var sHtml='';
        var adScale=gconfig.ad_scale||2;
        var regScale=gconfig.reg_scale||2;
        var flashVars="path="+ gconfig.flash_path;
        flashVars+="&adScale="+(adScale==1?1:'')+"&regScale="+(regScale==2?1:'');
        if(adScale==2){
            _width=gconfig.width;
        }
        if(adScale==1){
            _self.eApp.style.width= _self.eStage.style.width=eApp.style.width="100%"
            window.onresize=function(){
                _self.setHeight();
            }
        }

        sHtml+='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="' +  _width + '" height="' + gconfig.height + '" id="flash_obj" align="middle">';
        sHtml+='<param name="allowScriptAccess" value="always" />';
        sHtml+='<param name="movie" value="' + gconfig.flash_path + '/index.swf" />';
        sHtml+='<param name="quality" value="high" />';
        sHtml+='<param name="bgcolor" value="#000000" />';
        sHtml+='<param name="FlashVars" value="' + flashVars + '" />';
        sHtml+='<param name="wmode" value="transparent" />';
        sHtml+='<embed src="' + gconfig.flash_path + '/index.swf"  FlashVars="' + flashVars  + '" quality="high" bgcolor="#000000" width="' +  _width  + '" height="' + gconfig.height + '" name="flash_obj" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"  wmode="transparent" />';
        sHtml+='</object>';
        eApp.innerHTML=sHtml;
    },
    setHeight:function(){
        var _self = this;
        var iWidth;
        var adScale=gconfig.ad_scale||2;
        if(adScale==1){
            iWidth= (document.documentElement||document.body).clientWidth
            if(iWidth>gconfig.width){
                _self.$Container.height=gconfig.height;
            }else{
                _self.$Container.height=iWidth/gconfig.width*gconfig.height;
            }
        }
    },
    openReg:function(){
        this.$Container.ActivateOpen();
    },
    showUTips:function(msg){
        return msg;
    },
    showWTips:function(msg){
        return msg;
    },
    showPTips:function(msg){
        return msg;
    },
    showTips:function(msg){
        this.$Container.alertInfo(msg);
    },
    getFlash:function(movieName){
        if (navigator.appName.indexOf("Microsoft") == -1) {
            if (document.embeds && document.embeds[movieName]) return document.embeds[movieName]
        } else if (window.document[movieName]) {
            return window.document[movieName]
        } else {
            return document.getElementById(movieName)
        }
    }
}