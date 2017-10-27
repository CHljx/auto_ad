/**
 * 为方法增加错误捕获
 **/
export  function Try(fn) {
    fn();
    // try{
    //     fn();
    // }catch(e){
    //     console.log(e);
    // }
}