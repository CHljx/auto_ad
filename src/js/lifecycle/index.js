import Statis from "../util/statis";
var LifeCycle={
    trigger:function(cycle){
        console.log("lifeCycle",cycle,new Date().getTime());
        this[cycle]();
    },
    load:function(){
        Statis.doStatic("load")
    },
    beforeAdLoad:function(){
        Statis.doStatic("beforeAdLoad")
    },
    adLoadEnd:function(){
        Statis.doStatic("adLoadEnd")
    },
    registShow:function(){
        Statis.doStatic("registShow")
    },
    registEnd:function(){
        Statis.doStatic("registEnd")
    }
};

export default LifeCycle;
