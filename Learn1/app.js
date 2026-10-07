const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.set("view engine", "ejs")

app.get("/home",(req,res)=>{
    res.render("data.ejs")
})

/*app.get("/homeForm",(req,res)=>{
    console.log("We are in get homeForm")
    res.send("We are in get")
})*/

app.post("/home",(req,res)=>{
    console.log("We are in post home")
    //res.send("We are in post")
    console.log(req.body)
    username = req.body.username
    password = req.body.password
    console.log(username+" "+password)
    res.render("data.ejs",{user:username})
})
ar = ["Kakashi", "Hinata", "Sakura"]

app.get("/array",(req,res)=>{
    res.render("array.ejs",{array:ar})
})

app.post("/array",(req,res)=>{
    ar.push(req.body.name)
    res.redirect("/array")
})

app.get("/images",(req,res)=>{
    res.render("images.ejs")
})



app.listen(3000,()=>{
    console.log("Listening to port 3000")
})