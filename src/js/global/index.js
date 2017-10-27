import {Checker} from "../util/checker"
import {Param} from "../util/query";


var getParam=Param.getParam;
/*变量声明*/
var silent = getParam("silent")||gconfig.silent;
var lid = getParam("lid")||gconfig.lid||"";
var http = "https";
var isLoad = false;
var adParam = gconfig.ad_param;
var adName = gconfig.ad_name;
var flashPath = gconfig.flash_path;
var flashFile = flashPath + "index.swf";
var flashVars = "path=" + flashPath + "&silent=" + silent;
var _width = gconfig.width;
var _height = gconfig.height;
var _title = gconfig.title;
var _top = gconfig.top;
var _left = gconfig.left;
var platformDomain = gconfig.platform_domain;
var platformId = gconfig.platform_id;
var unionId = gconfig.union_id;
var unionType = gconfig.union_type;
var linkId = gconfig.link_id;
var referer = (getParam('37ref') != "") ? getParam('37ref') : gconfig.referer;
var gameId = gconfig.game_id;
var gameServerId = gconfig.game_server_id;
var TimeTemp = gconfig.time_temp;
var platformDeploy = gconfig.platform_deploy;
var key = gconfig.key;
var adId = gconfig.ad_id;
var bid = gconfig.banner_id;
var uid = getParam("uid") || getParam("u") || "";
var cs_ext = getParam("cs_ext") || getParam("CS_EXT") || "";
uid = uid.replace(/\./g, "_");

var baseUrl = "";
if (unionType == 1 || unionType == 2) {
    baseUrl = "p";
} else {
    baseUrl = "s";
}
var tempLinkId = (unionType == 1 || unionType == 2) ? 0 : linkId;
//adsys_param参数
var t = getParam("t") || "";
var v = getParam("v") || "";
var c = getParam("c") || "";
var cg = getParam("cg") || "";
var b = getParam("b") || "";
var n=  getParam("n") || 0;
var adsys_ext ="", adsys_param = "";
if (t > 0) {
    adsys_ext = "t=" + t + "!cg=" + cg + "!c=" + c + "!v=" + v + "!b=" + b + '!p=' + platformId + '!un=' + unionId + '!l=' + linkId + '!uid=' + uid + '!a=' + adId + '!pd=' + platformDeploy + '!g=' + gameId + '!gs=' + gameServerId +'!n=' +n;
}
if (b != "") { bid = b; }
adsys_param = "&t=" + t + "&v=" + v + "&c=" + c + "&cg=" + cg + "&b=" + b +'&n=' +n;
var ext = encodeURIComponent(((unionType == 1 || unionType == 2) ? (baseUrl + "|") : "") + platformId + "|" + unionId + "|" + linkId + "|" + uid + "|" + key + "|"+adsys_ext+"|"+"os="+ Checker.system +"!bs="+ Checker.browser);
baseUrl = "/" + baseUrl + "/" + platformId + "/" + unionId + "/" + tempLinkId + "/";
var _qs = 0;
var isFlash = adName.indexOf('[FL]') > 0;
if (adName.indexOf('[QP]') > 0 || adName.indexOf('[FL]') > 0) _width = '100%';
var returnGid='';
var returnSid='';

export var Global= {
    init:function(){
        var _self = this
        _self.addGlobalFn("uid", (getParam("uid") || getParam("u") || "").replace(/\./g, "_"));
        _self.addGlobalFn("key",  gconfig.key);
        _self.addGlobalFn("platformDeploy",gconfig.platform_deploy);
        _self.addGlobalFn("platformDomain",gconfig.platform_domain);
        _self.addGlobalFn("http","https");
        _self.addGlobalFn("adParam",gconfig.ad_param);
        _self.addGlobalFn("bid",bid);
        _self.addGlobalFn("lid",lid);
        _self.addGlobalFn("ab_type", parseInt(getParam('ab_type'), 10) || parseInt(getParam('ad_type'), 10) || "");
        _self.addGlobalFn("ext",ext);
        _self.addGlobalFn("referer",referer);
        _self.addGlobalFn("uid",uid)
        _self.addGlobalFn("cs_ext",cs_ext);
        _self.addGlobalFn("getParam",getParam);
        _self.addGlobalFn("adsys_param",adsys_param);
        _self.addGlobalFn("baseUrl",baseUrl);
        _self.addGlobalFn("_width",_width)
    },
    addGlobalFn:function(key,fn){
        window[key]=fn;
    },
    getGlobal:function(key){
        return window[key]||''
    }
}