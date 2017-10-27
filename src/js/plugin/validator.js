import {Global} from "../global/index";
import {Checker as Support} from "../util/checker";
import {App} from "../app/index"
import {AdLoader} from "../app/adLoadder";
import {Callback} from "../util/callback";
import {LifeCycle} from "../lifecycle/index";

var phoneAccount={};
Global.addGlobalFn("phone","");
export var Validator={
    init:function(){
        var _self = this;
        Global.addGlobalFn("checkLoginAccountNew",function(value){
            var result=_self.checkAccount(value);
            if(result.code==0){
               return AdLoader.showUTips("<font color='#FF0000'>"+result.msg+"</font>")
            }else{
                return AdLoader.showUTips("<font color='#008000'>"+result.msg+"</font>");
            }
        });
        Global.addGlobalFn("checkPasswordNew",function(value){
            var result=_self.checkPwd(value);
            if(result.code==0){
                return   AdLoader.showWTips("<font color='#FF0000'>"+result.msg+"</font>")
            }else{
                return  AdLoader.showWTips("<font color='#008000'>"+result.msg+"</font>");
            }
        });
        Global.addGlobalFn("checkPassword1New",function(value,value1){
            var result=_self.comparePwd(value,value1);
            if(result.code==0){
                return   AdLoader.showPTips("<font color='#FF0000'>"+result.msg+"</font>")
            }else{
                return  AdLoader.showPTips("<font color='#008000'>"+result.msg+"</font>");
            }
        });
        Global.addGlobalFn("flashRegisterNew",function(account,pwd,pwd1){
            var result=_self.checkAccount(account);

            if(result.code==0){
                return "<font color='#FF0000'>"+result.msg+"</font>"
            };

            result=_self.checkPwd(pwd);

            if(result.code==0){
                return "<font color='#FF0000'>"+result.msg+"</font>"
            };

            result=_self.comparePwd(pwd,pwd1);
            if(result.code==0){
                return "<font color='#FF0000'>"+result.msg+"</font>"
            };

            App.regist(account,pwd);
        });
        Global.addGlobalFn("imgRegster",function(){
            var oRegInfo=AdLoader.getRegisterInfo();
            var account=oRegInfo.account;
            var pwd=oRegInfo.pwd;
            var pwd1=oRegInfo.pwd1;
            var result=_self.checkAccount(account);

            if(result.code==0){
                AdLoader.showUTips("<font color='#FF0000'>"+result.msg+"</font>");
                return;
            }else{
                AdLoader.showUTips("<font color='#008000'>"+result.msg+"</font>");
            }

            result=_self.checkPwd(pwd);

            if(result.code==0){
                AdLoader.showWTips("<font color='#FF0000'>"+result.msg+"</font>");
                return;
            };

            result=_self.comparePwd(pwd,pwd1);
            if(result.code==0){
                AdLoader.showPTips("<font color='#FF0000'>"+result.msg+"</font>");
                return;
            };

            if(AdLoader.isAgree()){
                App.regist(account,pwd);
            }else{

            }
        });
        Global.addGlobalFn("checkPhoneUser",function(res){

            if(res.success==0){
                if(res.is_phone==1){
                    App.phoneStatic(phone,2,1,1);
                    LifeCycle.trigger("phoneReg");
                    return ;
                }
                else if(res.is_phone==0){
                    App.phoneStatic(phone,2,2,1);
                }
            }
            else if(res.success==-1){
                if(res.is_phone==1){
                    App.phoneStatic(phone,1,1,1);
                }
                else if(res.is_phone==0){
                    App.phoneStatic(phone,1,2,1);
                }
            }
        })
    },
    checkAccount:function(value){
        var _self = this;
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
            phone=value;
            _self.reqPhone(value);
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
        var _self = this,
            result={};
        if(val!=val2){
            result={
                code:0,
                msg:"两次填写的密码不一致！"
            }
            return result;
        }
        return _self.checkPwd(val);
    },
    reqPhone:function(account){
        if(phoneAccount[account]){
            return;
        }
        phoneAccount[account]=1;
        var url=http+'://regapi.37.com/api/p_register_check.php?action=checkUser'+
            '&login_account='+account+
            '&type=3'+
            '&check_phone=1'+
            '&ajax=0'+
            '&callback=checkPhoneUser';
        Callback.doScript(url);
    }
}