import LifeCycle from "../lifecycle/index";
import CallBack from "../util/callback";
import AdLoadder from "./adLoadder";
import Global from "../global/index";
import Support from "../util/support";

export default{
    init:function(){
        var _self = this;
        LifeCycle.trigger("load");
        _self.addGlobalFn()
        AdLoadder.init();
    },
    /**
     * 注册方法
     */
    regist:function(){

    },
    winOpen:function(){
    },
    openRegist:function(){
        LifeCycle.trigger("registShow")
    },
    addGlobalFn(){
        var _self = this;
        Global.addGlobalFn("checkLoginAccountNew",function(value){
            var result=_self.checkAccount(value);
            if(Support.supportCanvas){
                return result
            }
            if(result.code==0){
                return "<font color='#FF0000'>"+result.msg+"</font>"
            }else{
                return "<font color='#008000'>"+result.msg+"</font>"
            }
        });
        Global.addGlobalFn("checkPasswordNew",function(value){
            var result=_self.checkPwd(value);
            if(Support.supportCanvas){
                return result
            }
            if(result.code==0){
                return "<font color='#FF0000'>"+result.msg+"</font>"
            }else{
                return "<font color='#008000'>"+result.msg+"</font>"
            }
        });
        Global.addGlobalFn("checkPassword1New",function(value,value1){
            var result=_self.checkPwd(value);
            if(Support.supportCanvas){
                return result
            }
            if(result.code==0){
                return "<font color='#FF0000'>"+result.msg+"</font>"
            }else{
                return "<font color='#008000'>"+result.msg+"</font>"
            }
        });
    },
    checkAccount:function(value){
        var regqq = /^(qq_)/i;
        var regwx = /^(wx_)/i;
        var regwb = /^(wb_)/i;
        var reg6711 = /^(6711_)/i;
        var h5yx=/^(h5yx_)/i;
        var youke=/^(youke_)/i;
        var phonereg=/^13[0-9]{1}[0-9]{8}$|^14[579]{1}[0-9]{8}$|^15[012356789]{1}[0-9]{8}$|^18[0-9]{1}[0-9]{8}$|^17[01235678]{1}[0-9]{8}$/;
        var result={
            code:1,
            msg:"帐号填写正确！"
        };
        if(phonereg.test(value)){
            //phoneAccount=value;
            //App.chkOldUser(value);
        }
        if (regqq.test(value)) {
            return {
                code:0,
                msg:"请勿注册前缀为“qq_”的帐号"
            }
        }
        if (regwx.test(value)) {
            return {
                code:0,
                msg:"请勿注册前缀为“wx_”的帐号"
            }
        }
        if (regwb.test(value)) {
            return {
                code:0,
                msg:"请勿注册前缀为“wb_”的帐号"
            }
        }
        if (reg6711.test(value)) {
            return {
                code:0,
                msg:"请勿注册前缀为“6711_”的帐号"
            }
        }
        if (h5yx.test(value)) {
            return {
                code:0,
                msg:"请勿注册前缀为“h5yx_”的帐号"
            }
        }
        if (youke.test(value)) {
            return {
                code:0,
                msg:"请勿注册前缀为“youke_”的帐号"
            }
        }
        if(!/^[A-Za-z0-9_]{4,20}$/.test(value)){
            return {
                code:0,
                msg:"帐号不符合规定"
            }
        }
        return result;
    },
    checkPwd:function(value){
        var result={
            code:0,
            msg:"密码不符合规定！"
        }
        if(/^[\x01-\xfe]{6,20}$/.test(value)){
            result={
                code:1,
                msg:"密码填写正确！"
            }
        }
        return result;
    },
    comparePwd:function(val,val2){

    }
}