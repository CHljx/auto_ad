import {LifeCycle} from "../lifecycle/index";
export var BackPop= {
	_t:null,
	iframe:null,
	wrapperDiv:null,
	init:function(){
		var _self = this;
		if(isPopWin.flag){
			_self.newIframe();
			_self.bindEvent();
		}
	},
	newIframe:function(){
		var _self = this;
		var a_height = document.body.clientHeight || document.documentElement.clientHeight;
		_self.wrapperDiv=document.createElement("div");
        _self.wrapperDiv.id="newdiv";
        _self.wrapperDiv.innerHTML="<iframe src='" + isPopWin.url + "' style='width:100%;display:none;height:100%' frameborder=0 id='my_iframe'></iframe>";
        document.body.appendChild(_self.wrapperDiv) ;
        _self.iframe=document.getElementById("my_iframe");
	},
	bindEvent:function(){
		var _self = this;
         window.onbeforeunload = function(event) {
             _self.showPopIframe();
         }
         window.onunload = function(event) {
             _self.showPopIframe();
         }
         window.onunloadcancel = function() {
        	 clearTimeout(_self._t);
         }
	},
	showPopIframe:function(event){
		var _self = this,
		confirmClose= isPopWin.text||"亲，确定要离开吗？";

		event = event || window.event;
		setTimeout(function() { _self._t = setTimeout(window.onunloadcancel, 0) }, 0);
		var browser = navigator.appName;
		if (event && isPopWin.flag) {
			 isPopWin.flag = false;
			 event.returnValue = confirmClose;
			 document.getElementsByTagName('html')[0].style.backgroundColor = "#ffffff";
			 document.body.style.backgroundColor = "#ffffff";
			 document.documentElement.style.overflowY = 'hidden';
			 document.body.style.overflowY = 'hidden';
            document.body.style.height="100%";
			 _self.wrapperDiv.style.height="100%";
			 _self.iframe.style.display = "block";
			 for (var i = 0; i < document.getElementsByTagName("div").length; i++) {
			     document.getElementsByTagName("div")[i].style.display = "none";
			 }
			  _self.wrapperDiv.style.display = "block";

			  LifeCycle.trigger("popwin");
		}
		if (isPopWin.flag) {
			 if (browser == "Netscape") {
			     return confirmClose;
			 } else {
			     window.event.returnValue = confirmClose;
			 }
		}
	}
}