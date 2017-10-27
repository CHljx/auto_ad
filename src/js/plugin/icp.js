export var Icp={
    init:function(){
        if(window.icp_flag&&icp_flag.flag){
            this.createIcp();
        }
    },
    createIcp:function(){
            var $p = document.createElement('p');
            $p.className = 'txt_icp';
            $p.innerHTML = icp_flag.text;
            document.body.appendChild($p);
    }
}