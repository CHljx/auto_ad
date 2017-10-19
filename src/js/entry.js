import CallBack from "./util/callback";
import Global from "./global/index"
import App from "./app/index";
import Query from "./util/query";

Global.addGlobalFn("CallBackHandler",CallBack);
Global.addGlobalFn("platformDeploy", gconfig.platform_deploy);
Global.addGlobalFn("uid", (Query.getParam("uid") || Query.getParam("u") || "").replace(/\./g, "_"));
Global.addGlobalFn("key",  gconfig.key);
Global.addGlobalFn("canvas",  null);
Global.addGlobalFn("stage",null);
Global.addGlobalFn("playSound",function(t,e){
    return createjs.Sound.play(t, createjs.Sound.INTERRUPT_EARLY, 0, 0, e)
});
Global.addGlobalFn("openDiv",App.openRegist);


CallBack.doScript('http://uad3.369.com/js/' + platformDeploy + '/g2.js',function(){
    App.init();
});

