/**
 * Created by Administrator on 2016/7/26.
 */
var backUp=document.getElementById("backUp");
backUp.onclick=back;
//console.log(1);
var nowTop;
var timer;
function back(){
    timer=setInterval(toTop,10);
}
function toTop(){
    if(document.body.scrollTop==0){
        clearInterval(timer);
    }else{
        document.body.scrollTop=document.body.scrollTop-20;
        nowTop=document.body.scrollTop;
    }
}