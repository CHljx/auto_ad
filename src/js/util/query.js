
var query={};
var searchParams=document.location.search.substr(1);
var param=[];
searchParams=searchParams.split("&");
for(var index=0,len=searchParams.length;index<len;index++){
    param=searchParams[index].split("=")
    query[param[0]]=param[1]
}

export default {
    getParam:function(key){
        return query[key]||""
    }
};