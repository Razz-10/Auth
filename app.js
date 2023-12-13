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
    res.redirect("login")

})


app.get("/login",(req,res)=>{
    res.render("login")
})
app.post("/login",async(req,res)=>{
    console.log(req.body)
    const email=req.body.email
    const password=req.body.password


    // 1st tyoemail vakousers table ma xaki xaina check garxam
 const userExits =await users.findAll({
    where :{
        email:email
    }
})


if(userExits.length >0){
    //2nd check password
    const isMatch = bcrypt.compareSync(password,userExits[0].password)
    if(isMatch){
        res.send("Invalidemailand password")
    }
    else{

      res.send("Invalidemailand password")
    }
}
else{
    res.send("Invalid email andpassword")
}
})





app.listen(3000,function(){
    console.log("node project start at 3000")
})