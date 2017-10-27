import {Global} from "../global/index";
import {App} from "../app/index";
export var Identifying= {
    data:{
        show:false
    },
    ref:{
        eBox:document.getElementById("box-validation"),
        eImg:document.getElementById("validation_img"),
        eCode:document.getElementById("check-code"),
        eBtn:document.getElementById("validation_register"),
        eClose:document.getElementById("val-pop-close-bg"),
        eTip:document.getElementById("validation_title")
    },
    init:function(){
        var _self = this;
        _self.ref.eClose.onclick=function(){
            _self.data.show=false;
            _self.ref.eBox.style.display="none";
        }
        Global.addGlobalFn("verifyRegister",function(){
            App.data.verifyCode=_self.ref.eCode.value;
            App.doRegist()
        })
    },
    open:function(){
        var _self = this;
        _self.ref.eTip.innerHTML="输入验证码完成注册，立即畅玩游戏";
        _self.ref.eBox.className='addbg';
        _self.ref.eBox.style.left = document.body.scrollHeight + "px";
        _self.ref.eBox.style.left = document.body.scrollHeight + "px";
        _self.ref.eBox.style.top = (document.body.scrollTop + (window.screen.availHeight / 2) - 170) + "px";
        _self.ref.eBox.style.display = "block";
        _self.refreshImg();
        _self.ref.eCode.value=""
        _self.ref.eCode.focus();
        _self.data.show=true;
    },
    close:function(){
        var _self = this;
        _self.data.show=false;
        _self.ref.eBox.style.display="none";
    },
    showTips:function(tips){
        var _self = this;
        _self.ref.eTip.innerHTML=tips;
    },
    refreshImg:function(){
        var _self = this;
        _self.ref.eImg.src= '//regapi.37.com/code.php?t=' + Math.random();
    }
}