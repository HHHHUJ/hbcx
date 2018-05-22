
var app = require('express')();
var server = require('http').createServer(app);
var conn = require('./conn')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var async = require("async")
// var host = "172.17.113.101";
var host = "localhost"
var port = "8090"
var ObjectId = require('mongodb').ObjectID; 
var superagent = require("superagent")
var cheerio = require("cheerio")
const charset = require('superagent-charset');
charset(superagent)

const place_json = require('./input.json')
var tool = require('./src/assets/js/tool.js')//引入自己封装的js库
const io = require('socket.io').listen(server)

// var a = tool.bubbleSort(arr);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.disable('view cache');

//解决跨域
app.all('*',function(req,res,next){
    // res.header("Access-Control-Allow-Headers","Access-Control-Allow-Headers")
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    next()
});
 
app.get('/task',(req,res)=>{
    conn.getDb((err,db)=>{
        if(err) throw err;
        var coll = db.collection("task");
        coll.find({}).toArray((err,result)=>{
            if(err) throw err;
            res.send(result)
        })
    })
})

app.get('/hb',(req,res)=>{
    conn.getDb((err,db)=>{
        if(err) throw err;
        var coll = db.collection("hb");
        coll.find({_id:ObjectId("5ac9cdc3936aa219e48d81e4")}).toArray((err,result)=>{
            if(err) throw err;
            res.send(result)
        })
    })
})

app.get('/record',(req,res)=>{
    dcity = req.query.dcity;
    acity = req.query.acity;
    ddate = req.query.ddate;
    conn.getDb((err,db)=>{
        if(err) throw err;
        var coll = db.collection("hhh");
        coll.find({dcity:dcity,acity:acity,ddate:ddate},{_id:0}).toArray((err,result)=>{
            if(err) throw err;
            res.send(result)
        })
    })
})

io.sockets.on('connection', (socket) => {
    socket.on('start',(value)=>{
        console.log('链接成功');
        var timer = null;
        // getair(value);
        // setTimeout(() => {
        //     socket.emit('dispatch', `今日最低价${global.low_price}`);
        // }, 1000);
        const intval = function(){
            timer = setInterval(function(){
                console.log(value)
                    getair(value,socket);
                    // socket.emit('dispatch', `今日最低价${global.low_price}`);
                    var now = new Date().getTime();
                    var next = new Date(value.ddate).getTime();
                    var space = next-now;
                    if(space<=28980000 && space>0){  //new Date(DDate1).getTime() 大约在DDate1当天的早上8点03分
                        clearInterval(timer);
                    }
            },30000); //86100000间隔一天
        };
        const async = function(){
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    resolve();
                },0)
            })
        }
       async()
        .then(()=>{
            getair(value,socket);
        })
        .then(()=>{
            // intval();
        })
        .catch(err=>{
            console.log(err)
        })
    // parseInt(value.date_space)*1000*60*60+parseInt(Math.random()*60000)
    });
});
const getair = (v,socket)=>{
        var DCity1 = v.dcity;
        var ACity1 = v.acity;
        var DDate1 = v.ddate;
        var date_space = v.date_space;//时间间隔，隔多长时间运行一次
        console.log(DCity1,ACity1,DDate1,date_space)
        var url = `http://flights.ctrip.com/domesticsearch/search/SearchFirstRouteFlights?DCity1=${place_json[DCity1]}&ACity1=${place_json[ACity1]}&SearchType=S&DDate1=${DDate1}&IsNearAirportRecommond=0&LogToken=0dc7fd99662349069c123f0a8bfcae95&rk=7.387068566272421154925&CK=51BF6E070FF329F1DDD90CEF097B4B86&r=0.5811166470511521823610`
        var headers = {
            "Cookie":"__utma=1.648580680.1500052197.1500052197.1500052197.1; __utmz=1.1500052197.1.1.utmcsr=baidu|utmccn=(organic)|utmcmd=organic; StartCity_Pkg=PkgStartCity=2; _abtest_userid=b2d8ec09-8300-49f5-8c56-e5955eaebf55; adscityen=Shanghai; DomesticUserHostCity=SHA|%c9%cf%ba%a3; appFloatCnt=3; manualclose=1; _gat=1; Union=SID=155952&AllianceID=4897&OUID=baidu81|index|||; Session=SmartLinkCode=U155952&SmartLinkKeyWord=&SmartLinkQuary=&SmartLinkHost=&SmartLinkLanguage=zh; _bfa=1.1500052197098.egn3q.1.1500391644124.1500450359041.3.22; _bfs=1.3; page_time=1500052199151%2C1500052201106%2C1500052253071%2C1500052266599%2C1500052737639%2C1500053169759%2C1500053269047%2C1500053304153%2C1500391645891%2C1500391646865%2C1500391653279%2C1500391706616%2C1500391781672%2C1500391867587%2C1500391895364%2C1500392129113%2C1500392312502%2C1500392677979%2C1500450360502%2C1500450527168%2C1500450552188; _RF1=112.64.216.79; _RSG=6Ba6XNJ5wCACiIoqsdEcXA; _RGUID=a33a1535-e11a-42c6-a866-3a7db4c92b0c; _ga=GA1.2.648580680.1500052197; _gid=GA1.2.1686685369.1500391650; traceExt=campaign=CHNbaidu81&adid=index; __zpspc=9.4.1500450554.1500450554.1%231%7Cbaidu%7Ccpc%7Cbaidu81%7C%25E6%2590%25BA%25E7%25A8%258B%7C%23; _jzqco=%7C%7C%7C%7C1500391649757%7C1.719992437.1500052197549.1500450529881.1500450554792.1500450529881.1500450554792.undefined.0.0.20.20; _bfi=p1%3D100101991%26p2%3D101027%26v1%3D22%26v2%3D21; MKT_Pagesource=PC;",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36",
        }
        superagent
            .get(url)
            .charset('gbk')
            .set(headers)
            .end(function (err, sres) {
            // 常规的错误处理
                if (err) {
                    return next(err);
                }
                var airline_tickets = JSON.parse(sres.text)['fis'];
                var air_company = {"G5":"华夏航空","9C":"春秋航空","MU":"东方航空","NS":"河北航空","HU":"海南航空","HO":"吉祥航空","CZ":"南方航空","FM":"上海航空","ZH":"深圳航空","MF":"厦门航空","CA":"中国国航","KN":"中国联航"}
                var airline_data = airline_tickets.map((item,i)=>{
                    if(air_company[item['alc']]){
                        var strs = air_company[item['alc']]
                    }else{
                        var strs = item['alc']
                    }
                    return {
                        'air_company':strs,
                        'air_code':item['fn'],
                        'from_place':item['dpbn'],
                        'dt_from':item['dt'],
                        'price':item['lp'],
                        'to_place':item['apbn'],
                        'dt_to':item['at'],
                        'tax':item['tax'],
                        'is_lower_price':0
                    }
                
                })
                var prices = airline_data.map((k)=>{
                    return k.price;
                })
                var low_price = tool.bubbleSort(prices).slice(0,1)[0];//得到最低价
                global.low_price = low_price;
               
                var newArr = new Array();
                airline_data.map((k,i)=>{
                    if(k.price == low_price){
                        airline_data[i]['is_lower_price'] = 1;
                        newArr.push(airline_data[i])
                    }
                })
                // if(low_price){
                //     socket.emit('dispatch', [low_price]);
                // }
                socket.emit('dispatch', low_price);

                conn.getDb((err,db)=>{
                    if(err) throw err;
                    var hh = db.collection('hhh')
                    async.waterfall([
                        function(callback){
                            hh.find({dcity:DCity1,acity:ACity1,ddate:DDate1},{dcity:0,acity:0,ddate:0,datas:0,count:0}).toArray((err,result)=>{
                                if(err) throw err;
                                var len = result.length;
                                // console.log(result[0])
                                if(len>0){
                                    console.log('更新操作')
                                    callback(null,result);//更新操作
                                    
                                }else{
                                    console.log('插入操作')
                                    callback(null,false)//插入操作
                                    
                                }
                            })
                        },
                        function(arg,callback){
                            if(arg.length>0){
                                //hh.remove({})//清空数据库的集合
                                // hh.insert(airline_data,(err,result)=>{
                                //     if(err) throw err;
                                //     return callback(null,0)//更新
                                // })
                                
                                hh.update({_id:ObjectId(arg[0]._id)},{$set:{'datas':airline_data},$inc:{count:1}})
                                console.log('更新成功')
                                callback(null,"update")
                            }else{
                                // hh.insert(airline_data,(err,result)=>{
                                //     if(err) throw err;
                                //     callback(null,1)
                                // })
                                hh.insert({dcity:DCity1,acity:ACity1,ddate:DDate1,count:1,datas:airline_data})
                                callback(null,"insert")
                            }
                        }
                    ],function(err,result){
                        console.log(result)
                        //res.status(200).send('success') 
                    
                    })
                })  
            })
    return true;
}

app.post('/register',(req,res)=>{
    var user = req.body.data.username;
    var pass = req.body.data.password;
    console.log(pass)
    var insertDb = function(db,callback){
        var info = db.collection("user_info");
        async.waterfall([
            function(callback){
                info.find({username:user},{_id:0}).toArray((err,result)=>{
                    if(err) throw err;
                    var len = result.length;
                    if(len>0){
                        callback(null,true);//不能注册
                    }else{
                        callback(null,false)
                    }
                })
            },
            function(arg,callback){
                if(arg){
                    callback(null,0)//不能注册
                }else{
                    info.insert({username:user,password:pass},(err,result)=>{
                        if(err) throw err;
                        callback(null,1)
                    })
                }
            }
        ],function(err,result){
            callback(result)
        })
    }
    conn.getDb((err,db)=>{
        if(err) throw err;
        insertDb(db,(result)=>{
            if(result=='1'){
                res.send('用户注册成功!')//可以注册
            }else{
                res.send('用户名已注册!')
            }
        })
    })
});

app.post("/login",(req,res)=>{
    var user = req.body.data.username;
    var pass=  req.body.data.password;
    console.log(user)
    console.log(pass)
    var findData = function(db,callback){
        var collection = db.collection("user_info");
        collection.find({username:user,password:pass}).toArray((err,result)=>{
          if(err) throw err;
          callback(result);
        })
      }
    conn.getDb((err,db)=>{
        if(err) throw err;
        findData(db,function(result){
            if(result.length>0){
                res.send("登录成功!")
            }else{
                res.send("登录失败!")
            }
        })   
    }) 
});


server.listen(port,host,()=>{
    console.log(`the server is running at ${host}:${port}`)
})