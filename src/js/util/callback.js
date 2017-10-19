/**
 * 用于JSONP请求
 **/
import Try from "../util/try.js"

var tid=0;
var mapEvent={};
export default{
    getTid:function(){
        tid++;
        return tid;
    },
    handleCallBack:function(tid,oRep){
        var event=mapEvent[tid],
            script = document.getElementById('jsonp_invoker_' + tid);
        Try(function(){
            event&&(typeof event=="function")&&event(oRep);
            if (script) {
                script.parentNode.removeChild(script);
            }
        })
    },
    addCallBack:function(tid,fn){
        mapEvent[tid]=fn;
    },
    doReq:function(url, callback){
        var _self = this,
            tid=_self.getTid(),
            script = document.createElement('script');
        Try(function(){
            script.setAttribute("id",'jsonp_invoker_' + tid);
            script.setAttribute("type","text/javascript");
            script.setAttribute("src",url.indexOf('?') > 0 ? (url + '&tid=' + tid + '&' + Math.random()) : (url + '?tid=' + tid + '&' + Math.random()));
            if(callback){
                _self.addCallBack(tid,callback);
            }
            var head = document.getElementsByTagName('head');
            if (head[0]) {
                head[0].appendChild(script);
            } else {
                document.body.appendChild(script);
            }
        })

    },
    doScript:function(url,callback){
        var script=document.createElement('script');
        Try(function(){
            script.setAttribute("async",'async');
            script.setAttribute("type","text/javascript");
            script.setAttribute("src",url.indexOf('?') > 0 ? (url + '&tid=' + tid + '&' + Math.random()) : (url + '?tid=' + tid + '&' + Math.random()));
            document.body.appendChild(script);
            if(script.readyState){   //IE
                script.onreadystatechange=function(){
                    if(script.readyState=='complete'||script.readyState=='loaded'){
                        script.onreadystatechange=null;
                        callback&&callback();
                    }
                }
            }else{    //非IE
                script.onload=function(){callback&&callback();}
            }
        })

    }
}