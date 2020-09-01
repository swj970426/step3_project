/**
 * Created by swj on 2020/8/25.
 */
//引用模块
const myexpress = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const userRouter = require("./router/userRouter");
const viewRouter = require("./router/viewRouter");
const productRouter = require("./router/productRouter");
const ejs = require("ejs");
const app = myexpress();

//配置
app.use(logger('dev'));//日志放在静态资源的前面
//定义EJS模板引擎和模板文件位置，也可以使用jade或其他模型引擎
app.set('views', __dirname+'/view');
app.engine("html",ejs.__express);
app.set('view engine', 'html');
//bodyparser的配置
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));
//定义cookie解析器
app.use(cookieParser());
app.use(session({
    secret: '1234',/*秘钥*/
    name: 'testapp',   //这里的name值得是cookie的name，默认   cookie的name是：connect.sid
    cookie: {maxAge: 800000 },  //设置maxAge是80000ms，即80s后session和相应的            cookie失效过期
    rolling:true,   //更新session-cookie失效时间
    resave:true     //重新保存
}));

app.use(userRouter);
app.use(viewRouter);
app.use(productRouter);
//app.get("/index2.html",function(req,res){
//    console.log(req.session);
//    if(req.session.user){
//        res.render("index",{user:req.session.user,headImage:req.session.info.HeadImage});
//    }else{
//        res.render("index",{user:req.session.user});
//    }
//})
app.use(myexpress.static(__dirname+"/public"));
app.use(favicon(__dirname+'/public/favicon.ico'));

app.listen(8888);
console.log('服务启动');