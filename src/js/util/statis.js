/**
 * 用于统计回调
 **/
import {CallBack} from "./callback";
import {Global} from "../global/index";
import {Try} from "./try";
import {Checker} from "./checker"

export var Static={
    doStatic:function(step){
        var _self = this,
            path="";
        console.log("step->",step)
        if(step=="load"){
            _self.staticLoad();
        }else if(step=="registShow"){
            _self.staticOpenRegist();
        }else if(step=="adLoadEnd"){
            _self.staticAdLoadEnd();
        }else if(step=="bodyLoaded"){
            _self.staticBodyLoadEnd();
        }else if(step=="mousedown"){
            _self.staticClick();
        }
    },
    staticBodyLoadEnd:function(){
        CallBack.doImg("//" + Global.getGlobal("logDomain") + Global.getGlobal("baseUrl") + "2.js?uid=" +
            Global.getGlobal("uid") + "&lt="+pt.load()  + "&key=" + Global.getGlobal("key") + Global.getGlobal("adsys_param"));
    },
    staticLoad:function(){
        if(window.tj_reach&&tj_reach.flag && tj_reach.url != ''){
            CallBack.doReq(tj_reach.url);
        }
    },
    staticOpenRegist:function(){
        CallBack.doImg("//" + Global.getGlobal("logDomain") + Global.getGlobal("baseUrl") + "3.js?uid=" +
            Global.getGlobal("uid") + "&lt=" +pt.click() + "&key=" + Global.getGlobal("key") + Global.getGlobal("adsys_param"));
        if(!Checker.supportFlash&&window.tj_noflash_regbox){
            CallBack.doImg(tj_noflash_regbox);
        }
    },
    staticAdLoadEnd:function(){
        CallBack.doImg("//" + Global.getGlobal("logDomain") + Global.getGlobal("baseUrl") + "5.js?uid=" +
            Global.getGlobal("uid") + "&lt=" +pt.adload() + "&key=" + Global.getGlobal("key") + Global.getGlobal("adsys_param"))
    },
    staticClick:function(){
        if (window.tj_click&&tj_click.flag && tj_click.url != '') {
            CallBack.doImg(tj_click.url.indexOf("?")>0? tj_click.url+ cs_ext+"&r"+Math.random():tj_click.url+"?"+ cs_ext+"&r"+Math.random())
        }
    }
}