let Database = require("./Database");
class Task{
    id = 0;
    user_id = 0;
    tdate = "";
    ttime = "";
    ttask = "";
    status = "";
    query = "";
    db = new Database.Database();

    constructor(){
        this.id = 0;
        this.user_id = 0;
        this.tdate = "";
        this.ttime = "";
        this.ttask = "";
        this.status="";
    }
    save=()=>{
        if(this.id==0){
            this.query = "INSERT INTO tasks( user_id, tdate, ttime,ttask, status) ";
           this.query+= "VALUES ("+ this.user_id +",'"+ this.tdate +"','"+ this.ttime +"','"+ this.ttask +"','open')"; 
        }
        else {
            this.query = "UPDATE tasks SET user_id="+ this.user_id +",tdate='"+ this.tdate +"',ttime='"+ this.ttime +"',ttask='"+ this.ttask +"' WHERE id=" + this.id;
        }
       console.log(this.query);
        return new Promise((resolve, reject)=>{
            this.db.query(this.query, (err, result)=>{
                this.db.close();
                if(err)
                    return reject(err);                
                resolve(result);
            });
        });           
    }
}
module.exports = {
    Task:Task
    
}
