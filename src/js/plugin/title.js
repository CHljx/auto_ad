var _title= gconfig.title;
var iStep=0;
export var Title= {
    init:function(){
        if (flash_tit.flag) {
            this.flickerTitle();

        } else {
           this.setTitle();
        }
    },
    flickerTitle:function(){
        var _self = this;
        var title_arr = _title.split("");
        var title_length = title_arr.length;
        if (iStep > title_length) {
            iStep = 0;
        }
        var t='', t2='', t3='';
        for(var i in title_arr){
            if(i>iStep){
                t2 += title_arr[i];
            }else{
                t += title_arr[i];
            }
        }
        t3 = t2+'    '+t;
        iStep++;
        document.title = t3;
        setTimeout(function(){
            _self.flickerTitle();
        }, 500);
    },
    setTitle:function(){
        document.title = _title;
    }
}