import {CallBack} from "../util/callback";
import {Global} from "../global/index";
import {AdLoader} from "../app/adLoadder";
import {App} from "../app/index"
export var FreeLogin={
    ePopWrap:null,
    eBubbleWrap:null,
    init:function(){
        var _self = this;
        if(window.free_twice){

            if(free_twice.flag){
                Global.addGlobalFn("freeStatus",function(n, u, t){
                    Global.addGlobalFn("_loginName",n);
                    Global.addGlobalFn("_loginUrl",u);
                    Global.addGlobalFn("_loginTime",t);
                    Global.addGlobalFn("_loginClick",0)
                })
                CallBack.doScript("//" + gconfig.status_login_domain + "/api/login.php?action=status&game_id=" + gconfig.game_id + "&server_id=" + gconfig.game_server_id + "&callback=freeStatus");
            }
            if(free_twice.new_free){
                LifeCycle.add("bodyLoaded",function(){
                    _self.doStatic(1);
                    _self.getStatus();
                });
                LifeCycle.add("enterGame",function(){
                    _self.doStatic(7);
                })
                Global.addGlobalFn("hanlderStatus",function(oRep){
                    if(oRep.code ==1){
                        var loginAccount=oRep.data.LOGIN_ACCOUNT;
                        var showName=oRep.data.SHOW_NAME;

                        if(loginAccount){
                            _self.loginAccount=loginAccount;
                            _self.ePopWrap=document.createElement("div");
                            _self.ePopWrap.setAttribute("id","pop-wrap");
                            if(showName.length>12){
                                showName=showName.substring(0,11)+"...";
                            }
                            _self.ePopWrap.innerHTML=_self.popTemplate.replace(/##loginAccount##/g,showName);
                            _self.eBubbleWrap=document.createElement("div");
                            _self.eBubbleWrap.setAttribute("id","bubble-wrap");
                            if(showName.length>7){
                                showName=showName.substring(0,6)+"...";
                            }
                            _self.eBubbleWrap.innerHTML=_self.bubbleTemplate.replace(/##loginAccount##/g,showName);
                            document.body.appendChild(_self.ePopWrap);
                            document.body.appendChild(_self.eBubbleWrap);
                            _self.doStatic(2);
                            _self.bindEvent();
                        }
                    }
                })
                CallBack.doScript("//"+gconfig.status_login_domain+"/api/login.php?action=userinfo&callback=hanlderStatus");
            }
        }
    },
    getStatus:function(){
        if(free_twice.flag){
            CallBack.doScript("//" + gconfig.status_login_domain + "/api/login.php?action=status&game_id=" + gconfig.game_id + "&server_id=" + gconfig.game_server_id + "&callback=freeStatus");
        }
        if(free_twice.new_free){
            CallBack.doScript("//"+gconfig.status_login_domain+"/api/login.php?action=userinfo&callback=hanlderStatus");
        }
    },
    bindEvent:function(){
        var _self = this;
        var $mask=document.getElementById("pop-wrap-mask");
        var $btnLogin=document.getElementById("pop-btn-login");
        var $btnRegistAgain=document.getElementById("pop-btn-regist");
        var $btnBubble=document.getElementById("bubble-btn-regist");
        var $close=document.getElementById("pop-wrap-close");
        $mask.onclick=function(){
            _self.doStatic(5);
            _self.hide();
        }
        $close.onclick=function(){
            _self.doStatic(5);
            _self.hide();
        }
        $btnLogin.onclick=function(){
            _self.doStatic(3);
            _self.doLogin();
        }
        $btnRegistAgain.onclick=function(){
            _self.doStatic(5);
            _self.doRegistAgain();
        }
        $btnBubble.onclick=function(){
            _self.doStatic(6);
            _self.doLogin();
        }
    },
    hide:function(){
        var _self = this;
        if(_self.ePopWrap.remove){
            _self.ePopWrap.remove();
        }else{
            _self.ePopWrap.parentNode&& _self.ePopWrap.parentNode.removeChild&&_self.ePopWrap.parentNode.removeChild(_self.ePopWrap);
        }

        var top=-150;
        var offset=10;
        var intervalTimer=setInterval(function(){
            top+=offset;
            offset+=5;
            if(top>=0){
                clearInterval(intervalTimer);
                intervalTimer=null;
                top=0;
            }
            _self.eBubbleWrap.style.top=top+"px";
        },30);

        AdLoader.openReg();
    },
    doStatic:function(e1){
        var _self =this;
        var img=new Image();
        img.src="//pt.clickdata.37wan.com/ps.gif?id=55&at=&la="+(_self.loginAccount||"")+"&ck=&gid="+gconfig.game_id+"&sid="+gconfig.game_server_id+"&cf=&rf=&b=&ext="+gconfig.ad_param+"&e1="+e1+"&e2=&e3=&e4=&e5=";
    },
    doLogin:function(){
        var _self = this;
        Global.addGlobalFn("hanlderFreeLogin",function(){
            App.freeLogin();
        })
        CallBack.doReq("//" + gconfig.status_login_domain + "/api/login.php?action=status&game_id=" + gconfig.game_id + "&server_id=" + gconfig.game_server_id + "&callback=hanlderFreeLogin",null)
    },
    doRegistAgain:function(){
        var _self = this;
        _self.doStatic(4);
        _self.hide();
    },
    popTemplate: '<div id="pop-wrap-mask" class="mask"></div> ' +
    '<div id="pop-wrap-content"> ' +
    '<div id="pop-wrap-close"></div>'+
    '<span id="pop-wrap-account">##loginAccount##</span> ' +
    '<div class="btn-wrap"> ' +
    '<div id="pop-btn-login" class="btn">' +
    '立即开始游戏 ' +
    '</div> ' +
    '<div id="pop-btn-regist" class="btn">' +
    '重新注册账号 ' +
    '</div> ' +
    '</div> ' +
    '</div> ',
    bubbleTemplate:'<span id="bubble-account">##loginAccount##</span>' +
    '<div id="bubble-btn-regist" class="btn"></div>'
}