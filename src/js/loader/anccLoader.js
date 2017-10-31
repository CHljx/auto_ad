import {Global} from "../global/index";
import {LifeCycle} from "../lifecycle/index";
import {CallBack} from "../util/callback";


var fontColor="";
export var AnccLoader={
    $Container:null,
    eStage:document.getElementById("Stage"),
    eApp:document.getElementById("app"),
    el:{

    },
    init:function(){
        var _self = this;
        document.body.style.background="url("+gconfig.flash_path+"/bg.jpg) center top #000 no-repeat";
        document.body.style.height=gconfig.height+"px";
        _self.eApp.style.width= _self.eStage.style.width=gconfig.width+"px";
        _self.eApp.style.height=_self.eStage.style.height=gconfig.height+"px";
        _self.eApp.innerHTML=' <canvas id="canvas" width="'+gconfig.height +'" height="'+gconfig.height +'" style="width:'+gconfig.width +'px;height:'+gconfig.height +'px;display: block; background: transparent;"></canvas>'
        _self.addGlobalFn();
        _self.addRegBox();
        _self.bindEvent();
        CallBack.doScript("http://kwcdn.000dn.com/js/module/ancc/libs/createjs/createjs.min.js",function(){
            CallBack.doScript(gconfig.flash_path +"index.js",function(){
                _self.loadANCC();
            })
        })
    },
    addRegBox:function(){
        var _self= this;
        var eDiv=document.createElement("div");
        eDiv.setAttribute("class","box-regist-ancc");
        eDiv.innerHTML=[
            '<div>',
                '<input type="hidden" id="login_account"/>',
                '<input type="text" id="uname" class="input-control" value="'+Cookies.get('pusername', '')+'"/>',
                '<span id="unameNotice" class="notice-control">4-20个字符，由字母或数字组成</span>',
                '<input type="password" id="password" class="input-control"/>',
                '<span id="passwordNotice" class="notice-control"> 长度6~20个字符</span>',
                '<input type="password" id="confirmPassword" class="input-control"/>',
                '<span id="confirmPasswordNotice" class="notice-control">两次输入的密码请保持一致</span>',
                '<div id="agree" class="agreeWrap">',
                '<input type="checkbox" checked id="agreeCheck"/>',
                '<span id="agreeText" href="#" class="text">我已经阅读并同意《用户注册协议》</span>',
                '</div>',
                '<button id="play">登录</button>',
            '</div>',
        ].join("")
        _self.eStage.appendChild(eDiv);
        _self.el={
            $uInput:$("uname"),
            $pInput:$("password"),
            $wInput:$("confirmPassword"),
            $uTips:$("unameNotice"),
            $pTips:$("passwordNotice"),
            $wTips:$("confirmPasswordNotice"),
            $btn:$("play"),
            $agree:$("agree"),
            $check:$("agreeCheck"),
            $agree:$("agreeText")
        }
    },
    getRegisterInfo:function(){
        var _self = this;
        return {
            account:_self.el.$uInput.value,
            pwd:_self.el.$pInput.value,
            pwd1:_self.el.$wInput.value,
        };
    },
    bindEvent:function(){
        var _self = this;
        _self.el.$uInput.onblur=function(){
            checkLoginAccountNew(this.value);
        };
        _self.el.$uInput.onkeyup=function(event){
            var event = event || window.event || arguments.callee.caller.arguments[0];
            if (event.keyCode != 13) return false;
            imgRegster();
        }
        _self.el.$pInput.onblur=function(){
            checkPasswordNew(this.value);
        }
        _self.el.$pInput.onkeyup=function(event){
            var event = event || window.event || arguments.callee.caller.arguments[0];
            if (event.keyCode != 13) return false;
            imgRegster();
        }
        _self.el.$wInput.onblur=function(){
            checkPassword1New(this.value,_self.el.$pInput.value)
        }
        _self.el.$wInput.onkeyup=function(event){
            var event = event || window.event || arguments.callee.caller.arguments[0];
            if (event.keyCode != 13) return false;
            imgRegster();
        }
        _self.el.$btn.onclick=function(){
            imgRegster();
        }
    },
    isAgree:function(){
        if(!fontColor){
            fontColor=this.el.$agree.style.color||"black";
        }
        if(this.el.$check.checked){
            this.el.$agree.style.color = fontColor;
            return true;
        }else{
            this.el.$agree.style.color = 'red';
            return false;
        };
    },
    addGlobalFn:function(){
        Global.addGlobalFn("setInputCss",function(sId,oCssObj){
            var input=document.getElementById(sId);
            input.style.left=oCssObj.x+"px";
            input.style.top=oCssObj.y+"px";
            input.style.width=(oCssObj.width-10)+"px";
            input.style.height=oCssObj.height+"px";
            input.style.lineHeight=oCssObj.height+"px";
            if(!document.createElement("canvas").getContext){
                input.style.background="#fff";
            }
            input.style.display="block";
            input.style.color=oCssObj.color;
        });
        Global.addGlobalFn("setNoticeCss",function(sId,oCssObj){
            var input=document.getElementById(sId);
            input.style.left=oCssObj.x+"px";
            input.style.top=oCssObj.y+"px";
            input.style.display="block";
            input.style.color=oCssObj.color;
            input.style.font=oCssObj.font;
        });
    },
    loadANCC:function(){
        var _self=this;
        var loader=null;
        createjs.MotionGuidePlugin.install();
        images = images||{};
        loader = new createjs.LoadQueue(true,gconfig.flash_path,"Anonymous" );
        loader.setMaxConnections(100);
        loader.maintainScriptOrder=true;
        loader.installPlugin(createjs.Sound);
        loader.addEventListener("fileload", _self.handleFileLoad);
        loader.addEventListener("complete", _self.handleComplete);
        for(var index=0,len=lib.properties.manifest.length;index<len;index++){
            lib.properties.manifest[index]["src"]=encodeURI(lib.properties.manifest[index]["src"])
        }
        loader.loadManifest(lib.properties.manifest,true);;
    },
    handleFileLoad:function(evt){
        if (evt.item.type == "image") {
            //evt.result.crossOrigin="anonymous";
            images[evt.item.id] = evt.result;
        }
    },
    handleComplete:function(evt){
        LifeCycle.trigger("adLoadEnd");
        document.body.style.background="#000";
        canvas = document.getElementById("canvas");
        canvas.style.background="#fff;";
        var queue = evt.target;
        var ssMetadata = lib.ssMetadata;
        for(var i=0; i<ssMetadata.length; i++) {
            ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} )
        }
        var exportRoot = new lib.index();
        stage = new createjs.Stage(canvas);
        stage.addChild(exportRoot);
        stage.enableMouseOver();
        createjs.Ticker.setFPS(lib.properties.fps);
        createjs.Ticker.addEventListener("tick", stage);
        (function(isResp, respDim, isScale, scaleType) {
            var lastW, lastH, lastS=1;
            window.addEventListener('resize', resizeCanvas);
            resizeCanvas();
            function resizeCanvas() {
                var w = lib.properties.width, h = lib.properties.height;
                var iw = window.innerWidth, ih=window.innerHeight;
                var pRatio = window.devicePixelRatio||1, xRatio=iw/w, yRatio=ih/h, sRatio=1;
                if(isResp) {
                    if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {
                        sRatio = lastS;
                    }
                    else if(!isScale) {
                        if(iw<w || ih<h)
                            sRatio = Math.min(xRatio, yRatio);
                    }
                    else if(scaleType==1) {
                        sRatio = Math.min(xRatio, yRatio);
                    }
                    else if(scaleType==2) {
                        sRatio = Math.max(xRatio, yRatio);
                    }
                }
                canvas.width = w*pRatio*sRatio;
                canvas.height = h*pRatio*sRatio;
                canvas.style.width = w*sRatio+'px';
                canvas.style.height = h*sRatio+'px';
                stage.scaleX = pRatio*sRatio;
                stage.scaleY = pRatio*sRatio;
                lastW = iw; lastH = ih; lastS = sRatio;
            }
        })(false,'both',false,1);
    },
    showUTips:function(msg){
        this.el.$uTips.innerHTML=msg;
    },
    showWTips:function(msg){
        this.el.$pTips.innerHTML=msg;
    },
    showPTips:function(msg){
        this.el.$wTips.innerHTML=msg;
    },
    showTips:function(msg){
        this.el.$uTips.innerHTML=msg;
    },
    openReg:function(){
        document.getElementById("canvas").click();
    }
}