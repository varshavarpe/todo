let mysql = require("mysql");

class Database {
    constructor()
    {
        this.con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "todolist"
        });
    }
    
    query=(sql, arg)=>{
        return new Promise((resolve,reject)=>{
            this.con.query(sql, arg, (err, result)=>{
                if(err){
                    console.log("Database:" + err);
                    return reject(err);
                }
                resolve(result);
            });
        });
    }
    
     close(){
        return new Promise((resolve,reject)=>{
            this.con.end((err)=>{
                if(err){                    
                    reject (err);
                }
                resolve("success");
            });
        });
     }
        
    }

module.exports = {
    Database:Database
    
}
