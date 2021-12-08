// import express
const express=require('express')
const dataService=require('./services/data.services')
const session=require('express-session')
const jwt=require('jsonwebtoken')


// create app  using express
const app=express()


// use session
app.use(session({
    secret:'randomsecurestring',
    resave:false,
    saveUninitialized:false

}))


// parse
app.use(express.json())

// application specific midleware
app.use((req,res,next)=>{
    console.log(" application specific midleware")
    next()
})

// router level middileware
const loginmidleware=(req,res,next)=>{
    if(!req.session.currentacno){
    
        res.json({
          status: false,
          statuscode:401,
          message:"please login"
      })
    
      }
      else{
          next()
      }
}

// jwt middleware
const jwtmiddleware=(req,res,next)=>{
    try{
        const token=req.body.token
        // token validation
        const data =jwt.verify(token,'superkey123456')
        req.currentacno=data.currentacno
        next()
    }
    catch{
        res.json({
            status:false,
            statuscode:401,
            message:"please login"
        })
    }
}

// token api for testing
app.post('/token',jwtmiddleware,(req,res)=>{
    res.send("current account no is"+req.currentacno)
})



// define default router
app.get('/',(req,res)=>{
    res.send("server started at port number 3000")
})
app.post('/',(req,res)=>{
    res.send("server started at port number 3000")
})


// set port
app.listen(3000,()=>{
    console.log("server started at port number 3000")
})

// register api
app.post('/register',(req,res)=>{
   const result= dataService.register(req.body.acno,req.body.uname,req.body.password)
    // console.log(result)
    res.status(result.statuscode).send(result)
})


// login api
app.post('/login', (req,res)=>{
    const result= dataService.login(req.body.acno,req.body.password)
    res.status(result.statuscode).send(result)
})



// deposit api
app.post('/deposit', jwtmiddleware,(req,res)=>{
    const result= dataService.deposit(req.body.acno,req.body.password,req.body.amnt)
    res.status(result.statuscode).send(result)
})



// withdraw api
app.post('/withdraw', jwtmiddleware,(req,res)=>{
    const result= dataService.withdraw(req.body.acno1,req.body.password1,req.body.amnt1)
    res.status(result.statuscode).send(result)
})


// transaction api
app.post('/getTransaction', jwtmiddleware,(req,res)=>{
    const result= dataService.getTransaction(req.body.acno)
    res.status(result.statuscode).send(result)
})