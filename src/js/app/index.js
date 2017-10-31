import {LifeCycle} from "../lifecycle/index";
import {CallBack} from "../util/callback";
import {AdLoader} from "./adLoadder";
import {Global} from "../global/index";
import {Md5} from "../util/md5";
import {Param} from "../util/query";
import {FreeLogin} from "../plugin/free.login";
import {Validator} from "../plugin/validator";
import {Identifying} from "../plugin/identifying.win";
import {BackPop} from "../plugin/backpop"
import {GameBox} from "../plugin/gamebox";
import {Hijack} from "../plugin/hijack";
import {Icp} from "../plugin/icp";
import {Iframe} from "../plugin/iframe";
import {Title} from "../plugin/title";
import {PhoneWin} from "../plugin/phone.win"
import {Checker} from "../util/checker";
import {Try} from "../util/try";

var identifyingFlag=false;
var isFree=false;

export var App={
    data:{
        account:"",
        pwd:"",
        verifyCode:"",
        temrefer:"",
        tempara:"",
        returnGameId:"",
        returnServerId:""
    },
    win:null,
    init:function(){
        var _self = this
        Try(function(){
            LifeCycle.trigger("load");
            LifeCycle.add("adLoadEnd",function(){
                if(window.autoOpenDiv){
                    window.setTimeout(function(){
                        if(autoOpenDiv.autoOpen){
                            autoOpenDiv.autoOpenFlag=true;
                            try{
                                AdLoader.openReg();
                                App.openRegist();
                            }catch(e){
                                console.log(e)
                            }
                        }
                    },10000);
                }
                BackPop.init();
                GameBox.init();
                Hijack.init();
            })
            LifeCycle.add("bodyLoaded",function(){
                if (window.free_twice&&free_twice.flag && free_twice.enter_game) {
                    _self.freeLogin();
                }
            });
            LifeCycle.add("phoneReg",function(){
                PhoneWin.init();
            })
            AdLoader.init();
            Title.init();
            Validator.init();
            FreeLogin.init();
            Identifying.init();
            Iframe.init();
            Icp.init();
            _self.initParam();
        })
    },
    initParam:function() {
        var _self = this;
        var temrefer = encodeURIComponent(referer);
        var oldrefer = encodeURIComponent(temrefer);
        var tempara = encodeURIComponent(uid);
        var regApi = '';
        if (!Checker.supportFlash) {
            temrefer=flash_param.referer||"mbhztszy";
            if (flash_param.referer_param == 'referer') {
                tempara = encodeURIComponent(oldrefer);
            }
        }

        /*
         *注册是否带验证码规则
         */
        if (window.is_vali_flag) {
            if (typeof gconfig.is_hg_api !== 'undefined') {
                if (gconfig.is_hg_api == 1) {
                    regApi = 'p_register_hd_v2';
                }
            } else {
                regApi = 'p_register_v2';
            }
        } else {
            regApi = 'p_register';
        }

        var url = http + "://" + platformDomain + "/api/" + regApi + ".php?action=login"+
            "&ab_param=" + encodeURIComponent(gconfig.ad_param) +
            "&referer=" + temrefer +
            "&referer_param=" + tempara +
            "&bid=" + encodeURIComponent(bid) +
            "&lid=" + encodeURIComponent(lid) +
            "&game_id=" + gconfig.game_id +
            "&game_server_id=" + gconfig.game_server_id +
            "&wd=" + getwd() +
            "&ab_type=" + ab_type +
            "&ext=" + ext +
            "&tj_from=220"+
            "&tj_way=1"+
            "&s=1";


        _self.data.temrefer=temrefer;
        _self.data.tempara= tempara;
        _self.data.registerUrl = url;
        _self.data.registerApi = regApi;
    },
    openRegist:function(){
        var _self = this;
        LifeCycle.trigger("registShow");
        if(window.autoOpenDiv){
            autoOpenDiv.autoOpen=false;
        }

        if (window.free_twice&&free_twice.flag && !free_twice.enter_game) {
            if ((window.new_iframe&&new_iframe.flag && new_iframe.show != 'click') || !new_iframe.flag) {
                isFree=true;
                _self.freeLogin();
            }
        }

    },
    regist:function(account,pwd){
        var _self = this;
        _self.data.account=account;
        _self.data.pwd=Md5(pwd);
        _self.doRegist();
    },
    registerInter:function(otype){
        var _self= this;
        var otypeMapping = { "qq": "11", "weibo": "12", "wechat": "13" };
        var ot = otypeMapping[otype] ? otypeMapping[otype] : 0;
        var protocaol=window.location.protocol;

        var url = protocaol+"//" + platformDomain + "/api/oauth_api.php?action=oauth_login" +
            "&otype=" + otype +
            "&ab_param=" + encodeURIComponent(gconfig.ad_param) +
            "&referer=" + _self.data.temrefer +
            "&referer_param=" + _self.data.tempara +
            "&bid=" + encodeURIComponent(bid) +
            "&lid=" + encodeURIComponent(lid) +
            "&game_id=" +  gconfig.game_id +
            "&game_server_id=" + gconfig.game_server_id +
            "&wd=" + getwd() +
            "&ab_type=" + ab_type +
            "&ext=" + ext +
            "&tj_from=220"+
            "&tj_way="+ot+
            "&from=" + encodeURIComponent(protocaol+"//"  + document.domain + "/api_login.html");
        window.open(url, "newwindow", "height=600, width=800, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
        (new Image).src = "//pt.clickdata.37wan.com/ps.gif?id=38&at=&" +
            "gid=" + gconfig.game_id +
            "&sid=" + gconfig.game_server_id +
            "&e1=" + _self.data.temrefer  +
            "&e2=" + _self.data.tempara +
            "&e3=" + encodeURIComponent(gconfig.ad_param) +
            "&e4=" + ab_type +
            "&e5=" + encodeURIComponent(bid) +
            "&e6=" + encodeURIComponent(lid) +
            "&e7=" + otype +
            "&e8=" + ot + "&rnd=" + Math.floor(Math.random() * Math.pow(2, 31));
    },
    registerPhone:function(phone,pwd,msg){
        var _self = this;
        var url=http+"://regapi.37.com/api/p_register_phone.php?action=login"+
            "&login_account="+phone+
            "&password=" + pwd+
            "&ab_param=" + encodeURIComponent(gconfig.ad_param) +
            "&referer=" + _self.data.temrefer +
            "&referer_param=" + _self.data.tempara +
            "&bid=" + encodeURIComponent(bid) +
            "&lid=" + encodeURIComponent(lid) +
            "&game_id=" + gconfig.game_id  +
            "&game_server_id=" + gconfig.game_server_id +
            "&phone_code=" + msg+
            "&wd=" + getwd() +
            "&ab_type=" + ab_type +
            "&callback=phoneMsgCallback"+
            "&tj_from=220"+
            "&tj_way=1"+
            "&ext=" + ext ;
       CallBack.doScript(url)
    },
    doRegist:function(){
        var _self = this;
        Try(function(){
            if(http=="http"){
                _self.doRegistHttp();
            }else{
                _self.doRegistHttps(
                    _self.data.registerUrl+"&login_account=" + encodeURIComponent(_self.data.account) +
                    "&password=" + encodeURIComponent(_self.data.pwd) +
                    "&verify_code=" + _self.data.verifyCode,
                    function(oRep){
                    _self.registStatic(oRep.success,_self.data.registerApi)
                });
            }
        });
    },
    doRegistHttp:function(){
        var _self = this;
        var idForm="myform";
        var idFrame="myframe";
        var postFrame=document.getElementById(idFrame);
        var postForm = document.getElementById(idForm);
        var temrefer = _self.data.temrefer;
        var tempara = _self.data.tempara;
        var action = "http://" + platformDomain + "/api/p_register_v3.php?action=login" +
            "&ab_param=" + encodeURIComponent(gconfig.ad_param) +
            "&referer=" + temrefer +
            "&referer_param=" + tempara +
            "&bid=" + encodeURIComponent(bid) +
            "&lid=" + encodeURIComponent(lid) +
            "&game_id=" + gconfig.game_id +
            "&game_server_id=" +  gconfig.game_server_id +
            "&wd=" + getwd() +
            "&ab_type=" + ab_type +
            "&ext=" + ext +
            "&s=1" +
            "&tj_from=220"+
            "&tj_way=1"+
            "&url=" + encodeURIComponent("http://" + document.domain + "/proxy.html");
        if (postFrame === null) {
            try {
                postFrame = document.createElement('<iframe name="myframe">');
            } catch (ex) {
                postFrame = document.createElement('iframe');
            }
            postFrame.id = 'myframe';
            postFrame.name = 'myframe';
            postFrame.width = 0;
            postFrame.height = 0;
            postFrame.marginHeight = 0;
            postFrame.marginWidth = 0;
            postFrame.setAttribute('id', 'myframe');
            postFrame.setAttribute('name', 'myframe');
            postFrame.setAttribute('height', 0);
            postFrame.setAttribute('width', 0);
            postFrame.setAttribute('marginheight', 0);
            postFrame.setAttribute('marginwidth', 0);
            postFrame.setAttribute('frameborder', 0);
            document.body.appendChild(postFrame);
        }
        if (postForm !== null) {
            var _parentElement = postForm.parentNode;
            if (_parentElement) {
                _parentElement.removeChild(postForm);
            }
        }
        var _postForm = document.createElement('form');
        _postForm.setAttribute('id', 'myform');
        _postForm.setAttribute('action', action);
        _postForm.setAttribute('method', 'post');
        _postForm.setAttribute('target', 'myframe');

        var eAccount = document.createElement('input');
        eAccount.setAttribute('type', 'hidden');
        eAccount.setAttribute('id', "login_account");
        eAccount.setAttribute('name', "login_account");
        eAccount.setAttribute('value', _self.data.account);
        var ePwd=document.createElement("input");
        ePwd.setAttribute('type', 'hidden');
        ePwd.setAttribute('id', "password");
        ePwd.setAttribute('name', "password");
        ePwd.setAttribute('value', _self.data.pwd);
        var eCode=document.createElement("input");
        eCode.setAttribute('type', 'hidden');
        eCode.setAttribute('id', "verify_code");
        eCode.setAttribute('name', "verify_code");
        eCode.setAttribute('value', _self.data.verifyCode);

        _postForm.appendChild(eAccount);
        _postForm.appendChild(ePwd);
        _postForm.appendChild(eCode);
        document.body.appendChild(_postForm);
        document.getElementById(idForm).submit();
    },
    doRegistHttps:function(url,fn){
        var _self = this;
        _self.openWin();
        if(!isFree){
            AdLoader.showTips('<font color="#008000">请稍后...</font>');
        }

        CallBack.doReq(url,function(oRep) {
            Try(function(){
                fn&&fn(oRep);
                switch (parseInt(oRep.success)) {
                    case 0:
                        LifeCycle.trigger("registed");
                        _self.data.returnGameId=oRep.game_id?oRep.game_id:gconfig.game_id;
                        _self.data.returnServerId=oRep.game_server_id?oRep.game_server_id: gconfig.game_server_id;
                        Cookies.set('pusername', _self.data.account, 365);
                        _self.registSuccess(oRep.url);
                        break;
                    case 8:
                        _self.closeWin();
                        Identifying.open();
                        identifyingFlag=true;
                        isFree&&(window._loginClick=0);
                        break;
                    case 7:
                        _self.closeWin();
                        Identifying.open();
                        Identifying.showTips("验证码错误");
                        identifyingFlag=true;
                        isFree&&(window._loginClick=0);
                        break;
                    default:
                        _self.closeWin();
                        !isFree&&identifyingFlag&&Identifying.showTips(oRep.message);
                        !isFree&&identifyingFlag&&Identifying.refreshImg();
                        !isFree&&AdLoader.showTips('<font color="#FF0000">' + oRep.message + '</font>');
                        isFree&&(window._loginClick=0);
                        break;
                }
                isFree=false;
            })
        });
    },
    doRegistInter:function(url){
        var _self = this;
        var data = {};
        data.success = getParamUrl("e", url);
        data.authtType = getParamUrl("auth_type", url);
        data.url = decodeURIComponent(getParamUrl("gameweburl", url));
        data.message = decodeURIComponent(getParamUrl("message", url));
        data.game_id=getParamUrl("game_id", url);
        data.game_server_id=getParamUrl("game_server_id", url);
        _self.data.account=decodeURIComponent(getParamUrl("LOGIN_ACCOUNT", url));
        _self.data.returnGameId=data.game_id?data.game_id:gconfig.game_id;
        _self.data.returnServerId=data.game_server_id?data.game_server_id: gconfig.game_server_id;

        if (data.success == 0) {
            _self.registSuccess(data.url);
        } else {
            AdLoader.showTips("授权暂时无法进行，请点击 “确认” 返回注册登录");
        }
        if (data.success == 100 || data.success == 101 || data.success == 102) {
            CallBack.doImg("//log.he2d.com/direct_media/call_back?/cb/1/2255/52571.html?uid=" + data.authtType);
        }
    },
    doRegistUrl:function(url){
        var _self = this;
        var data = {};
        if(!isFree){
            AdLoader.showTips('<font color="#008000">请稍后...</font>');
        }
        data.success = getParamUrl("success", url);
        data.url = decodeURIComponent(getParamUrl("url", url));
        data.message = decodeURIComponent(getParamUrl("message", url));
        data.game_id=getParamUrl("game_id", url);
        data.game_server_id=getParamUrl("game_server_id", url);
        _self.registStatic(data.success, "p_register_v3");
        _self.openWin();
        switch (parseInt(data.success)) {
            case 0:
                LifeCycle.trigger("registed");
                _self.data.returnGameId=data.game_id?data.game_id:gconfig.game_id;
                _self.data.returnServerId=data.game_server_id?data.game_server_id: gconfig.game_server_id;
                Cookies.set('pusername', _self.data.account, 365);
                _self.registSuccess(data.url);
                break;
            case 8:
                _self.closeWin();
                Identifying.open();
                identifyingFlag=true;
                break;
            case 7:
                _self.closeWin();
                Identifying.open();
                Identifying.showTips("验证码错误");
                identifyingFlag=true;
                break;
            default:
                _self.closeWin();
                !isFree&&identifyingFlag&&Identifying.showTips(data.message);
                !isFree&&identifyingFlag&&Identifying.refreshImg();
                !isFree&&AdLoader.showTips('<font color="#FF0000">' + data.message + '</font>');
                isFree&&(window._loginClick=0);
                break;
        }
    },
    registSuccess:function(gameUrl){
        var _self = this;
        window.cs_ext&&(gameUrl = gameUrl + "&cs_ext=" + cs_ext);
        window.user_referer&&(gameUrl = gameUrl + "&user_refer=" + user_referer);
        if(window.reg_callback){
            if(reg_callback.url){
                (new Image).src = reg_callback.url + '&rnd=' + Math.floor(Math.random() * Math.pow(2, 31));
                _self.enterGame(gameUrl)
                return true;
            }else if(reg_callback.fn){
                try{
                    eval(reg_callback.func);
                    if(reg_callback.func == "monitorReg()" || reg_callback.func.search('beheActiveEvent') != -1 ||reg_callback.func == "_CWiQ.push(['_trackReg', 1]);") {
                        _self.enterGame(gameUrl);
                        return true;
                    }
                }catch(e){
                }
            }
        }
        _self.enterGame(gameUrl);
    },
    registStatic:function(e6,e7){
        var _self = this;
        (new Image()).src = '//pt.clickdata.37wan.com/ps.gif?id=45&la=' +
            _self.data.account + '&gid=' + gconfig.game_id + '&sid=' + gconfig.game_server_id +
            '&ext=' + referer + '&e1=' + uid + '&e2=' + gconfig.ad_param + '&e3=' + ab_type +
            '&e4=' + bid + '&e5=' + lid + '&e6=' + e6 + '&e7=' + e7+'&rnd=' + Math.floor(Math.random() * Math.pow(2, 31));
    },
    phoneStatic:function(pa,e2,e3,e4){
        var _self = this;
        (new Image).src = "//pt.clickdata.37wan.com/ps.gif?id=71&la="+pa+"&" +
            "gid=" + gconfig.game_id  +
            "&sid=" + gconfig.game_server_id +
            "&ext=" + _self.data.temrefer +
            "&e1=" + _self.data.tempara +
            "&e2=" + e2 +
            "&e3=" + e3 +
            "&e4=" + e4 +
            "&e5=" + new Date().getTime();
    },
    freeLogin:function(){
        var _self = this;
        if(window._loginName && !window._loginClick){
            _self.registStatic(-1,'p_register_login');
            window._loginClick=1;
            _self.doRegistHttps(http+ "://" + platformDomain + "/api/p_register_login.php?ab_param=" + encodeURIComponent(gconfig.ad_param) +
                "&referer=" + _self.data.temrefer +
                "&referer_param=" + _self.data.tempara +
                "&bid=" + encodeURIComponent(bid) +
                "&lid=" + encodeURIComponent(lid) +
                "&game_id=" + gconfig.game_id +
                "&game_server_id=" + gconfig.game_server_id +
                "&wd=" + getwd() +
                "&ab_type=" + ab_type +
                "&tj_from=220"+
                "&tj_way=4"+
                "&ext=" + ext,function(oRep){
                _self.registStatic(oRep.success,'p_register_login')
            })
        }

    },
    openWin:function(){
        var _self=this;
        if(window.url_blank&&!new_iframe.flag){
            _self.win = window.open('','_blank');
        }
    },
    closeWin:function(){
        this.win&&this.win.close()&&(this.win=null);
    },
    enterGame:function(url){
        var _self = this;
        var isWindows=/windows|win32/i.test(navigator.userAgent);
        LifeCycle.trigger("enterGame");
        if (window.new_iframe&&new_iframe.flag && new_iframe.show == 'success') {
            return;
        }
        if(isWindows){
            if(typeof url_success !='undefined' && url_success!=''){
                if(_self.win){
                    _self.win.window.location = url_success+'?referer='+referer+'&referer_param='+uid+'&ab_param='+gconfig.ad_param+'&game_id='+_self.data.returnGameId+'&game_server_id='+_self.data.returnServerId+'&ab_type='+ab_type+'&bid='+bid+'&lid='+lid+'&la='+_self.data.account;
                    if(window.url_go_37){
                        isPopWin.flag=false;
                        top.window.location = 'http://www.37.com/?refer='+referer;
                    }
                } else{
                    isPopWin.flag=false;
                    top.window.location = url_success+'?referer='+referer+'&referer_param='+uid+'&ab_param='+gconfig.ad_param+'&game_id='+_self.data.returnGameId+'&game_server_id='+_self.data.returnServerId+'&ab_type='+ab_type+'&bid='+bid+'&lid='+lid+'&la='+_self.data.account;
                }
            }
            else{
                if(_self.win){
                    _self.win.window.location = url;
                    if(window.url_go_37){
                        isPopWin.flag=false;
                        top.window.location = 'http://www.37.com/?refer='+referer;
                    }
                }
                else{
                    isPopWin.flag=false;
                    top.window.location = url;
                }
            }
        } else{
            if(_self.win){
                _self.win.window.location = url;
                if(window.url_go_37){
                    isPopWin.flag=false;
                    top.window.location = 'http://www.37.com/?refer='+referer;
                }
            }
            else{
                isPopWin.flag=false;
                top.window.location = url;
            }

        }

    },
}