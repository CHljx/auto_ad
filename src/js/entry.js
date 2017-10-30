import {CallBack} from "./util/callback";
import {Global} from "./global/index"
import {App} from "./app/index";
import {LifeCycle} from "./lifecycle/index";
import {Checker }from "./util/checker";


Global.init();

Global.addGlobalFn("CallBackHandler",CallBack);
Global.addGlobalFn("canvas",  null);
Global.addGlobalFn("stage",null);
Global.addGlobalFn("playSound",function(t,e){
    return createjs.Sound.play(t, createjs.Sound.INTERRUPT_EARLY, 0, 0, e)
});
Global.addGlobalFn("openDiv",function(){
    App.openRegist();
});
Global.addGlobalFn("$",function(sId){
    return document.getElementById(sId)
})
Global.addGlobalFn("registerWinopen",function(oType){
    App.registerInter(oType)
})
Global.addGlobalFn("winopenRegisterCallBack",function(url){
   App.doRegistInter(url)
});
Global.addGlobalFn("registerCallBack",function(url){
    App.doRegistUrl(url)
});
Global.addGlobalFn("bodyLoad",function(){

})
CallBack.doScript(DOMAIN+'/js/' + gconfig.platform_deploy + '/g2.js',function(){
    var app={
        init:function(){
            var  _self = this;
            LifeCycle.add("bodyLoaded",function(){
                _self.checkHttps();
                (new Image()).src = "//cm.he2d.com/1/";

                window.moveTo(0, 0);
                window.resizeTo(screen.width, screen.height);



                document.body.onmousedown=function(){
                    LifeCycle.trigger("mousedown");
                    if(Checker.supportFlash){
                        if (window.tj_click&&tj_click.flag && tj_click.url != '') {
                            CallBack.doImg(tj_click.url + cs_ext);
                        }
                    }
                }
            });
            App.init();
            LifeCycle.trigger("bodyLoaded");
        },
        checkHttps:function(){
            var isIE6 = !!window.ActiveXObject && !window.XMLHttpRequest;
            if (isIE6) {
                http = "http";
            } else {
                CallBack.doScript("https://" + platformDomain + "/no-delete.js",function(){
                    if (http == "https" && typeof _nd == "undefined") {
                        if(!/^https/.test(window.location.href)){
                            http = "http";
                        }
                    }
                });
            }
        }
    };
    app.init();

});

