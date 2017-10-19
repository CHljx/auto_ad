/**
 * 用于统计回调
 **/
import CallBack from "./callback";
import Global from "../global/index";
import Try from "./try";

export default{
    doStatic:function(step){
        var _self = this,
            path="";
        console.log("doStatic",step)
        if(step=="load"){
            _self.staticLoad();
        }else if(step=="registShow"){
            _self.staticOpenRegist();
        }
    },
    staticLoad:function(){
        CallBack.doReq("//" + Global.getGlobal("logDomain") + Global.getGlobal("baseUrl") + "2.js?uid=" +
            Global.getGlobal("uid") + "&lt="+pt.load()  + "&key=" + Global.getGlobal("key") + Global.getGlobal("adsys_param"))
    },
    staticOpenRegist:function(){
        CallBack.doReq("//" + Global.getGlobal("logDomain") + Global.getGlobal("baseUrl") + "3.js?uid=" +
            Global.getGlobal("uid") + "&lt=" +pt.click() + "&key=" + Global.getGlobal("key") + Global.getGlobal("adsys_param"))
    }
}