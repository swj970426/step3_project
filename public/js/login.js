/**
 * Created by SYT on 2016-07-31.
 */
var Box=document.getElementById("Box");
var loginBox=document.getElementById("loginBox");
var zhuceBox=document.getElementById("zhuceBox");
function login(){
    Box.style.visibility="visible";
    loginBox.style.visibility="visible"
    console.log("456")
}
function switchLogin(){
    Box.style.visibility="visible";
    zhuceBox.style.visibility="hidden";
    loginBox.style.visibility="visible"
}
function switchZhuce(){
    Box.style.visibility="visible";
    loginBox.style.visibility="hidden";
    zhuceBox.style.visibility="visible"
}
function zhuce(){
    Box.style.visibility="visible";
    zhuceBox.style.visibility="visible"
}
function close1(){
    console.log("123")
    Box.style.visibility="hidden";
    loginBox.style.visibility="hidden";
    zhuceBox.style.visibility="hidden"
}
//swj add by 2020/8/25
$(function(){
    var layer = layui.layer;
    $("#loginBtn").click(function(){
        var user = $("#loginUser").val();
        var pwd = $("#loginPwd").val();
        if(user.trim().length==0){
            layer.alert('用户名不能为空')
        }else if(pwd.trim().length==0){
            layer.alert('密码不能为空');
        }else{
            //loading显示
            var index = myloading();

            //发起请求到服务器
            $.ajax({
                type:"POST",
                url:"/userLogin",
                data:"user="+user+"&pwd="+pwd,
                success:function(data){
                    layer.close(index);
                    layer.alert(data.message);
                    if(data.code == 200){
                        location.reload();
                        //close1();
                        //console.log(data);
                        //$("#user").html("<img class='userHead' src='"+data.data[0].HeadImage+"'><span>"+user+"</span>")
                    }
                }
            })
        }
    })
    $("#zhuceBtn").click(function(){
        var obj={"Email":"邮箱","zhuceUser":"用户名","zhucePwd":"密码不能为空",
        "resPwd":"确认密码不能为空"};
        var flag = true;
        for(var key in obj){
            console.log(key);
            if($("#"+key).val().trim().length==0){
                flag = false;
                layer.alert(obj[key]+"不能为空");
                break;
            }
        }
        if(flag){
            //发起注册操作
            var index = myloading();
            $.ajax({
                type:"post",
                url:"/reg",
                data:$("#frmReg").serialize(),/*序列化*/
                success:function(data){
                    layer.close(index);
                    layer.alert(data);
                    if(data=="注册成功"){
                        switchLogin();
                    }
                }
            })
        }
    })
})


function myloading(){
    return layer.load(2, {
        shade: [0.5, '#000'],
        content: '',
        success: function (layero) {
            layero.find('.layui-layer-content').css({
                'paddingTop': '40px',
                'textAlign': 'center',
                'backgroundPositionX': 'center',
                'color': '#fff',
                'fontSize': '16px',
                'fontWeight': '700',
                'letterSpacing': '2px'
            });
        }})
}