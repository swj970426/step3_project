/**
 * Created by Administrator on 2016/7/30.
 */
//    段雨薇
var circle1=document.getElementById("circle1");
var circle2=document.getElementById("circle2");
var circle3=document.getElementById("circle3");
var circle4=document.getElementById("circle4");
var nowTop;
var timerO;
var timerT;
var timerH;
var timerF;
circle1.onclick=myClick1;
circle2.onclick=myClick2;
circle3.onclick=myClick3;
circle4.onclick=myClick4;
//circle1.addEventListener("click",myClick1,true);
//circle2.addEventListener("click",myClick2,true);
//第一个按钮
function myClick1(){
    timerO=setInterval(myClickO,10);
    circle1.className="changecolor";
    circle2.className="circle";
    circle3.className="circle";
    circle4.className="circle";
    //circle1.style.backgroundColor="grey";
}
function myClickO(){
    if(document.body.scrollTop==0){
        clearInterval(timerO)
    }else{
        document.body.scrollTop-=6.67;
    }

}
//第二个按钮
function myClick2(){
        timerT=setInterval(myClickT,10);
        circle2.className="changecolor";
        circle1.className="circle";
        circle3.className="circle";
        circle4.className="circle";
}
function myClickT(){
    if(document.body.scrollTop==667){
        //clearAll();
        clearInterval(timerT);
    }else{
            //document.body.scrollTop=667;
            if(document.body.scrollTop<667){
                document.body.scrollTop+=6.67;
            }else if(document.body.scrollTop>667){
                document.body.scrollTop-=6.67;
            }
    }
}
//第三个按钮
function myClick3(){
    timerH=setInterval(myClickH,10);
    circle3.className="changecolor";
    circle2.className="circle";
    circle1.className="circle";
    circle4.className="circle";
}
function myClickH(){
    if(document.body.scrollTop==1333){
        //clearAll();
        clearInterval(timerH);
    }else{
        //document.body.scrollTop=667;
        if(document.body.scrollTop<1333){
            document.body.scrollTop+=6.67;
        }else if(document.body.scrollTop>1333){
            document.body.scrollTop-=6.67;
        }
    }
}
//第四个按钮
function myClick4(){
    timerF=setInterval(myClickF,10);
    circle4.className="changecolor";
    circle2.className="circle";
    circle3.className="circle";
    circle1.className="circle";
}
function myClickF(){
    if(document.body.scrollTop==1999){
        //clearAll();
        clearInterval(timerF);
    }else{
            document.body.scrollTop+=6.67;
    }
}

function move(){
    window.onscroll=function(){
        if(document.body.scrollTop>=0||document.body.scrollTop<667){
            circle1.className="changecolor";
            circle2.className="circle";
            circle3.className="circle";
            circle4.className="circle";
        }
        if(document.body.scrollTop>=667||document.body.scrollTop<1333){
            circle1.className="circle";
            circle2.className="changecolor";
            circle3.className="circle";
            circle4.className="circle";
        }
        if(document.body.scrollTop>=1333||document.body.scrollTop<1999){
            circle1.className="circle";
            circle2.className="circle";
            circle3.className="changecolor";
            circle4.className="circle";
        }
        if(document.body.scrollTop>=1999){
            circle1.className="circle";
            circle2.className="circle";
            circle3.className="circle";
            circle4.className="changecolor";
        }
    }
}
//move();
//setInterval(move, 10);
