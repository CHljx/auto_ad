export var Support={
    supportCanvas:(function(){
        return false;
        if(document.createElement("canvas").getContext){
            return true;
        }else {
            return false;
        }
    })(),
    ie9:(function(){
        return navigator.userAgent.match(/MSIE 9/)
    })()
}