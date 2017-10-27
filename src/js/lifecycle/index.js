import {Static as Statis} from "../util/statis";
var event={};
export var LifeCycle={
    add:function(cycle,fn){
        if(!event[cycle]){
            event[cycle]=[];
        }
        event[cycle].push(fn);
    },
    trigger:function(cycle){
        console.log("lifeCycle",cycle,new Date().getTime());
        this[cycle]&&this[cycle]();
        Statis.doStatic(cycle)
        if(event[cycle]){
            for(var index =0,len=event[cycle].length;index<len;index++){
                event[cycle][index]()
            }
        }
    }
};
