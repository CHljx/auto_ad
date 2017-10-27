import {Callback} from "../util/callback"
export var Hijack={
    init:function(){
        if(window.execHijack){
            this.doHijack();
        }
    },
    doHijack:function(){
        Callback.doScript('/js/plugin/preventHijack.min.js?bust=20161110105740VER',function(){
            console.log("监控劫持JS加载完毕")
            check37Domain.init(3);
        })
    }
}