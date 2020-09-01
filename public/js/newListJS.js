/**
 * Created by Cc on 2016/7/30.
 */
var list2=document.getElementById("list2");
var list3=document.getElementById("list3");
setInterval(function(){
    if(window.scrollY>=2000){
        list2.style.marginTop="30px";
    }
},10);
setInterval(function(){
    if(window.scrollY>=3830){
        list3.style.marginTop="30px";
    }
},10);