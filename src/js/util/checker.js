export var Checker= {
    supportFlash:(function(){
        var a = 0;
        try {
            if (document.all) {
                var c = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                if (c) {
                    a = 1
                }
            } else {
                if (navigator.plugins && navigator.plugins.length > 0) {
                    var c = navigator.plugins["Shockwave Flash"];
                    if (c) {
                        a = 1
                    }
                }
            }
            return a
        } catch (e) {
            return a
        }
    })(),
    supportCanvas:(function(){
        if(document.createElement("canvas").getContext){
            return true;
        }else {
            return false;
        }
    })(),
    browser:(function(){
        var nua=navigator.userAgent.toLowerCase();
        if(nua.indexOf('lbbrowser')!=-1){
            return 'liebao';
        }
        else if(nua.indexOf('2345explorer')!=-1){
            return '2345explorer';
        }
        else if(nua.indexOf('2345chrome')!=-1){
            return '2345chrome';
        }
        else if(nua.indexOf('qqbrowser')!=-1){
            return 'qq';
        }
        else if(nua.indexOf('bidubrowser')!=-1){
            return 'baidu';
        }
        else if(nua.indexOf('metasr')!=-1){
            return 'sogou';
        }
        else if(nua.indexOf('ubrowser')!=-1){
            return 'uc';
        }
        else if(nua.indexOf('opera')!=-1){
            return 'opera';
        }
        else if(nua.indexOf('maxthon')!=-1){
            return 'maxthon';
        }
        else if(nua.indexOf('360ee')!=-1){
            return '360chrome';
        }
        else if(nua.indexOf('360se')!=-1){
            return '360browser';
        }
        else if(nua.indexOf('edge')!=-1){
            return 'edge';
        }
        else if(nua.indexOf('firefox')!=-1){
            return 'firefox';
        }
        else if(nua.indexOf('chrome')!=-1){
            return 'chrome';
        }
        else if(nua.indexOf('safari')!=-1){
            return 'safari';
        }
        else if(nua.indexOf('msie 6.0')!=-1){
            return 'ie6';
        }
        else if(nua.indexOf('msie 7.0')!=-1){
            return 'ie7';
        }
        else if(nua.indexOf('msie 8.0')!=-1){
            return 'ie8';
        }
        else if(nua.indexOf('msie 9.0')!=-1){
            return 'ie9';
        }
        else if(nua.indexOf('msie 10.0')!=-1){
            return 'ie10';
        }
        else if(nua.indexOf('rv:11')!=-1){
            return 'ie11';
        }
        else{
            return 'otherbrowse'
        }
    })(),
    system:(function(){
        var nua=navigator.userAgent.toLowerCase();
        if(nua.indexOf('windows nt 5.1')!=-1||nua.indexOf('windows nt 5.2')!=-1){
            return 'winxp';
        }
        else if(nua.indexOf('windows nt 6.0')!=-1){
            return 'vista';
        }
        else if(nua.indexOf('windows nt 6.1')!=-1){
            return 'win7';
        }
        else if(nua.indexOf('windows nt 6.2')!=-1){
            return 'win8';
        }
        else if(nua.indexOf('windows nt 6.3')!=-1){
            return 'win8.1';
        }
        else if(nua.indexOf('windows nt 6.4')!=-1 || nua.indexOf('windows nt 10.0')!=-1){
            return 'win10';
        }
        else if(nua.indexOf('ipad')!=-1){
            return 'ipad';
        }
        else if(nua.indexOf('iphone')!=-1){
            return 'iphone';
        }
        else if(nua.indexOf('mac os')!=-1){
            return 'macos';
        }
        else if(nua.indexOf('android')!=-1){
            return 'android';
        }
        else if(nua.indexOf('linux')!=-1){
            return 'linux';
        }
        else {
            return 'otheros'
        }
    })(),
    isMobile:(function(){
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            return true;
        } else {
            return false
        }
    })()
};