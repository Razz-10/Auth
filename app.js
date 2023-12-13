const express =require("express")
const { users } = require("./model/index")
const app =express()
const bcrypt =require("bcrypt")

app.set("view engine","ejs")

//database connection
require("./model/index")

//parse incoming form data
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/register",(req,res)=>{
    res.render("register")

})
//post api for handling incoming dta
app.post("/register", async (req,res)=>{
 const username=req.body.username
    const email =req.body.email
    const password =req.body.password
//validation
    if(!username||!email||!password){
     return res.send("Please fill all the field")

    }

     await users.create({
        email : email,
        username:username,
        password: bcrypt.hashSync(password,8)
    })
    res.send("User registerd sucesfully")

})





app.listen(3000,function(){
    console.log("node project start at 3000")
})