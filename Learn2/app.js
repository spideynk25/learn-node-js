const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const mysql = require("mysql2")

const app = express()
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"LearnNodeJs",
    port:"3306"
})

db.connect((err)=>{
    if(err){
        console.log(err);
        throw err;
    }
    else{
        console.log("We are connected to mysql");
    }
})

app.get("/home",(req,res)=>{
    db.query("select * from product",(err,rows,fields)=>{
        if(err){
            throw err
        }
        else{
            console.log(rows)
            res.render("data.ejs",{products:rows})
        }
    })
})

//insert
app.post('/home',(req,res)=>{
    p_name = req.body.name
    p_price = req.body.price
    q = "INSERT into product values(NULL,?,?)"
    db.query(q,[p_name,p_price],(err,rows,fields)=>{
        if(err){
            throw err
        }
        else{
            console.log("Inserted")
            res.redirect("/home")
        }
    })
})

//import images
app.get("/addphoto",(req,res)=>{
    res.render("images.ejs")
})

app.get("/product",(req,res)=>{
    q="select * from productv2"
    db.query(q,(err,rows,fields)=>{
        if(err) throw err
        else{
            res.render("productv2.ejs",{products:rows})
        }
    })
})

app.post("/photopc",(req,res)=>{
    image = req.body.ProductImage
    n = req.body.product
    price = req.body.price
    
    q = "insert into productv2 values(NULL,?,?,?,NULL)"
    db.query(q,[n,price,image],(err,rows,fields)=>{
        if(err){
            throw err
        }
        else{
            res.redirect("/product")
        }
    })
})

app.post("/photoweb",(req,res)=>{
    image = req.body.ProductImage
    n = req.body.product
    price = req.body.price
    
    q = "insert into productv2 values(NULL,?,?,?,NULL)"
    db.query(q,[n,price,image],(err,rows,fields)=>{
        if(err){
            throw err
        }
        else{
            res.redirect("/product")
        }
    })
})

app.listen(3000,()=>{
    console.log("Listening to port 3000"); 
})