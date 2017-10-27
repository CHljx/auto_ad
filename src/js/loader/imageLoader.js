import {Global} from "../global/index";
import {LifeCycle} from "../lifecycle/index";
import {App} from "../app/index" ;
import {Checker} from "../util/checker"
var flag=true;
var fontColor=""
export var ImgLoader={
    $Container:null,
    eStage:document.getElementById("Stage"),
    eApp:document.getElementById("app"),
    init:function(){
        var _self = this;
        document.body.style.background="#000";
        _self.eApp.style.width= _self.eStage.style.width=gconfig.width+"px";
        _self.eApp.style.height=_self.eStage.style.height=gconfig.height+"px";
        var img=new Image();
        img.onerror=function(){
            this.src=gconfig.flash_path + "bg.jpg";
        }
        img.setAttribute("style",'width:' + gconfig.width + "px;height:" + gconfig.height + 'px;display: block; background: transparent;');
        img.setAttribute("src", gconfig.flash_path + 'pm.jpg');
        _self.eApp.appendChild(img);
        _self.addGlobalFn();
        _self.loadRegBox();
        _self.bindEvent();
        LifeCycle.add("mousedown",function(){
            if(flag){
                _self.openReg();
                App.openRegist();
            }
            flag=false;
        });
        LifeCycle.add("bodyLoaded",function(){
            if(Checker.isMobile){
                window.location.href='//g.pp9l.com/s/1/2258/53173.html?uid='+referer;
            }
        })
    },
    addGlobalFn:function(){
    },
    getRegisterInfo:function(){
        var _self = this;
        return {
            account:_self.$Container.eUInput.value,
            pwd:_self.$Container.ePInput.value,
            pwd1:Cookies.get('pusername', '')?_self.$Container.ePInput.value:_self.$Container.ePInput1.value,
        };
    },
    loadRegBox:function(){
        var _self = this;
        var $body = document.body;
        var eDivReg = document.createElement('div');
        var eImg = new Image();
        eImg.setAttribute("src",(gconfig.flash_path + "pm.jpg"));
        eImg.setAttribute("style","width:"+gconfig.width +'px;height:'+gconfig.height +"px;display: block; background: transparent;");
        eImg.onerror=function(){
            eImg.setAttribute("src",(gconfig.flash_path + "bg.jpg"));
        };
        eImg.onload=function(){
            LifeCycle.trigger("adLoadEnd");
        }
        $body.style.cursor = 'pointer';
        eDivReg.setAttribute('id', 'new_reg_wrap');
        eDivReg.innerHTML = ['<div id="box_register" class="clearfix2">',
            '    <div id="register_form" style="margin:0">',
            '         <div class="reg_wrap" id="reg_wrap">',
            '             <p class="p_inp_wrap">',
            '                 <span class="label">用户名</span>',
            '                 <input type="text" class="inp_user inp" id="noflash_login_account" value="'+Cookies.get("pusername","")+'"/>',
            '                 <span class="icon_inp user"></span>',
            '             </p>',
            '             <div class="normal p_infos" id="noflash_u_info" >4-20个字符,由字母或数字组成</div>',
            '             <p class="p_inp_wrap">',
            '                 <span class="label">登录密码：</span>',
            '                  <input id="noflash_password" type="password" class="inp" />',
            '                 <span class="icon_inp pwd"></span>',
            '             </p>',
            '             <div class="normal p_infos" id="noflash_w_info" >长度6-20个字符</div>',
            '             <div id="tr_cxzc" style="display:none;">',
            '                     <a href="javascript: clearCookie();" id="btn_re_register" class="btn_re_register">重新注册</a>',
            '             </div>',
            '             <div id="tr_password1" class="p_inp_wrap p_inp_wrap_last">',
            '                 <span class="label">重复密码：</span>',
            '                 <input id="noflash_password1" type="password" name="password1" class="text inp"/>',
            '                 <div class="normal p_infos" id="noflash_p_info">两次输入的密码请保持一致</div>',
            '                 <span class="icon_inp pwd"></span>',
            '             </div>',
            '             <input type="submit" name="SubmitBtn"  id="submitbtn"/>',
            "<div class='p_agree'>" + _SET_37.agreement.str + "</div>",
            '       </div>',
            '            <div  class="other_reg">',
            '              <p class="p_reg_tit">使用其他帐号登录</p>',
            '              <div class="icon_wrap">',
            '                 <a href="javascript:;" class="a_reg_qq" onclick="registerWinopen(\'qq\')"></a>',
            '                 <a href="javascript:;" class="a_reg_wx" onclick="registerWinopen(\'wechat\')"></a>',
            '                 <a href="javascript:;" class="a_reg_wb" onclick="registerWinopen(\'weibo\')"></a>',
            '             </div>',
            '            </div>',
            '     </div>',
            ' </div>'
        ].join("");
        _self.eStage.appendChild(eDivReg);
        _self.$Container=$('new_reg_wrap');
        _self.$Container.eUInfo=$("noflash_u_info");
        _self.$Container.eWInfo=$("noflash_w_info");
        _self.$Container.ePInfo=$("noflash_p_info")
        _self.$Container.eUInput=$("noflash_login_account");
        _self.$Container.ePInput=$("noflash_password");
        _self.$Container.ePInput1=$("noflash_password1");
        _self.$Container.eTrP1=$("tr_password1");
        _self.$Container.eTrRegister=$("tr_cxzc")
        _self.$Container.eBtn=$("submitbtn");
        _self.$Container.eBtnAgain=$("btn_re_register")
        _self.$Container.eCheck=$("checkservice");
        _self.$Container.eAgree=$("agreement");
        if(Cookies.get('pusername', '')){
            _self.hideComparePwd();
        }else{
            _self.showComparePwd();
        }
    },
    isAgree:function(){


        if(this.$Container.eCheck.checked){
            this.$Container.eAgree.style.color = 'black';
            return true;
        }else{
            this.$Container.eAgree.style.color = 'red';
            return false;
        }

    },
    bindEvent:function(){
        var _self = this;
        _self.$Container.eUInput.onblur=function(){
            checkLoginAccountNew(this.value);
        };
        _self.$Container.eUInput.onkeyup=function(event){
            var event = event || window.event || arguments.callee.caller.arguments[0];
            if (event.keyCode != 13) return false;
            imgRegster();
        }
        _self.$Container.ePInput.onblur=function(){
            checkPasswordNew(this.value);
        }
        _self.$Container.ePInput.onkeyup=function(event){
            var event = event || window.event || arguments.callee.caller.arguments[0];
            if (event.keyCode != 13) return false;
            imgRegster();
        }
        _self.$Container.ePInput1.onblur=function(){
            checkPassword1New(this.value,_self.$Container.ePInput.value)
        }
        _self.$Container.ePInput1.onkeyup=function(event){
            var event = event || window.event || arguments.callee.caller.arguments[0];
            if (event.keyCode != 13) return false;
            imgRegster();
        }
        _self.$Container.eBtn.onclick=function(){
            imgRegster();
        }
        _self.$Container.eBtnAgain.onclick=function(){
            Cookies.set('pusername', '', -1);
            _self.showComparePwd();
        }
    },
    hideComparePwd:function(){
        var _self = this;
        _self.$Container.eUInput.value= Cookies.get('pusername', '');
        _self.$Container.eTrP1.style.display="none";
        _self.$Container.eTrRegister.style.display="block";
    },
    showComparePwd:function(){
        var _self = this;
        _self.$Container.eTrP1.style.display="block";
        _self.$Container.eTrRegister.style.display="none";
        _self.$Container.eUInput.value="";
        _self.$Container.ePInput.value="";
        _self.$Container.ePInput1.value="";
    },
    showUTips:function(msg){
        this.$Container.eUInfo.innerHTML=msg;
    },
    showWTips:function(msg){
        this.$Container.eWInfo.innerHTML=msg;
    },
    showPTips:function(msg){
        this.$Container.ePInfo.innerHTML=msg;
    },
    showTips:function(msg){
        this.$Container.eUInfo.innerHTML=msg;
    },
    openReg:function(){
         this.$Container.style.display="block";
    }
}