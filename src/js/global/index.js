export default {
    init:function(){

    },
    addGlobalFn:function(key,fn){
        window[key]=fn;
    },
    getGlobal:function(key){
        return window[key]||''
    }
}