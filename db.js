const mysql=require('mysql2');
var db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456789',
    database:'book_management'
})

db.connect((err)=>{
    if(err)
    {
        console.log("Connection Failed: ", err.message);
    }
    else
    {
        console.log("Connection to MySQL database");
    }
})

module.exports=db;