import CallBack from "../util/callback";
import Support from "../util/support";
import LifeCycle from "../lifecycle/index";
import Global from "../global/index"
export default {
    init:function(){
        LifeCycle.trigger("beforeAdLoad");
        var _self = this;
        var eApp=document.getElementById("app");
        if(Support.supportCanvas){
            eApp.innerHTML=' <canvas id="canvas" width="'+gconfig.height +'" height="'+gconfig.height +'" style="width:'+gconfig.width +'px;height:'+gconfig.height +'px;display: block; background: transparent;"></canvas>'
            _self.addGlobalAnccFn();
            CallBack.doScript("http://p.gm99.com/ancc/js/lib/createjs/createjs.min.js?v=1",function(){
                CallBack.doScript(gconfig.flash_path +"index.js",function(){
                    _self.loadANCC();
                })
            })
        }else{
            eApp.innerHTML=' <div id="flash" width="'+gconfig.height +'" height="'+gconfig.height +'" style="width:'+gconfig.width +'px;height:'+gconfig.height +'px;display: block; background: transparent;"></div>'
            _self.addGlobalFlashFn();
            _self.loadFlash();
        }

    },
    addGlobalAnccFn:function(){
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
    addGlobalFlashFn:function(){
        Global.addGlobalFn("loadAdTrack",function(){
            LifeCycle.trigger("adLoadEnd");
        });

    },
    loadFlash:function(){
        var eApp=document.getElementById("flash");
        var sHtml='';
        sHtml+='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="' + gconfig.width  + '" height="' + gconfig.height + '" id="flash_obj" align="middle">';
        sHtml+='<param name="allowScriptAccess" value="always" />';
        sHtml+='<param name="movie" value="' + gconfig.flash_path + '/index.swf" />';
        sHtml+='<param name="quality" value="high" />';
        sHtml+='<param name="bgcolor" value="#000000" />';
        sHtml+='<param name="FlashVars" value="path=' + gconfig.flash_path  + '" />';
        sHtml+='<param name="wmode" value="transparent" />';
        sHtml+='<embed src="' + gconfig.flash_path + '/index.swf"  FlashVars="path=' + gconfig.flash_path  + '" quality="high" bgcolor="#000000" width="' + gconfig.width  + '" height="' + gconfig.height + '" name="flash_obj" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"  wmode="transparent" />';
        sHtml+='</object>';
        eApp.innerHTML=sHtml;
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
        loader.addEventListener("progress",_self.handleProgress);
        loader.loadManifest(lib.properties.manifest,true);
    },
    handleProgress:function(evt){
    },
    handleFileLoad:function(evt){
        if (evt.item.type == "image") {
            //evt.result.crossOrigin="anonymous";
            images[evt.item.id] = evt.result;
        }
    },
    handleComplete:function(evt){
        LifeCycle.trigger("adLoadEnd");
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
    }
}