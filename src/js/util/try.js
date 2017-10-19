/**
 * 为方法增加错误捕获
 **/
export default  function(fn) {
    try{
        fn();
    }catch(e){
        console.log(e);
    }
}