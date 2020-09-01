/**
 * Created by swj on 2020/8/26.
 */
const router = require('express').Router();
const db = require("./sqlHelper");
router.get("/",function(req,res){
    res.redirect("/index.html");
})
router.get("/index.html",async function(req,res){
    var bannerList = await getBanner();
    var newList = await getNewList();
    if(req.session.user){
        res.render("index",{user:req.session.user,
            headImage:req.session.info.HeadImage,
            lunbo:bannerList,
            newList:newList
        });
    }else{
        res.render("index",{user:req.session.user,
            lunbo:bannerList,
            newList:newList
        });
    }
})

function getBanner(){
    return new Promise(function(resolve,reject){
        var sql = "select * from banner where keyName='lun'";
        db.query(sql,[],function(err,data){
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    });
}
function getNewList(){/*获取产品列表*/
    return new Promise(function(resolve,reject){
        var sql2 =`SELECT product.*,productrule.Id AS rid FROM product JOIN productrule ON product.Id = productrule.productId
        WHERE isDefault = 1 AND isNew = 1`;
        db.query(sql2,[],function(err,data){
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}

router.get("/product.html",function(req,res){
    res.render("product");
})
router.get("/user.html",function(req,res){
    var sql = "select * from user";
    db.query(sql,[],function(err,data){
        res.render("user",{userList:data});/*渲染就是将数据和模板进行组合*/
    })

})
router.get("/productDetail.html",function(req,res){
    var rid = req.query.id;
    var sql = `SELECT *,r.Id AS rid FROM product AS p JOIN productrule AS r
    ON p.Id = r.productId WHERE r.Id=?`;
    db.query(sql,[rid],function(err,data){
        console.log(data);
        res.render("productDetail",{info:data[0],
            user:req.session.user,
            headImage:req.session.headImage
        })
    })
})
router.get("/cart.html",function(req,res){
    if(req.session.user){
        var userId = req.session.info.id;
        var sql = `SELECT s.id AS sid,p.feng,p.title,r.price,s.num,r.Id AS rid
        FROM shopcart s JOIN productrule r
        ON s.RuleId = r.Id JOIN product p
        ON r.productId = p.Id WHERE s.userid=?`;
        db.query(sql,[userId],function(err,data){
            res.render("cart",{user:req.session.user,
                headImage:req.session.headImage,
                productList:data
            });
        })
    }else{
        res.redirect("/index.html");
    }
})
module.exports = router;