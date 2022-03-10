var express = require("express");
var bodyparser = require("body-parser");
var cookieparser = require("cookie-parser");
var multer = require("multer");
const User = require("./models/User");
var  Task  = require("./models/Task");
var app = express();
app.use(express.json());
app.get("/",function(req,res){
    res.send("welcome to todolist");
});
app.post("/register",async(req,res)=>{
    let body = req.body;
    var user = new User.User();
    user.id = 0;
    user.name = body.data.name;
    user.email = body.data.email;
    user.password = body.data.password;
        
    user.register().then(result=>{
        console.log("Result")
        console.log(result);
        let data = {
            "data":{
                "id":result.insertId,
                "status":"success"
            }
        };
        res.end(JSON.stringify(data));
    },
    err=>{
        console.log("Error : " + err);
        let data = {
            "data":{
                "status":"fail"
            }
        };
        res.end(JSON.stringify(data));
    });
});
app.post("/login",(req,res)=>{
    let body = req.body;
    var user = new User.User();
    user.email = body.data.email;
    user.password = body.data.password;

    user.login().then(result=>{
        console.log("Result")
        console.log(result);
        let data ={
            "status":"fail"
        }
        if(result.length !=0){
            data = {
                "status" : "success",
                "Data" : result
            }
        }
        res.end(JSON.stringify(data));
    },
    err=>{
        console.log("Error : " + err);
        let data = {
            "data":{
                "status":"fail"
            }
        };
        res.end(JSON.stringify(data));
    });
});
app.post("/savetask",(req,res)=>{
    let body = req.body;
    let task = new Task.Task();
    task.id = body.data.id;
    task.user_id = body.data.user_id;
    task.tdate = body.data.tdate;
    task.ttime = body.data.ttime;
    task.ttask = body.data.ttask;
  

    task.save().then(result=>{
        console.log("Result")
        console.log(result);
        let data ={
            "status":"fail"
        }
        if(result.length !=0){
            data = {
                "status" : "success"
                 }
        }
        res.end(JSON.stringify(data));
    },
    err=>{
        console.log("Error : " + err);
        let data = {
            "data":{
                "status":"fail"
            }
        };
        res.end(JSON.stringify(data));
    });
});
app.listen(8081,function(){
    console.log("server started");
});
