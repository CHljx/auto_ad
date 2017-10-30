import {Global} from "../global/index";
import {App} from "../app/index";
import {CallBack} from "../util/callback"

var msg_timer=null;
var flag=false;
export var PhoneWin={
    el:{},
    init:function(){
        var _self = this;
        if(!flag){
            _self.addRegBox();
            _self.bindEvent();
            Global.addGlobalFn("phoneMsgCallback",function(data){
                App.openWin();
                if (data.success == 0) {
                    App.data.returnGameId=data.game_id?data.game_id:gconfig.game_id;
                    App.data.returnServerId=data.game_server_id?data.game_server_id: gconfig.game_server_id;
                    App.registSuccess(data.url);
                }
                else{
                    _self.el.tips.className='phone_tips warm';
                    _self.el.tips.innerHTML=data.message;
                }
            });
            Global.addGlobalFn("phoneValidCallback",function(res){
                if(res.success!=0){
                    _self.el.img.src='//regapi.37.com/code.php?t=' + Math.random();
                    if(res.success==-1){
                        _self.el.tipsCode.className='phone_tips warm';
                        _self.el.tipsCode.innerHTML=res.message;
                        return
                    }
                    else{
                        _self.el.tipsMsg.className='phone_tips warm';
                        _self.el.tipsMsg.innerHTML=res.message;
                        return
                    }
                }
                _self.el.tipsMsg.className='phone_tips';
                _self.el.tipsMsg.innerHTML='短信验证码已发送';
                _self.el.btnSendMsg.className="disabled"
                App.phoneStatic(_self.el.inputPhone.value,2,1,6);
                var ac=120;
                msg_timer=setInterval(function(){
                    if(ac<=1){
                        clearInterval(msg_timer);
                        _self.el.btnSendMsg.innerHTML='短信发送';
                        _self.el.btnSendMsg.className='';
                    }
                    else{
                        ac--;
                        _self.el.btnSendMsg.innerHTML=ac+'秒后重新发送';
                    }
                },1000);
            })
        }else{
            _self.el.box.style.display="block";
        }
        _self.el.inputPhone.value=phone;

    },
    addRegBox:function(){
        var _self = this;
        var $phone_reg = document.createElement('div');
        flag=true;
        $phone_reg.id = 'phone_reg';
        $phone_reg.innerHTML =
            '     <div id="phone_reg_wrap">'+
            '          <h3><i></i>手机注册<button id="close_phone">×</button></h3>'+
            '          <p class="tit_tips">您填写的是手机号，已为您切换至手机注册</p>'+
            '          <div class="mod_input_wrap">'+
            '              <span class="span_label">手机号</span>'+
            '              <input type="text" class="mod_input" id="reg_phone">'+
            '          </div>'+
            '          <p class="phone_tips" id="phone_tips_account"></p>'+
            '          <div class="mod_input_wrap">'+
            '              <span class="span_label">验证码</span>'+
            '              <input type="text" class="mod_input w140" id="reg_valid">'+
            '              <img id="valid_img" src="//regapi.37.com/code.php?t='+Math.random()+'" onclick="this.src=\'//regapi.37.com/code.php?t=\' + Math.random()">'+
            '          </div>'+
            '          <p class="phone_tips" id="phone_tips_valid"></p>'+
            '           <div class="mod_input_wrap">'+
            '              <span class="span_label">短信验证</span>'+
            '              <input type="text" class="mod_input w140" id="msg_valid">'+
            '              <button id="send_msg">短信发送</button>'+
            '          </div>'+
            '          <p class="phone_tips" id="phone_tips_msg"></p>'+
            '          <div class="mod_input_wrap">'+
            '              <span class="span_label">密码</span>'+
            '              <input type="password" class="mod_input" id="reg_phone_pwd">'+
            '          </div>'+
            '          <p class="phone_tips" id="phone_tips_pwd"></p>'+
            '          <p class="p_chkbox"><input type="checkbox" checked id="phone_chk"><a href="//my.37.com/user_agreement.html" target="_blank">我已阅读并同意《用户注册服务协议》</a></p>'+
            '          <p class="phone_tips" id="phone_tips"></p>'+
            '          <button id="btn_start_phone">开始游戏</button>'+
            '   </div>';
        document.body.appendChild($phone_reg);
        _self.el={
            inputPhone:$("reg_phone"),
            inputCode:$("reg_valid"),
            inputMsg:$("msg_valid"),
            inputPwd:$("reg_phone_pwd"),
            check:$("phone_chk"),
            btn:$("btn_start_phone"),
            btnSendMsg:$("send_msg"),
            btnClose:$("close_phone"),
            tipsPhone:$("phone_tips_account"),
            tipsCode:$("phone_tips_valid"),
            tipsMsg:$("phone_tips_msg"),
            tipsPwd:$("phone_tips_pwd"),
            tips:$("phone_tips"),
            img:$("valid_img"),
            box:$("phone_reg")
        }

    },
    bindEvent:function(){
        var _self = this;
        var el=_self.el;
        el.btnClose.onclick=function(){
            el.box.style.display="none"
        }
        el.btnSendMsg.onclick=function(){
            if(this.className=='disabled'){
                return;
            }
            el.tipsMsg.innerHTML='';
            if(el.inputCode.value==""){
                el.tipsCode.innerHTML="请输入验证码";
                el.tipsCode.className='phone_tips warm';
                return;
            }
            el.tipsCode.className="phone_tips";
            el.tipsCode.innerHTML="";
            CallBack.doScript(http+'://regapi.37.com/api/p_register_phone.php?action=send_code&login_account='+el.inputPhone.value+'&ajax=0&save_code='+el.inputCode.value+'&callback=phoneValidCallback')
        }
        el.btn.onclick=function(){
            if(el.inputCode.value==""){
                el.tipsCode.innerHTML="请输入验证码";
                el.tipsCode.className='phone_tips warm';
                return;
            }
            el.tipsCode.innerHTML="";
            el.tipsCode.className='phone_tips';
            if(el.inputMsg.value==""){
                el.tipsMsg.innerHTML="请输入短信验证";
                el.tipsMsg.className='phone_tips warm';
                return;
            }
            el.tipsMsg.innerHTML="";
            el.tipsMsg.className='phone_tips';
            if(el.inputPwd.value==""){
                el.tipsPwd.innerHTML="请输入密码";
                el.tipsPwd.className='phone_tips warm';
                return;
            }
            if(/^[\x01-\xfe]{6,20}$/.test(el.inputPwd.value)==false){
                el.tipsPwd.innerHTML='密码由6~20位数字、字母或特殊字符组成';
                el.tipsPwd.className='phone_tips warm';
                return;
            }
            el.tipsPwd.innerHTML="";
            el.tipsPwd.className='phone_tips';
            if(el.check.checked){
                el.tips.innerHTML='请同意《用户注册服务协议》';
                el.tips.className='phone_tips warm'
            }
            el.tips.innerHTML="";
            el.tips.className='phone_tips';

            App.registerPhone(el.inputPhone.value,el.inputPwd.value,el.inputMsg.value)
        }
    }
}