
import {AnccLoader} from "../loader/anccLoader";
import {FlashLoader} from "../loader/flashLoader";
import {ImgLoader} from "../loader/imageLoader";
import {Checker} from "../util/checker";

var loader=null;
if(Checker.supportCanvas){
    loader=AnccLoader;
}else if(Checker.supportFlash){
    loader=FlashLoader;
}else {
    loader=ImgLoader;
}

export var AdLoader=loader;